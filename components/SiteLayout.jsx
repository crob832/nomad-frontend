"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Globe2, Menu, X } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/content";
import { getLocalAssetUrl } from "@/lib/localAssets";

const navLinks = [
  { href: "/", label: "Journal" },
  { href: "/issues", label: "Issues" },
  { href: "/about", label: "About" }
];

export default function SiteLayout({ children, settings }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSettings = settings || SITE_SETTINGS;
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { label: "Instagram", href: activeSettings.instagramUrl },
    { label: "LinkedIn", href: activeSettings.linkedInUrl }
  ].filter((item) => item.href);
  const nomadLogoUrl = getLocalAssetUrl("nomadLogoBlack");
  const nomadLogotypeUrl = getLocalAssetUrl("nomadLogotypeBlack");
  const augssLogoUrl = getLocalAssetUrl("augssLogo");
  const uoaLogoUrl = getLocalAssetUrl("uoaLogo");

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent-soft selection:text-ink">
      <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border-default">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="z-50">
            <div className="flex items-center gap-2 md:gap-3">
              <Image
                src={nomadLogoUrl}
                alt="Nomad logo"
                width={40}
                height={40}
                className="h-8 md:h-10 w-auto object-contain"
                sizes="40px"
              />
              <Image
                src={nomadLogotypeUrl}
                alt="Nomad logotype"
                width={230}
                height={80}
                className="h-7 md:h-8 w-auto object-contain"
                sizes="(max-width: 768px) 180px, 230px"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-widest uppercase font-medium transition-colors ${
                    active ? "text-brand" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="h-4 w-px bg-border-strong" />
            <Link
              href="/contribute"
              className="px-5 py-2 bg-brand text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-strong transition-colors"
            >
              Contribute
            </Link>
          </div>

          <button
            className="md:hidden text-ink"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute top-20 left-0 w-full bg-paper border-b border-border-default p-6 flex flex-col gap-6 md:hidden shadow-xl">
            {[...navLinks, { href: "/contribute", label: "Contribute" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-widest ${
                  pathname === link.href ? "text-brand" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="min-h-screen">{children}</main>

      <footer className="relative bg-ink text-ink-subtle py-16 overflow-hidden">
        <div className="absolute inset-0 surface-grid opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 surface-topo opacity-30" aria-hidden="true" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h2 className="font-serif text-2xl text-white mb-6 flex items-center gap-2">
                <Globe2 size={20} className="text-accent" /> NOMAD
              </h2>
              <p className="max-w-md font-light text-slate-300">{activeSettings.footer?.summary}</p>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Explore</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link href="/issues" className="hover:text-white transition-colors">
                    Past Issues
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="/contribute" className="hover:text-white transition-colors">
                    Submission Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Connect</h4>
              <ul className="space-y-4 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.label} <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${activeSettings.contactEmail}`} className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-400">
            <p>&copy; {currentYear} Nomad Journal. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-3">
              <p>University of Auckland Global Studies</p>
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <span className="text-[10px] uppercase tracking-widest text-slate-500">Affiliated with</span>
                <Image
                  src={augssLogoUrl}
                  alt="AUGSS logo"
                  width={150}
                  height={150}
                  className="h-9 md:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 36px, 40px"
                />
                <Image
                  src={uoaLogoUrl}
                  alt="University of Auckland logo"
                  width={480}
                  height={270}
                  className="h-8 md:h-9 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 64px, 72px"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
