import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEAMTEST",
  description:
    "A production-ready Next.js + TypeScript + Tailwind app built on Clean Architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pink-100 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
