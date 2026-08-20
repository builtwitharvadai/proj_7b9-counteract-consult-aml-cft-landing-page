import { AboutSection } from '../components/about/AboutSection';
import { EnhancedHero } from '../components/hero/EnhancedHero';
import { SiteBackground } from '../components/hero/SiteBackground';
import { PortfolioGallery } from '../components/portfolio/PortfolioGallery';

export default function HomePage(): JSX.Element {
  return (
    <main className="relative min-h-screen text-white">
      <SiteBackground />

      <EnhancedHero />

      <section
        id="portfolio"
        aria-labelledby="portfolio-heading"
        className="relative z-10 w-full py-20 sm:py-24 lg:py-28"
        style={{
          backgroundImage:
            'linear-gradient(rgba(44,62,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(44,62,248,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <span className="mb-4 inline-block pixel-border border-brand-blue bg-brand-blue/15 px-3 py-1 font-heading text-xs uppercase tracking-widest text-brand-light">
              Our Work
            </span>
            <h2
              id="portfolio-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight text-white"
            >
              Case Studies &amp; Proven Impact
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm sm:text-base leading-relaxed text-gray-300">
              A selection of engagements where CounterAct Consult helped financial
              institutions strengthen AML, CFT, fraud detection, and risk
              assessment programs — with measurable outcomes and regulator-ready
              evidence.
            </p>
          </header>

          <PortfolioGallery />
        </div>
      </section>

      <AboutSection />
    </main>
  );
}
