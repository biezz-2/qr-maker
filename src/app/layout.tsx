import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import localStorage polyfill first to prevent SSR errors
import "@/lib/localstorage-polyfill";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Maker - Generate QR Codes Easily",
  description: "A modern QR code generator built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Create QR codes quickly and easily.",
  keywords: ["QR code", "QR generator", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React"],
  authors: [{ name: "Biezz" }],
  icons: [
    { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  openGraph: {
    title: "QR Maker",
    description: "Generate QR codes easily with our modern tool",
    url: "https://qr-maker.biezz.my.id",
    siteName: "QR Maker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Maker",
    description: "Generate QR codes easily with our modern tool",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
