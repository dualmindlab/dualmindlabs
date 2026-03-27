import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dual Mind Labs — AI-Native Dev Studio | SaaS & Agentic Workflow Engineers",
  description:
    "Two-person elite dev studio building AEO-optimized SaaS architectures and autonomous multi-agentic workflows. Ashwin Hingve (AI/DevOps) + Mohit Sahu (Backend/System Design).",
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
          href="https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,100..900&family=Space+Grotesk:ital,wght@0,300..700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dual Mind Labs",
              "url": "https://dualmindlabs.com",
              "email": "hello@dualmindlabs.com",
              "description": "AI-native development studio specializing in AEO-optimized SaaS architectures and autonomous multi-agentic workflows",
              "foundingDate": "2023",
              "numberOfEmployees": 2,
              "knowsAbout": ["Generative AI","LLM Orchestration","SaaS Architecture","Agentic Workflows","React/Next.js","System Design"]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Ashwin Hingve",
                "jobTitle": "AI Engineer & Full-Stack Developer",
                "worksFor": { "@type": "Organization", "name": "Dual Mind Labs" },
                "knowsAbout": ["Generative AI","LLMs","Next.js","Python","DevOps","CI/CD","Docker"]
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Mohit Sahu",
                "jobTitle": "Backend Engineer & System Architect",
                "worksFor": { "@type": "Organization", "name": "Dual Mind Labs" },
                "knowsAbout": ["System Design","Node.js","APIs","Databases","Cloud Infrastructure"]
              }
            ])
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "AEO-Optimized SaaS Architectures",
                "provider": { "@type": "Organization", "name": "Dual Mind Labs" },
                "description": "Multi-tenant SaaS platforms optimized for Answer Engine visibility and semantic search",
                "serviceType": "Software Development"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Autonomous Multi-Agentic Workflows",
                "provider": { "@type": "Organization", "name": "Dual Mind Labs" },
                "description": "LLM orchestration, tool-calling agents, RAG pipelines, and CRM-integrated AI systems",
                "serviceType": "AI Development"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Revenue-Ready Mobile Products",
                "provider": { "@type": "Organization", "name": "Dual Mind Labs" },
                "description": "Cross-platform mobile apps engineered for App Store approval and user retention",
                "serviceType": "Mobile Development"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Systems of Scale",
                "provider": { "@type": "Organization", "name": "Dual Mind Labs" },
                "description": "Backend infrastructure, internal tooling, and automation systems that scale horizontally",
                "serviceType": "Software Development"
              }
            ])
          }}
        />
      </head>
      <body className="bg-[#050505] text-white font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
