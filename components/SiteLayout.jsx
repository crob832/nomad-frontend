"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Globe, Menu, X } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/content";

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

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-orange-200 selection:text-orange-900">
      <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="z-50">
            <h1 className="font-serif text-3xl font-bold tracking-tighter flex items-center gap-2">
              <Globe size={24} className="text-orange-800" />
              NOMAD
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-widest uppercase font-medium transition-colors ${
                    active ? "text-orange-800" : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="h-4 w-px bg-stone-300" />
            <Link
              href="/contribute"
              className="px-5 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition-colors"
            >
              Contribute
            </Link>
          </div>

          <button
            className="md:hidden text-stone-900"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute top-20 left-0 w-full bg-stone-50 border-b border-stone-200 p-6 flex flex-col gap-6 md:hidden shadow-xl">
            {[...navLinks, { href: "/contribute", label: "Contribute" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-widest ${
                  pathname === link.href ? "text-orange-800" : "text-stone-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="min-h-screen">{children}</main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h2 className="font-serif text-2xl text-white mb-6 flex items-center gap-2">
                <Globe size={20} className="text-stone-500" /> NOMAD
              </h2>
              <p className="max-w-md font-light">
                {activeSettings.footer?.summary}
              </p>
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
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono">
            <p>&copy; {currentYear} Nomad Journal. All rights reserved.</p>
            <p className="mt-2 md:mt-0">University of Auckland Global Studies</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
