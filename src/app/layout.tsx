import type { Metadata } from "next";
import { Ma_Shan_Zheng, Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ConditionalNavbar } from "@/components/common/ConditionalNavbar";
import { PaperBackground } from "@/components/common/PaperBackground";

/* --------------------------------------------------------------------------
   Google Fonts
   -------------------------------------------------------------------------- */
const maShanZheng = Ma_Shan_Zheng({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ma-shan-zheng",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

/* --------------------------------------------------------------------------
   LXGW WenKai via CDN (no npm package); we inject a Google Fonts link instead
   We use a local CSS variable shim so the fallback still works.
   -------------------------------------------------------------------------- */
// LXGW WenKai is loaded via <link> in the HTML head (see below)

export const metadata: Metadata = {
  title: {
    default: "未说 / Untold",
    template: "%s · 未说",
  },
  description: "故事从你打开这本书才真正开始 — 互动小说平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${maShanZheng.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* LXGW WenKai via Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=LXGW+WenKai:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        {/* Anti-flash theme bootstrap — runs before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('untold:theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        style={{ fontFamily: "'LXGW WenKai', var(--font-body, serif)" }}
      >
        <PaperBackground />
        <ConditionalNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
