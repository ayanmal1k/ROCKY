import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rocky Token ($ROCKY) | The Solid Rock of DeFi",
  description: "Experience the geological force of DeFi. Rocky Token is built on secure tokenomics, deep community foundations, and premium dynamic interactive mechanics.",
  keywords: ["Rocky Token", "ROCKY", "Crypto", "DeFi", "Solana", "Blockchain", "Meme Token", "Premium UI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground bg-background">{children}</body>
    </html>
  );
}
