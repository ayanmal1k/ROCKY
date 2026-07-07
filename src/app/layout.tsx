import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const numpty = localFont({
  src: "../../public/numpty/Numpty DEMO.otf",
  variable: "--font-numpty",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rocky Token",
  description: "Next.js & Tailwind CSS Clean Slate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${numpty.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
