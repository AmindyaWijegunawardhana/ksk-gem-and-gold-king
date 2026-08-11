import React from 'react';
import logo from '@/assets/logo.jpeg';
import bgImage from '@/assets/background2.jpg';

export const Hero: React.FC = () => {
  return (
    <section
      className="relative text-[#1E3A8A] overflow-hidden border-b border-gray-100 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">

          {/* Left Column: Hero (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:pr-16 flex flex-col justify-center pt-16 sm:pt-20 lg:pt-24">
            <div className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <h1 className="font-display text-4xl sm:text-5xl leading-tight text-white">
                KSK <br />
                <span className="font-serif font-semibold not-italic">Gem and Gold King</span>
              </h1>
              <p className="font-serif italic text-base sm:text-lg text-white/90 mt-4 leading-relaxed max-w-md">
                Sourcing certified gemstones, gold, and silver jewellery for you.
              </p>
            </div>
          </div>

          {/* Right Column: Logo Display (5 Cols) */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center items-center">
            <img
              src={logo}
              alt="KSK Gem and Gold King Logo"
              className="w-72 h-72 sm:w-80 sm:h-80 object-cover rounded-full shadow-lg border-4 border-[#C9A227]/30 hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
