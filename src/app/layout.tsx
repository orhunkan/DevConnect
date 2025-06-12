// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";
import MainLayout from "@/components/MainLayout"; // 👈 ekledik

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevConnect",
  description: "Geliştiriciler için sosyal platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.className}>
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout> {/* 👈 artık her sayfa bu layout'u kullanır */}
        </Providers>
      </body>
    </html>
  );
}
