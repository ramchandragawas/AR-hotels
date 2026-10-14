import Link from "next/link";
import { findDemoTable } from "@/data/demo-menu";
import { getLocale, localizeMenuUrl } from "@/lib/i18n";

const features = [
  { number: "01", title: "Details before the first bite", copy: "Make space for dish details, availability and the information guests need to choose.", icon: "◉" },
  { number: "02", title: "Made for the moment", copy: "One quick scan opens a clear menu, right in the browser guests already have.", icon: "⌁" },
  { number: "03", title: "Built around your place", copy: "Your food, your story, and a digital experience that feels like it belongs.", icon: "✳" },
];

export default async function HomePage({ searchParams }: { searchParams: Promise<{ lang?: string | string[]; table?: string | string[] }> }) {
  const query = await searchParams;
  const menuUrl = localizeMenuUrl("/menu/saffron-and-stone", getLocale(query.lang), findDemoTable(query.table)?.token);
  return <main>
    <section className="hero section-shell"><div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> THE MENU, REIMAGINED</span><h1>A little more<br />feast for the <span>eyes.</span></h1><p className="hero-description">A thoughtfully designed digital menu gives guests a clearer way to explore dishes, find useful details and choose what sounds good.</p><div className="hero-actions"><Link className="button button-dark" href={menuUrl}>Explore the menu <span aria-hidden="true">↗</span></Link><a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div><div className="hero-note"><span className="note-avatars" aria-hidden="true"><i>✦</i><i>↗</i><i>◌</i></span><span>A new way to fall for what’s on the menu.</span></div></div>
      <div className="hero-visual" role="img" aria-label="Sample food photograph used in the Tabletop concept preview"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="visual-kicker"><span>✳</span> A taste of what’s possible</div><div className="visual-food photo-paneer" /><div className="floating-label"><span className="label-spark">✦</span><span><strong>Paneer tikka</strong><small>A sample menu dish</small></span><span className="label-arrow">↗</span></div><div className="visual-caption"><span>SAMPLE FOOD PHOTO</span><span>01 — 03</span></div><span className="visual-star star-a">✳</span><span className="visual-star star-b">✦</span></div><div className="hero-bottom"><span>GOOD FOOD DESERVES A CLOSER LOOK</span><span className="scroll-cue"><span /> SCROLL TO EXPLORE</span></div>
    </section>
    <section className="intro section-shell" id="how-it-works"><div className="section-overline"><span>01 / A FRESH PERSPECTIVE</span><span>MORE THAN A MENU</span></div><div className="intro-heading"><h2>Meet your next<br />favourite <em>dish.</em></h2><p>From the first scan to that last little bite, make choosing what to eat part of the experience.</p></div><div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.number}><div className="feature-top"><span>{feature.number}</span><span className="feature-icon">{feature.icon}</span></div><h3>{feature.title}</h3><p>{feature.copy}</p></article>)}</div></section>
    <section className="demo-callout section-shell"><div className="callout-photo" /><div className="callout-copy"><span className="eyebrow">A TABLE FOR TWO? OR TWENTY.</span><h2>Start with a<br />little <em>curiosity.</em></h2><p>Step inside Saffron &amp; Stone, our demo menu. Pick your craving and see where it takes you.</p><Link className="button button-light" href={menuUrl}>Open the demo menu <span aria-hidden="true">↗</span></Link></div></section>
    <footer className="site-footer section-shell"><Link className="wordmark" href="/"><span className="wordmark-mark">T</span><span>tabletop<span className="wordmark-period">.</span></span></Link><span>Good things happen around a table.</span><span>© 2026 TABLETOP</span></footer>
  </main>;
}
