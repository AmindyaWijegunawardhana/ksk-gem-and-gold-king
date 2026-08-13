import React, { useState, useEffect } from 'react';
import { CatalogItem } from './types';
import { INITIAL_CATALOG } from './data/initialCatalog';
import { supabase } from './supabaseClient';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GemGallery } from './components/GemGallery';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';

export default function App() {
  // Shared Catalog State (drives both Public Gallery & Admin Management)
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);

  // Admin Modal Visibility
  const [adminOpen, setAdminOpen] = useState(false);

  // Fetch catalog from Supabase on mount
  useEffect(() => {
    async function fetchCatalog() {
      try {
        const { data, error } = await supabase
          .from('catalog')
          .select('*')
          .order('createdAt', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setCatalog(data as CatalogItem[]);
        } else {
          // If Supabase is empty, seed it with INITIAL_CATALOG so it's not empty initially
          const { error: insertError } = await supabase
            .from('catalog')
            .insert(INITIAL_CATALOG);

          if (insertError) {
            console.error('Failed to seed database:', insertError);
            setCatalog(INITIAL_CATALOG);
          } else {
            setCatalog(INITIAL_CATALOG);
          }
        }
      } catch (err) {
        console.error('Failed to fetch from Supabase:', err);
        // Fallback to local initial catalog if database is offline or not configured
        setCatalog(INITIAL_CATALOG);
      }
    }

    // Only fetch if Supabase URL is configured
    if (import.meta.env.VITE_SUPABASE_URL) {
      fetchCatalog();
    } else {
      setCatalog(INITIAL_CATALOG);
    }
  }, []);

  // Catalog CRUD Handlers
  const handleAddCatalogItem = async (newItem: CatalogItem) => {
    setCatalog((prev) => [newItem, ...prev]);

    if (import.meta.env.VITE_SUPABASE_URL) {
      const { error } = await supabase.from('catalog').insert(newItem);
      if (error) console.error('Failed to insert item in Supabase:', error);
    }
  };

  const handleUpdateCatalogItem = async (updatedItem: CatalogItem) => {
    setCatalog((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

    if (import.meta.env.VITE_SUPABASE_URL) {
      const { error } = await supabase
        .from('catalog')
        .update(updatedItem)
        .eq('id', updatedItem.id);
      if (error) console.error('Failed to update item in Supabase:', error);
    }
  };

  const handleDeleteCatalogItem = async (id: string) => {
    setCatalog((prev) => prev.filter((item) => item.id !== id));

    if (import.meta.env.VITE_SUPABASE_URL) {
      const { error } = await supabase.from('catalog').delete().eq('id', id);
      if (error) console.error('Failed to delete item from Supabase:', error);
    }
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
