export type ItemCategory = 'Gems' | 'Gold & Silver' | 'Imitation';
export type GemTreatment = string;
export type MaterialType = 'Silver' | 'Gold' | 'Imitation';
export type ItemAvailability = 'In Stock' | 'Sold' | 'Reserved';

export interface CatalogItem {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;
  price: string;
  image: string;
  availability: ItemAvailability;
  
  // Gem specific fields
  caratWeight?: string;
  clarityColor?: string;
  treatment?: GemTreatment;
  
  // Gold & Silver / Imitation specific fields
  materialType?: MaterialType;
  weightGrams?: string;
  caratOfSetGem?: string;

  createdAt: string;
}

export type RequestStatus = 'New' | 'Contacted' | 'Quoted' | 'Confirmed' | 'Completed';

export interface CustomerRequest {
  id: string;
  clientName: string;
  email: string;
  phoneWhatsApp: string;
  country: string;
  companyName?: string;
  gemType: string;
  caratRange: string;
  colorClarityPref: string;
  budgetRange: string;
  quantity: string;
  deliveryCountry: string;
  message: string;
  referenceImageName?: string;
  status: RequestStatus;
  date: string;
}

export type GalleryTab = 'All' | 'Gems' | 'Gold & Silver' | 'Imitation';

export interface GalleryTheme {
  accent: string;      // e.g. '#4C1D6B'
  bgTint: string;      // e.g. '#FAF6FF'
  borderTint: string;  // e.g. 'rgba(76, 29, 107, 0.2)'
  badgeBg: string;     // e.g. 'bg-purple-100 text-purple-900'
  name: string;
}
