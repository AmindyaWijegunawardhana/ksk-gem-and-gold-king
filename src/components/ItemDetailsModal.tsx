import React from 'react';
import { X, MessageCircle, ShieldCheck, Tag, Info, Scale, Sparkles } from 'lucide-react';
import { CatalogItem } from '../types';

interface ItemDetailsModalProps {
  item: CatalogItem | null;
  onClose: () => void;
}

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  // Generate dynamic WhatsApp message
  const orderMessage = `Hi, I'm interested in ordering: ${item.name} - ${item.description} - Price: ${item.price}`;
  const whatsappUrl = `https://wa.me/94XXXXXXXXX?text=${encodeURIComponent(orderMessage)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-sm max-w-2xl w-full shadow-lg border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#1E3A8A] text-white px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#C9A227] rounded-xs"></div>
            <h3 className="font-display font-bold text-base uppercase tracking-wider">Item Specifications</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Product Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-sm overflow-hidden bg-gray-100 border border-gray-100 h-64 md:h-full min-h-[220px]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#0F52BA] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                {item.category}
              </div>
              <div className="absolute top-3 right-3">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
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

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.category}</span>
                <h2 className="font-display text-xl font-bold text-[#1E3A8A]">{item.name}</h2>
                <div className="text-lg font-bold text-[#1E3A8A] mt-1">{item.price}</div>
              </div>

              {/* Treatment Badge for Gems */}
              {item.category === 'Gems' && item.treatment && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border bg-blue-50 text-[#1E3A8A] border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>Treatment: {item.treatment}</span>
                </div>
              )}

              <p className="font-body text-xs text-gray-600 leading-relaxed border-t border-b border-gray-100 py-3">
                {item.description}
              </p>

              {/* Detailed Specs List */}
              <div className="space-y-2 bg-gray-50 p-3.5 rounded-sm border border-gray-100 text-xs">
                <h4 className="font-bold text-[#1E3A8A] uppercase tracking-wider text-[10px]">Technical Attributes</h4>
                
                {item.category === 'Gems' ? (
                  <>
                    <div className="flex justify-between py-1 border-b border-gray-200/60 text-[11px]">
                      <span className="text-gray-500">Carat Weight:</span>
                      <span className="font-bold text-gray-800">{item.caratWeight || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200/60 text-[11px]">
                      <span className="text-gray-500">Clarity & Color:</span>
                      <span className="font-bold text-gray-800">{item.clarityColor || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-1 text-[11px]">
                      <span className="text-gray-500">Origin / Certification:</span>
                      <span className="font-bold text-emerald-700">GIA / CGL Certified</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between py-1 border-b border-gray-200/60 text-[11px]">
                      <span className="text-gray-500">Material:</span>
                      <span className="font-bold text-gray-800">{item.materialType || 'N/A'}</span>
                    </div>
                    {item.weightGrams && (
                      <div className="flex justify-between py-1 border-b border-gray-200/60 text-[11px]">
                        <span className="text-gray-500">Weight:</span>
                        <span className="font-bold text-gray-800">{item.weightGrams}</span>
                      </div>
                    )}
                    {item.caratOfSetGem && (
                      <div className="flex justify-between py-1 text-[11px]">
                        <span className="text-gray-500">Mounted Gemstones:</span>
                        <span className="font-bold text-gray-800">{item.caratOfSetGem}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Direct B2B Order Action Bar */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
              <span>Direct order processing via WhatsApp trade desk.</span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#0F52BA] hover:bg-[#172554] text-white font-bold text-xs px-6 py-2.5 rounded-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
