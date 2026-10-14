import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = { title: "Tabletop — A menu you can step into", description: "Explore a new kind of dining menu, with interactive 3D dishes and a table-ready digital experience." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Suspense fallback={<div className="site-header"><span className="wordmark"><span className="wordmark-mark">T</span><span>tabletop<span className="wordmark-period">.</span></span></span></div>}><SiteHeader /></Suspense>{children}</body></html>;
}
