import React from 'react';
import { Lock, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

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

interface FooterProps {
  onOpenAdmin: () => void;
  whatsappNumber: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, whatsappNumber }) => {
  return (
    <footer className="bg-[#1E3A8A] text-white py-6 border-t border-gray-100 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-blue-900/60 items-center">

          {/* Logo & Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#C9A227] text-[#1E3A8A] flex items-center justify-center font-bold font-display text-xs rounded-sm">
                KSK
              </div>
              <span className="font-display font-bold text-sm sm:text-base text-white tracking-wider uppercase">
                KSK GEM & GOLD KING
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://web.facebook.com/profile.php?id=61592920243246"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-blue-950/40 border border-blue-800/40 flex items-center justify-center text-gray-300 hover:text-[#C9A227] hover:bg-blue-900/50 transition-colors"
                title="Follow us on Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/kskgemandgoldking/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-blue-950/40 border border-blue-800/40 flex items-center justify-center text-gray-300 hover:text-[#C9A227] hover:bg-blue-900/50 transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://vm.tiktok.com/ZS9kjkkAR7WDN-NQ74o/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-blue-950/40 border border-blue-800/40 flex items-center justify-center text-gray-300 hover:text-[#C9A227] hover:bg-blue-900/50 transition-colors"
                title="Follow us on TikTok"
              >
                <Tiktok className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Sourcing Hub Location */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
              <span>Bus Stand, Sooriyawewa</span>
            </div>
          </div>

          {/* Quick Contact Info */}
          <div className="md:col-span-4 flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-end text-gray-300">
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>{whatsappNumber}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>kskgemandgoldking@gmail.com</span>
            </p>
          </div>

        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} KSK Gem and Gold King. All rights reserved. B2B Sourcing Portal.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Sourcing</a>

            {/* Admin Link */}
            <button
              onClick={onOpenAdmin}
              className="hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-medium"
              title="Demo Admin Dashboard"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
