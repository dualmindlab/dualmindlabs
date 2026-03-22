import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dual Mind Labs — We Build Scalable & AI-Powered Digital Products",
  description:
    "A two-person development studio specializing in web, mobile, AI-powered solutions, and custom software. 9+ websites, 3 mobile apps, and counting.",
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
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-white font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
