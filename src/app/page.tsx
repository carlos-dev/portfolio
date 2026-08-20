import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Stack } from "@/components/stack";
import { About } from "@/components/about";
import { SiteFooter } from "@/components/site-footer";
import { SiteEffects } from "@/components/site-effects";
import { profile, projects } from "@/lib/content";

// Structured data: ajuda o Google a entender que a página é uma pessoa,
// não um produto. Conteúdo 100% estático, montado no build.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.tagline,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  sameAs: [profile.githubUrl, profile.productUrl],
  knowsAbout: [
    ...new Set(projects.flatMap((p) => p.stack)),
  ],
};

export default function Home() {
  // Calculado uma vez no build e embutido no HTML estático.
  const now = new Date();
  const stamp = `carlosandre.dev · ${now.getFullYear()} · build ${now
    .toISOString()
    .slice(0, 10)}`;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        // Dados estáticos definidos acima — nada vem de input do usuário.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* header e footer ficam FORA de <main>: como descendentes dele
          perderiam os papéis banner e contentinfo. */}
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <SelectedWork />
        <Stack />
        <About />
      </main>
      <SiteFooter stamp={stamp} />
      <SiteEffects />
    </div>
  );
}
