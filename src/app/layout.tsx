import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Valentine's Day Cards",
    default: "Valentine's Day Cards 💝",
  },
  description:
    "Create and share special Valentine's Day cards with your loved ones.",
  metadataBase: new URL("https://valentine-cards.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Valentine's Day Cards",
    images: [
      {
        url: "https://i.giphy.com/XxEy4h6YxKE2H5TZ1x.webp",
        width: 1200,
        height: 630,
        alt: "Valentine's Day Cards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="google-analytics"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TC9HQ6EY41"
        />
        <Script id="google-analytics-script">
          {`window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());

          gtag("config", "G-TC9HQ6EY41");`}
        </Script>
      </head>
      <body className={inter.className}>
        <div className="sticky top-0 flex items-center justify-center py-4 text-white bg-pink-500 border-b-4 border-pink-900 z-[1000]">
          <Link href="/" className="text-2xl font-bold">
            wouldyoubemyvalentine, baby?
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-screen-lg">{children}</div>
        </div>
      </body>
    </html>
  );
}
