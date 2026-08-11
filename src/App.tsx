import React, { useState } from 'react';
import { CatalogItem } from './types';
import { INITIAL_CATALOG } from './data/initialCatalog';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GemGallery } from './components/GemGallery';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';

export default function App() {
  // Shared Catalog State (drives both Public Gallery & Admin Management)
  const [catalog, setCatalog] = useState<CatalogItem[]>(INITIAL_CATALOG);

  // Admin Modal Visibility
  const [adminOpen, setAdminOpen] = useState(false);

  // Catalog CRUD Handlers
  const handleAddCatalogItem = (newItem: CatalogItem) => {
    setCatalog((prev) => [newItem, ...prev]);
  };

  const handleUpdateCatalogItem = (updatedItem: CatalogItem) => {
    setCatalog((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteCatalogItem = (id: string) => {
    setCatalog((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-slate-900">
      {/* 1. Header Navigation */}
      <Navbar onOpenAdmin={() => setAdminOpen(true)} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Gem Gallery (with Theme-Shifting Tabs) */}
        <GemGallery catalog={catalog} />
      </main>

      {/* 6. Footer */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* 7. Admin Panel (Demo Dashboard Modal) */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        catalog={catalog}
        onAddCatalogItem={handleAddCatalogItem}
        onUpdateCatalogItem={handleUpdateCatalogItem}
        onDeleteCatalogItem={handleDeleteCatalogItem}
      />
    </div>
  );
}
