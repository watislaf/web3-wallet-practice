import "./globals.css";
import { Header } from "@/components/header/Header";
import { Sidebar } from "@/components/header/Sidebar";
import AppWrapper from "@/app/_components/AppWrapper";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AppWrapper>
      <Header />
      <div className="flex h-full">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </AppWrapper>
  );
}
