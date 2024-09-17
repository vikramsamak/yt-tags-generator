import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactQueryProvider from "@/contexts/ReactQueryProvider";
import "./globals.css";

//TODO: CHANGE THIS FOR SEO.

export const metadata: Metadata = {
  title: "Youtube Tags Generator",
  description: "Webapp for creating youtube tags.",
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
