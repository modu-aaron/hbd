import "./globals.css";
import type { Metadata } from "next";
import { Stylish } from "next/font/google";
import Providers from "../components/Provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "HBD",
  description: "특별한 날을 기념하는 사이트입니다",
};

const stylish = Stylish({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sh",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link type="image/png" sizes="32x32" rel="icon" href="/snail.png" />
      </head>
      <body
        style={{ height: "100dvh" }}
        className={`${stylish.variable} font-sh bg-white dark:bg-[#090908]`}
      >
        <Providers>
          <main>
            {children}
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
