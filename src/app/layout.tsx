import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const numpty = localFont({
  src: "../../public/numpty/Numpty DEMO.otf",
  variable: "--font-numpty",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rocky - The Pet Rock of Solana",
  description: "A legendary stone that rolled out of nowhere and became the strongest community on Solana.",
  metadataBase: new URL("https://rockyonsol.com"),
  icons: {
    icon: "/rocky.png",
    shortcut: "/rocky.png",
    apple: "/rocky.png",
  },
  openGraph: {
    title: "Rocky - The Pet Rock of Solana",
    description: "A legendary stone that rolled out of nowhere and became the strongest community on Solana.",
    images: [
      {
        url: "/heroo-bg.png",
        width: 1200,
        height: 630,
        alt: "Rocky - The Pet Rock of Solana",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rocky - The Pet Rock of Solana",
    description: "A legendary stone that rolled out of nowhere and became the strongest community on Solana.",
    images: ["/heroo-bg.png"],
  },
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
        <Script
          src="https://cdn.zanderio.ai/widget/loader.js"
          data-id="wdg_OJSqfIxdhjBf53ocXBuaPIMk"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
