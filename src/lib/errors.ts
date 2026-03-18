import { ErrorCode, ApiErrorResponse } from "./types";

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode: number,
    public retryAfter?: number
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function invalidDate(): AppError {
  return new AppError("INVALID_DATE", "Date must be in YYYY-MM-DD format", 400);
}

export function missingConfig(detail: string): AppError {
  return new AppError("MISSING_CONFIG", `Missing configuration: ${detail}`, 400);
}

export function githubAuthError(): AppError {
  return new AppError(
    "GITHUB_AUTH_ERROR",
    "GitHub authentication failed. Check your GITHUB_TOKEN.",
    401
  );
}

export function openaiError(detail: string): AppError {
  return new AppError("OPENAI_ERROR", `OpenAI error: ${detail}`, 500);
}

export function rateLimited(resetTimestamp: number): AppError {
  return new AppError(
    "RATE_LIMITED",
    "GitHub API rate limit reached. Try again later.",
    429,
    resetTimestamp
  );
}

export function internalError(detail: string): AppError {
  return new AppError("INTERNAL_ERROR", `Internal error: ${detail}`, 500);
}

export function toErrorResponse(error: unknown): {
  status: number;
  body: ApiErrorResponse;
} {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      body: {
        error: {
          code: error.code,
          message: error.message,
          ...(error.retryAfter !== undefined && { retryAfter: error.retryAfter }),
        },
      },
    };
  }

  return {
    status: 500,
    body: {
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      },
    },
  };
}
