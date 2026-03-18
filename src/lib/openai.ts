import OpenAI from "openai";
import { PullRequest, Commit, OpenAIStructuredResponse } from "./types";
import { openaiError } from "./errors";

export function createOpenAIClient(apiKey: string): OpenAI {
  return new OpenAI({ apiKey });
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function buildPromptPayload(
  date: string,
  repository: string,
  pullRequests: PullRequest[],
  commits: Commit[]
): { system: string; user: string } {
  const system = `Você é um assistente de equipe de desenvolvimento. Dada uma lista de pull requests e commits de um repositório GitHub para uma data específica, responda APENAS com um JSON válido (sem markdown code fences) contendo exatamente estas 4 chaves:

{
  "summary": "Resumo conciso em Markdown (pt-BR) do que foi realizado. Agrupe mudanças por feature/área. Destaque mudanças significativas com negrito. Mencione contribuidores. Máximo 300 palavras.",
  "dailySuggestion": "Sugestão de apresentação para daily standup em Markdown (pt-BR). 3-5 bullet points curtos e diretos que o desenvolvedor pode ler em voz alta. Foque no que foi feito, o que está em progresso e bloqueios. Máximo 100 palavras.",
  "relevanceScore": 7,
  "relevanceJustification": "Uma frase curta em pt-BR explicando o score. Escala: 1 = trivial (typos, bumps de dependência), 5 = mudanças moderadas, 10 = feature crítica ou bug fix importante."
}

Regras:
- O campo "summary" deve ser Markdown válido com a data incluída
- O campo "dailySuggestion" deve ter bullet points em Markdown
- O campo "relevanceScore" deve ser um inteiro de 1 a 10
- Se não houver atividade, retorne summary dizendo que não houve atividade, dailySuggestion vazio, score 0 e justificativa correspondente`;

  let userData = `Date: ${date}\nRepository: ${repository}\n\n`;

  if (pullRequests.length > 0) {
    userData += "## Pull Requests Merged\n\n";
    for (const pr of pullRequests) {
      userData += `- PR #${pr.number}: ${pr.title} (by @${pr.author})\n`;
      if (pr.description) {
        userData += `  Description: ${pr.description}\n`;
      }
    }
    userData += "\n";
  }

  if (commits.length > 0) {
    userData += "## Standalone Commits\n\n";
    for (const commit of commits) {
      userData += `- ${commit.sha.substring(0, 7)}: ${commit.message} (by @${commit.author})\n`;
    }
  }

  // Token budget: if over 4000, truncate to titles/messages only
  if (estimateTokens(system + userData) > 4000) {
    userData = `Date: ${date}\nRepository: ${repository}\n\n`;

    if (pullRequests.length > 0) {
      userData += "## Pull Requests Merged\n\n";
      for (const pr of pullRequests) {
        userData += `- PR #${pr.number}: ${pr.title} (by @${pr.author})\n`;
      }
      userData += "\n";
    }

    if (commits.length > 0) {
      userData += "## Standalone Commits\n\n";
      for (const commit of commits) {
        userData += `- ${commit.sha.substring(0, 7)}: ${commit.message} (by @${commit.author})\n`;
      }
    }
  }

  if (pullRequests.length === 0 && commits.length === 0) {
    userData += "No pull requests or commits found for this date.";
  }

  return { system, user: userData };
}

export async function generateStructuredSummary(
  client: OpenAI,
  payload: { system: string; user: string }
): Promise<OpenAIStructuredResponse> {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: payload.system },
        { role: "user", content: payload.user },
      ],
      max_tokens: 800,
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content || "{}";

    try {
      const parsed = JSON.parse(content) as Partial<OpenAIStructuredResponse>;

      return {
        summary: parsed.summary || "Nenhum resumo gerado.",
        dailySuggestion: parsed.dailySuggestion || "",
        relevanceScore: Math.min(10, Math.max(0, parsed.relevanceScore ?? 0)),
        relevanceJustification: parsed.relevanceJustification || "",
      };
    } catch {
      // Fallback: if JSON parsing fails, treat raw content as summary
      return {
        summary: content,
        dailySuggestion: "",
        relevanceScore: 0,
        relevanceJustification: "",
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw openaiError(message);
  }
}
