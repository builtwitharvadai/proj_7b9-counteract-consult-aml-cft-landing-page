import { PortfolioGallery } from '../components/portfolio/PortfolioGallery';

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-matrix-black text-white">
      <section
        id="portfolio"
        aria-labelledby="portfolio-heading"
        className="relative w-full bg-matrix-black py-20 sm:py-24 lg:py-28"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <span className="mb-4 inline-block pixel-border border-cyber-green bg-cyber-green/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-cyber-green">
              Our Work
            </span>
            <h2
              id="portfolio-heading"
              className="font-mono text-3xl sm:text-4xl lg:text-5xl leading-tight text-white"
            >
              Case Studies &amp; Proven Impact
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-300">
              A selection of engagements where CounterAct Consult helped financial
              institutions strengthen AML, CFT, fraud detection, and risk
              assessment programs — with measurable outcomes and regulator-ready
              evidence.
            </p>
          </header>

          <PortfolioGallery />
        </div>
      </section>
    </main>
  );
}
