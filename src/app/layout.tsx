import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const viewport: Viewport = { themeColor: "#08080d" };

export const metadata: Metadata = {
  title: "Recap — Seu trabalho, visualizado",
  description: "Resumos diários do seu código com IA, heatmaps de atividade e sugestões para daily standup.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${outfit.variable} ${jetbrains.variable} font-[family-name:var(--font-outfit)] antialiased grain`}>
        <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
      </body>
    </html>
  );
}
