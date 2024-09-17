import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactQueryProvider from "@/contexts/ReactQueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "RapidTags - Best YouTube Tags Generator for SEO Optimization",
  description:
    "RapidTags is a powerful YouTube tags generator designed to help creators boost their video SEO and reach a larger audience. Generate relevant and trending tags instantly to optimize your YouTube content for maximum visibility.",
  keywords: [
    "RapidTags",
    "YouTube tags generator",
    "best YouTube tags",
    "YouTube SEO tool",
    "tags for YouTube videos",
    "video optimization",
    "increase YouTube views",
    "YouTube keyword research",
    "SEO for YouTube",
    "generate YouTube tags",
    "trending YouTube tags",
    "YouTube tags 2023",
    "boost YouTube SEO",
    "YouTube marketing tools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col w-screen min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Footer />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
