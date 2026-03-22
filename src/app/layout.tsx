import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dual Mind Labs — AI Infrastructure for Developers",
  description:
    "Build, deploy, and scale production-grade AI systems. The modern ML platform for engineering teams.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
