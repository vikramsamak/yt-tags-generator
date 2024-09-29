import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/contexts/ReactQueryProvider";
import { CANNONICAL_URL, METADATA } from "@/constants/Constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: METADATA.title,
  description: METADATA.description,
  keywords: METADATA.keywords,
  creator: METADATA.creator,
  authors: METADATA.authors,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="canonical" href={CANNONICAL_URL} />
      </Head>
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
