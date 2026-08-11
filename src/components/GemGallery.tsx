import React, { useState } from 'react';
import { CatalogItem, GalleryTab } from '../types';
import { ItemDetailsModal } from './ItemDetailsModal';
import { Gem } from 'lucide-react';

interface GemGalleryProps {
  catalog: CatalogItem[];
}

// Gallery Theme Colors
const themeColors: Record<GalleryTab, { accent: string; bg: string }> = {
  'All': { accent: '#4C1D6B', bg: '#F5F0F8' },
  'Gems': { accent: '#0F52BA', bg: '#EEF3FB' },
  'Gold & Silver': { accent: '#C9A227', bg: '#FAF6E8' },
  'Imitation': { accent: '#A8AAAD', bg: '#F4F4F5' },
};

export const GemGallery: React.FC<GemGalleryProps> = ({ catalog }) => {
  const [activeTab, setActiveTab] = useState<GalleryTab>('All');
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);

  // Filter catalog by activeTab
  const filteredCatalog = catalog.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  return (
    <section
      id="gallery"
      style={{
        '--gallery-accent': themeColors[activeTab].accent,
        '--gallery-bg': themeColors[activeTab].bg,
        backgroundColor: 'var(--gallery-bg)',
        transition: 'background-color 300ms ease, color 300ms ease, border-color 300ms ease',
      } as React.CSSProperties}
      className="py-16 lg:py-20 border-b border-gray-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-300/40 pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Catalog Selection</span>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--gallery-accent)', transition: 'color 300ms ease' }}
            >
              The Gem Gallery
            </h2>
          </div>

          {/* Theme Shifting Tabs */}
          <div className="flex flex-wrap bg-white/90 backdrop-blur-sm p-1 rounded-sm border border-gray-200 shadow-xs gap-1">
            {(['All', 'Gems', 'Gold & Silver', 'Imitation'] as GalleryTab[]).map((tab) => {
              const isActive = activeTab === tab;
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    backgroundColor: isActive ? 'var(--gallery-accent)' : 'transparent',
                    borderColor: isActive ? 'var(--gallery-accent)' : 'transparent',
                    color: isActive ? '#ffffff' : '#374151',
                    transition: 'all 300ms ease',
                  }}
                  className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${
                    isActive ? 'shadow-xs' : 'hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredCatalog.length === 0 ? (
          <div className="bg-white rounded-sm p-12 text-center border border-gray-200 max-w-md mx-auto space-y-3 shadow-sm">
            <Gem className="w-10 h-10 text-slate-300 mx-auto" />
            <h3
              className="font-display text-lg font-bold"
              style={{ color: 'var(--gallery-accent)', transition: 'color 300ms ease' }}
            >
              No Items Found
            </h3>
            <p className="font-body text-xs text-gray-500">
              There are currently no items available in the <span className="font-semibold">{activeTab}</span> category. Use the Admin panel below to add items.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalog.map((item) => {
              // Place Order WhatsApp link
              const orderText = `Hi, I'm interested in ordering: ${item.name} - ${item.description} - Price: ${item.price}`;
              const whatsappUrl = `https://wa.me/94777935306?text=${encodeURIComponent(orderText)}`;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-sm border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                >
                  {/* Card Image Container */}
                  <div className="h-52 bg-gray-200 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Category Tag (Themed) */}
                    <div
                      className="absolute top-3 left-3 text-white text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-sm shadow-xs"
                      style={{
                        backgroundColor: 'var(--gallery-accent)',
                        transition: 'background-color 300ms ease',
                      }}
                    >
                      {item.category}
                    </div>

                    {/* Treatment Badge for Gems */}
                    {item.category === 'Gems' && item.treatment && (
                      <div className="absolute top-3 right-3 bg-gray-900/90 text-white text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-sm">
                        {item.treatment}
                      </div>
                    )}

                    {/* Availability Tag */}
                    <div className="absolute bottom-3 right-3">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-xs ${
                        item.availability === 'In Stock'
                          ? 'bg-emerald-700 text-white'
                          : item.availability === 'Reserved'
                          ? 'bg-amber-600 text-white'
                          : 'bg-rose-700 text-white'
                      }`}>
                        {item.availability}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-xs font-bold mb-1 uppercase tracking-tighter text-[#1E3A8A] line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Actions */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                      <span
                        className="font-bold text-sm"
                        style={{ color: 'var(--gallery-accent)', transition: 'color 300ms ease' }}
                      >
                        {item.price}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedItem(item)}
                          style={{
                            borderColor: 'var(--gallery-accent)',
                            color: 'var(--gallery-accent)',
                            transition: 'color 300ms ease, border-color 300ms ease',
                          }}
                          className="text-[10px] border px-3 py-1 font-bold uppercase tracking-widest hover:bg-gray-50 rounded-sm"
                        >
                          DETAILS
                        </button>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            backgroundColor: 'var(--gallery-accent)',
                            borderColor: 'var(--gallery-accent)',
                            transition: 'background-color 300ms ease, border-color 300ms ease',
                          }}
                          className="text-[10px] border text-white px-3 py-1 font-bold uppercase tracking-widest hover:opacity-90 rounded-sm"
                        >
                          ORDER
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Details Modal */}
      <ItemDetailsModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
