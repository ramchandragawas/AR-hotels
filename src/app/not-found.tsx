import Link from "next/link";

export default function NotFound() {
  return <main className="not-found section-shell"><span className="eyebrow">TABLETOP MENU</span><h1>We couldn’t find that menu.</h1><p>Check the restaurant link or return to the Tabletop demo.</p><Link className="button button-dark" href="/menu/saffron-and-stone">Open the sample menu <span aria-hidden="true">↗</span></Link></main>;
}
