import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });
const appDescription =
  "Save, organize, and access your code snippets effortlessly. Sync with your GitHub gists, making your snippets available directly in VS Code and your browser.";
const appShortTitle = "Keep Code: Bring your code everywhere";
export const metadata: Metadata = {
  title: "Keep Code | snippets manager",
  description: appDescription,
  keywords: [
    "code snippets",
    "snippet manager",
    "code management",
    "programming efficiency",
    "developer tools",
    "coding productivity",
    "code organization",
    "GitHub gists",
    "VS Code extensions",
    "code reuse",
    "coding shortcuts",
    "coding collaboration",
    "code versioning",
    "GitHub OAuth",
    "code bookmarking",
  ],
  authors: { name: "Brandon Porcel", url: "https://github.com/brandonporcel?" },
  creator: "Brandon Porcel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://keep-code.vercel.app",
    title: appShortTitle,
    description: appDescription,
    siteName: "Keep Code",
    images: [
      {
        url: "https://keep-code.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appShortTitle,
    description: appDescription,
    images: [
      {
        url: "https://keep-code.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: [
    {
      type: "favicon",
      url: "favicon.ico",
    },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
