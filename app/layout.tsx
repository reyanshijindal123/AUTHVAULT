import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Vault",
  description: "Todo app built for task planning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}