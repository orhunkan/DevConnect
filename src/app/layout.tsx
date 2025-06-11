import "./globals.css";
import { Inter } from "next/font/google";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevConnect",
  description: "Geliştiriciler için profil ve blog platformu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}

