import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Stack } from "@/components/stack";
import { About } from "@/components/about";
import { SiteFooter } from "@/components/site-footer";
import { SiteEffects } from "@/components/site-effects";

export default function Home() {
  // Computed once at build time and embedded in the static HTML.
  const now = new Date();
  const stamp = `carlosandre.dev · ${now.getFullYear()} · build ${now
    .toISOString()
    .slice(0, 10)}`;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <SiteHeader />
      <Hero />
      <SelectedWork />
      <Stack />
      <About />
      <SiteFooter stamp={stamp} />
      <SiteEffects />
    </main>
  );
}
