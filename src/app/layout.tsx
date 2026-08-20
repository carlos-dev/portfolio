import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carlos André — Full-Stack Engineer",
  description:
    "Construo sistemas de dados que precisam ficar de pé sozinhos. Este site é um deles.",
  openGraph: {
    title: "Carlos André — Full-Stack Engineer",
    description:
      "Construo sistemas de dados que precisam ficar de pé sozinhos. Este site é um deles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${sans.variable} ${mono.variable} bg-bg font-sans text-fg antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
