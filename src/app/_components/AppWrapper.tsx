import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import ClientSideWrapper from "@/app/_components/ReqctQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-jetBrainsMono",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rage trade",
  description: "Rage trade",
};

export default function AppWrapper({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ClientSideWrapper>
      <html lang="en">
        <body
          className={`${jetBrainsMono.variable} ${inter.variable} antialiased flex flex-col h-screen bg-gray-900 text-white font-Inter`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </ClientSideWrapper>
  );
}
