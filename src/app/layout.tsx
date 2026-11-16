import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL, X_URL } from "@/lib/site";
import "./globals.css";

const description =
  "Ashwin Hingve — full-stack engineer in Bhopal, India building web platforms and applied-AI features with TypeScript, Next.js and Node.js. Client delivery across e-commerce, matrimonial platforms and industrial IoT.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ashwin Hingve · Full-Stack Engineer",
  description,
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
  keywords: [
    "Ashwin Hingve",
    "Full-Stack Engineer",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Applied AI",
    "Bhopal",
    "React",
    "pgvector",
    "OpenCV",
  ],
  authors: [{ name: "Ashwin Hingve", url: SITE_URL }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ashwin Hingve",
    title: "Ashwin Hingve · Full-Stack Engineer",
    description,
    images: [
      {
        url: "/media/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ashwin Hingve — Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@AshwinHingve",
    title: "Ashwin Hingve · Full-Stack Engineer",
    description,
    images: ["/media/og-image.jpg"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashwin Hingve",
  jobTitle: "Full-Stack Engineer",
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhopal",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  sameAs: [GITHUB_URL, LINKEDIN_URL, X_URL],
  knowsAbout: [
    "Full-stack web development",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Applied AI",
    "PostgreSQL",
    "pgvector",
    "OpenCV",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
