import React, { useState } from 'react';
import { CustomerRequest } from '../types';
import { Send, CheckCircle2, ShieldAlert, Upload, Sparkles, Building2, Globe2, Phone } from 'lucide-react';

interface RequestGemFormProps {
  onRequestSubmit: (newRequest: CustomerRequest) => void;
}

export const RequestGemForm: React.FC<RequestGemFormProps> = ({ onRequestSubmit }) => {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phoneWhatsApp: '',
    country: '',
    companyName: '',
    gemType: 'Ceylon Blue Sapphire',
    customGemType: '',
    caratRange: '2.0 - 4.0 carats',
    colorClarityPref: 'VVS Clarity, Intense Saturation',
    budgetRange: '$5,000 - $10,000',
    quantity: '1 stone',
    deliveryCountry: '',
    message: '',
    referenceImageName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, referenceImageName: e.target.files![0].name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const actualGemType = formData.gemType === 'Other / Custom' ? (formData.customGemType || 'Custom Requirement') : formData.gemType;

    const newReq: CustomerRequest = {
      id: `req-${Date.now()}`,
      clientName: formData.clientName,
      email: formData.email,
      phoneWhatsApp: formData.phoneWhatsApp,
      country: formData.country,
      companyName: formData.companyName,
      gemType: actualGemType,
      caratRange: formData.caratRange,
      colorClarityPref: formData.colorClarityPref,
      budgetRange: formData.budgetRange,
      quantity: formData.quantity,
      deliveryCountry: formData.deliveryCountry || formData.country,
      message: formData.message,
      referenceImageName: formData.referenceImageName,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    };

    onRequestSubmit(newReq);
    setSubmitted(true);

    // Reset form after short delay
    setTimeout(() => {
      setFormData({
        clientName: '',
        email: '',
        phoneWhatsApp: '',
        country: '',
        companyName: '',
        gemType: 'Ceylon Blue Sapphire',
        customGemType: '',
        caratRange: '2.0 - 4.0 carats',
        colorClarityPref: '',
        budgetRange: '$5,000 - $10,000',
        quantity: '1 stone',
        deliveryCountry: '',
        message: '',
        referenceImageName: ''
      });
    }, 1000);
  };

  return (
    <section id="request-form" className="py-16 lg:py-20 bg-white text-[#1E3A8A] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-8 border-b border-gray-100 pb-4">
          <div className="w-12 h-1 bg-[#C9A227] mb-3"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Custom Procurement</span>
          <h2 className="font-display text-3xl font-bold text-[#1E3A8A]">Custom Sourcing Request</h2>
        </div>

        {submitted ? (
          <div className="bg-[#C9A227]/10 border border-[#C9A227]/40 rounded-sm p-8 text-center space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 bg-[#1E3A8A] text-[#C9A227] rounded-sm flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1E3A8A]">
              Procurement Inquiry Received
            </h3>
            <p className="font-body text-xs text-gray-600">
              Our sourcing desks in Colombo and Geneva will review your technical specifications and respond with certified parcel options within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-[#1E3A8A] text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-sm hover:bg-[#172554] transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <p className="font-body text-xs sm:text-sm text-gray-600 leading-relaxed">
                Can't find the specific stone or cut lot in our active gallery? Submit your technical requirements and our mine-direct sourcing desk in Colombo and Bangkok will procure it for you.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-sm bg-blue-100 text-[#1E3A8A] flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-tight">Wholesale Trade Priority</h4>
                    <p className="text-[11px] text-gray-500">B2B quotes tailored for retail jewelers, lapidaries, and brokers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-sm bg-blue-100 text-[#1E3A8A] flex items-center justify-center shrink-0 mt-0.5">
                    <Globe2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-tight">Direct Lab Certification</h4>
                    <p className="text-[11px] text-gray-500">GIA, SSEF, or CGL certificates attached prior to shipment.</p>
                  </div>
                </div>
              </div>

              {/* Privacy Policy Box */}
              <div className="p-4 border border-[#C9A227]/30 bg-[#C9A227]/5 rounded-sm space-y-1">
                <p className="text-[10px] text-[#B45309] font-bold uppercase tracking-widest">Privacy Policy & Non-Disclosure</p>
                <p className="text-[10px] text-gray-600 italic leading-relaxed">
                  Your corporate specifications and client credentials are strictly used for B2B procurement communication and are never shared.
                </p>
              </div>
            </div>

            {/* Right Form Fields Column */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="clientName"
                required
                placeholder="Full Name *"
                value={formData.clientName}
                onChange={handleChange}
                className="col-span-1 p-2.5 text-xs border border-gray-200 outline-none focus:border-[#1E3A8A] bg-gray-50/80 rounded-sm"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Corporate Email Address *"
                value={formData.email}
                onChange={handleChange}
                className="col-span-1 p-2.5 text-xs border border-gray-200 outline-none focus:border-[#1E3A8A] bg-gray-50/80 rounded-sm"
              />

              <input
                type="text"
                name="phoneWhatsApp"
                required
                placeholder="WhatsApp Phone Number *"
                value={formData.phoneWhatsApp}
                onChange={handleChange}
                className="col-span-1 p-2.5 text-xs border border-gray-200 outline-none focus:border-[#1E3A8A] bg-gray-50/80 rounded-sm"
              />

              <input
                type="text"
                name="country"
                required
                placeholder="Country of Operation *"
                value={formData.country}
                onChange={handleChange}
                className="col-span-1 p-2.5 text-xs border border-gray-200 outline-none focus:border-[#1E3A8A] bg-gray-50/80 rounded-sm"
              />

              <select
                name="gemType"
                value={formData.gemType}
                onChange={handleChange}
                className="col-span-1 p-2.5 text-xs border border-gray-200 outline-none bg-gray-50/80 rounded-sm font-semibold text-[#1E3A8A]"
              >
                <option value="Ceylon Blue Sapphire">Ceylon Royal Blue Sapphire</option>
                <option value="Padparadscha Sapphire">Padparadscha Sunset Sapphire</option>
                <option value="Burmese Pigeon Blood Ruby">Burmese Pigeon Blood Ruby</option>
                <option value="Colombian Emerald">Colombian Muzo Emerald</option>
                <option value="18K Gold Fine Gold">18K Gold Fine Gold</option>
                <option value="Silver / Costume Bulk Lot">Silver / Costume Bulk Lot</option>
                <option value="Other / Custom">Other Custom Requirement</option>
              </select>

              <input
                type="text"
                name="budgetRange"
                required
                placeholder="Budget Range ($) *"
                value={formData.budgetRange}
                onChange={handleChange}
                className="col-span-1 p-2.5 text-xs border border-gray-200 outline-none focus:border-[#1E3A8A] bg-gray-50/80 rounded-sm"
              />

              {formData.gemType === 'Other / Custom' && (
                <input
                  type="text"
                  name="customGemType"
                  required
                  placeholder="Specify Custom Gem Type *"
                  value={formData.customGemType}
                  onChange={handleChange}
                  className="col-span-2 p-2.5 text-xs border border-gray-200 outline-none focus:border-[#1E3A8A] bg-gray-50/80 rounded-sm"
                />
              )}

              <input
                type="text"
                name="caratRange"
                placeholder="Carat Weight Range (e.g. 2.0 - 4.0 cts)"
                value={formData.caratRange}
                onChange={handleChange}
                className="col-span-1 p-2.5 text-xs border border-gray-200 outline-none focus:border-[#1E3A8A] bg-gray-50/80 rounded-sm"
              />

              <input
                type="text"
                name="quantity"
                placeholder="Quantity (e.g. 1 stone / parcel)"
                value={formData.quantity}
                onChange={handleChange}
                className="col-span-1 p-2.5 text-xs border border-gray-200 outline-none focus:border-[#1E3A8A] bg-gray-50/80 rounded-sm"
              />

              <textarea
                name="message"
                placeholder="Detailed Specifications (Cut shape, origin tolerances, certificate requirement, delivery timeline)..."
                value={formData.message}
                onChange={handleChange}
                className="col-span-2 p-2.5 text-xs border border-gray-200 outline-none focus:border-[#1E3A8A] bg-gray-50/80 rounded-sm h-20 resize-none"
              ></textarea>

              <button
                type="submit"
                className="col-span-2 btn-blue text-white py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors shadow-sm cursor-pointer"
              >
                Submit Procurement Request
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};
