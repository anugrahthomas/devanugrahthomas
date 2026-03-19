import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anugrah Thomas — Full Stack Developer",
  description:
    "Portfolio of Anugrah Thomas, a passionate Full Stack Developer specialising in Next.js, TypeScript, Node.js and cloud-native applications.",
  keywords: [
    "Anugrah Thomas",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Anugrah Thomas", url: "https://github.com/anugrahthomas" }],
  creator: "Anugrah Thomas",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Anugrah Thomas — Full Stack Developer",
    description:
      "Portfolio of Anugrah Thomas — crafting performant, beautiful web experiences with modern technologies.",
    siteName: "Anugrah Thomas Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anugrah Thomas — Full Stack Developer",
    description: "Full Stack Developer building fast, scalable, and beautiful web apps.",
    creator: "@_anugrahthomas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100 selection:bg-violet-500/30 selection:text-violet-200`}
      >
        {children}
      </body>
    </html>
  );
}
