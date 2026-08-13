import React, { useState } from 'react';
import { Menu, X, Facebook, Instagram } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

const Tiktok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#1E3A8A] text-white border-b border-gray-100 shadow-sm">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Container */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#C9A227] shadow-sm group-hover:scale-105 transition-transform bg-white">
            <img src={logo} alt="KSK Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#C9A227] transition-colors">
                KSK GEM & GOLD KING
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#C9A227] bg-[#C9A227]/20 px-1.5 py-0.5 rounded-sm border border-[#C9A227]/40">

              </span>
            </div>

          </div>
        </a>

        {/* Desktop Nav Links & Socials */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-200">
            <a href="#" className="text-white border-b-2 border-[#991B1B] pb-1">
              Home
            </a>
            <a href="#gallery" className="hover:text-[#C9A227] pb-1 transition-colors">
              Gem Gallery
            </a>
          </nav>
          <span className="h-4 w-px bg-slate-400/30" aria-hidden="true"></span>
          <div className="flex items-center gap-4">
            <a
              href="https://web.facebook.com/profile.php?id=61592920243246"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-[#C9A227] transition-all hover:scale-110"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/kskgemandgoldking/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-[#C9A227] transition-all hover:scale-110"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://vm.tiktok.com/ZS9kjkkAR7WDN-NQ74o/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-[#C9A227] transition-all hover:scale-110"
              title="TikTok"
            >
              <Tiktok className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-sm text-slate-200 hover:text-white hover:bg-blue-900/50 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#172554] border-b border-blue-900/50 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white text-xs font-bold uppercase tracking-widest border-b border-blue-900/40"
          >
            Home
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-[#C9A227] text-xs font-bold uppercase tracking-widest border-b border-blue-900/40"
          >
            Gem Gallery
          </a>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-center bg-blue-950 hover:bg-blue-900 text-slate-300 font-bold py-2 rounded-sm text-[10px] uppercase tracking-widest border border-blue-800"
            >
              Admin Portal
            </button>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-blue-900/40">
              <a
                href="https://web.facebook.com/profile.php?id=61592920243246"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#C9A227] transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/kskgemandgoldking/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#C9A227] transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://vm.tiktok.com/ZS9kjkkAR7WDN-NQ74o/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#C9A227] transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <Tiktok className="w-4 h-4" />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
