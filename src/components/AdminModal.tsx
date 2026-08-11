import React, { useState } from 'react';
import { CatalogItem, ItemCategory, GemTreatment, MaterialType, ItemAvailability } from '../types';
import { X, Lock, LogOut, Plus, Edit2, Trash2, Eye, ShieldCheck, CheckCircle2, Search, Filter, AlertCircle, FileText, Upload } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  catalog: CatalogItem[];
  onAddCatalogItem: (item: CatalogItem) => void;
  onUpdateCatalogItem: (item: CatalogItem) => void;
  onDeleteCatalogItem: (id: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  catalog,
  onAddCatalogItem,
  onUpdateCatalogItem,
  onDeleteCatalogItem,
}) => {
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');

  // Catalog Item Form Modal (Add / Edit)
  const [catalogFormOpen, setCatalogFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  // View Item Modal
  const [viewingItem, setViewingItem] = useState<CatalogItem | null>(null);

  // Delete Confirmation State
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  // Form State for Add/Edit
  const [formData, setFormData] = useState<{
    name: string;
    category: ItemCategory;
    description: string;
    price: string;
    image: string;
    availability: ItemAvailability;
    caratWeight: string;
    clarityColor: string;
    treatment: GemTreatment;
    materialType: MaterialType;
    weightGrams: string;
    caratOfSetGem: string;
  }>({
    name: '',
    category: 'Gems',
    description: '',
    price: '$2,500',
    image: '',
    availability: 'In Stock',
    caratWeight: '',
    clarityColor: '',
    treatment: 'Unheated',
    materialType: 'Gold',
    weightGrams: '',
    caratOfSetGem: ''
  });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  // Open Form for Add
  const handleOpenAddForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'Gems',
      description: '',
      price: '$3,500',
      image: '',
      availability: 'In Stock',
      caratWeight: '',
      clarityColor: '',
      treatment: 'Unheated',
      materialType: 'Gold',
      weightGrams: '',
      caratOfSetGem: ''
    });
    setCatalogFormOpen(true);
  };

  // Open Form for Edit
  const handleOpenEditForm = (item: CatalogItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      image: item.image,
      availability: item.availability,
      caratWeight: item.caratWeight || '',
      clarityColor: item.clarityColor || '',
      treatment: item.treatment || 'Unheated',
      materialType: item.materialType || 'Gold',
      weightGrams: item.weightGrams || '',
      caratOfSetGem: item.caratOfSetGem || ''
    });
    setCatalogFormOpen(true);
  };

  // Submit Catalog Form
  const handleSaveCatalogItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload a product image from your computer first.");
      return;
    }

    if (editingItem) {
      const updated: CatalogItem = {
        ...editingItem,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        image: formData.image,
        availability: formData.availability,
        ...(formData.category === 'Gems'
          ? {
            caratWeight: formData.caratWeight,
            clarityColor: formData.clarityColor,
            treatment: formData.treatment
          }
          : {
            materialType: formData.materialType,
            weightGrams: formData.weightGrams,
            caratOfSetGem: formData.caratOfSetGem
          })
      };
      onUpdateCatalogItem(updated);
    } else {
      const newItem: CatalogItem = {
        id: `item-${Date.now()}`,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        image: formData.image,
        availability: formData.availability,
        createdAt: new Date().toISOString().split('T')[0],
        ...(formData.category === 'Gems'
          ? {
            caratWeight: formData.caratWeight,
            clarityColor: formData.clarityColor,
            treatment: formData.treatment
          }
          : {
            materialType: formData.materialType,
            weightGrams: formData.weightGrams,
            caratOfSetGem: formData.caratOfSetGem
          })
      };
      onAddCatalogItem(newItem);
    }

    setCatalogFormOpen(false);
  };

  const handleConfirmDelete = (id: string) => {
    onDeleteCatalogItem(id);
    setDeletingItemId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-2xl w-full max-w-6xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">

        {/* Admin Header */}
        <div className="bg-[#1E3A8A] text-white px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#991B1B] flex items-center justify-center text-white font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base leading-tight uppercase tracking-wider">KSK Gem and Gold King Admin Portal</h3>
              <p className="text-[10px] text-gray-300">Live Inventory & Customer Inquiry Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs bg-blue-900/80 hover:bg-blue-900 text-white px-3 py-1.5 rounded-sm flex items-center gap-1 transition-colors border border-blue-700 font-bold uppercase tracking-wider text-[10px]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">

          {!isAuthenticated ? (
            /* Login Screen */
            <div className="max-w-md mx-auto py-12 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-[#0B2545] text-amber-400 rounded-xl flex items-center justify-center mx-auto shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0B2545]">Admin Authentication</h3>
                <p className="text-xs text-slate-500">
                  Demo Mode: Click Log In directly with pre-filled credentials (<span className="font-semibold text-slate-700">admin / admin123</span>).
                </p>
              </div>

              <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2.5 rounded-lg text-sm shadow-md transition-colors"
                >
                  Authenticate & Access Dashboard
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6">

              {/* Top Action Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#0B2545]">Live Public Gallery Inventory</h4>
                  <p className="text-xs text-slate-500">Any changes made here immediately update the main public Gem Gallery in real time.</p>
                </div>

                <button
                  onClick={handleOpenAddForm}
                  className="bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2.5 rounded-lg text-xs flex items-center gap-2 shadow-md border border-red-600/50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Catalog Item</span>
                </button>
              </div>

              {/* Catalog Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catalog.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative h-44 rounded-lg overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 bg-[#0B2545]/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                          {item.category}
                        </div>
                        {item.category === 'Gems' && item.treatment && (
                          <div className="absolute top-2 right-2 bg-blue-900/90 text-blue-100 text-[10px] font-bold px-2 py-0.5 rounded">
                            {item.treatment}
                          </div>
                        )}
                      </div>

                      <div>
                        <h5 className="font-serif font-bold text-base text-[#0B2545] line-clamp-1">{item.name}</h5>
                        <div className="text-sm font-extrabold text-red-700 mt-0.5">{item.price}</div>
                      </div>
                    </div>

                    {/* Card Action Buttons: View / Edit / Delete */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setViewingItem(item)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 border border-slate-200"
                      >
                        <Eye className="w-3 h-3 text-slate-600" />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditForm(item)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-900 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 border border-blue-200"
                      >
                        <Edit2 className="w-3 h-3 text-blue-700" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeletingItemId(item.id)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-800 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 border border-rose-200"
                      >
                        <Trash2 className="w-3 h-3 text-rose-600" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ADD / EDIT CATALOG ITEM FORM MODAL */}
      {catalogFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[88vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-[#0B2545]">
                {editingItem ? 'Edit Catalog Item' : 'Add New Item to Inventory'}
              </h3>
              <button onClick={() => setCatalogFormOpen(false)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCatalogItem} className="space-y-4 text-xs">

              {/* Category Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Item Category <span className="text-red-600">*</span></label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ItemCategory })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-bold text-slate-800"
                >
                  <option value="Gems">Gems</option>
                  <option value="Gold & Silver">Gold & Silver</option>
                  <option value="Imitation">Imitation</option>
                </select>
              </div>

              {/* Common Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Item / Gem Name <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price / Price Range <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold text-red-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Availability Status</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value as ItemAvailability })}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Sold">Sold</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Image</label>
                  <div className="flex items-center gap-3">
                    {formData.image ? (
                      <div className="relative w-11 h-11 rounded-lg border border-slate-300 overflow-hidden bg-slate-100 flex-shrink-0 group">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-[9px] text-slate-400 font-bold flex-shrink-0 text-center leading-tight">
                        No Image
                      </div>
                    )}
                    
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold shadow-sm transition-colors flex-1 flex items-center justify-center gap-1.5 h-11">
                      <Upload className="w-3.5 h-3.5 text-slate-600" />
                      <span>Browse Computer</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setFormData({ ...formData, image: event.target.result as string });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Dynamic Fields for Gems */}
              {formData.category === 'Gems' && (
                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 space-y-3">
                  <h5 className="font-bold text-blue-900 uppercase tracking-wider text-[11px]">Gem Specific Attributes</h5>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Carat Weight</label>
                      <input
                        type="text"
                        placeholder="e.g. 3.25 cts"
                        value={formData.caratWeight}
                        onChange={(e) => setFormData({ ...formData, caratWeight: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Clarity & Color (e.g. VVS, Royal Blue)"
                        value={formData.clarityColor}
                        onChange={(e) => setFormData({ ...formData, clarityColor: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Treatment (e.g. Unheated, Natural)"
                        value={formData.treatment}
                        onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Fields for Gold & Silver / Imitation */}
              {(formData.category === 'Gold & Silver' || formData.category === 'Imitation') && (
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 space-y-3">
                  <h5 className="font-bold text-amber-900 uppercase tracking-wider text-[11px]">Metal & Setting Attributes</h5>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Material Type</label>
                      <select
                        value={formData.materialType}
                        onChange={(e) => setFormData({ ...formData, materialType: e.target.value as MaterialType })}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                      >
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Imitation">Imitation / Alloy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Weight (grams)</label>
                      <input
                        type="text"
                        placeholder="e.g. 14.5 g"
                        value={formData.weightGrams}
                        onChange={(e) => setFormData({ ...formData, weightGrams: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Carat of Set Gem</label>
                      <input
                        type="text"
                        placeholder="e.g. 2.0 cts Sapphire"
                        value={formData.caratOfSetGem}
                        onChange={(e) => setFormData({ ...formData, caratOfSetGem: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Item Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setCatalogFormOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg shadow-md"
                >
                  Save Item & Update Live Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW ITEM MODAL */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-serif font-bold text-lg text-[#0B2545]">{viewingItem.name}</h3>
              <button onClick={() => setViewingItem(null)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-56 rounded-lg overflow-hidden bg-slate-100">
              <img src={viewingItem.image} alt={viewingItem.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-500">{viewingItem.category}</span>
                <span className="font-bold text-red-700 text-sm">{viewingItem.price}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{viewingItem.description}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setViewingItem(null)} className="bg-[#0B2545] text-white px-4 py-2 rounded-lg text-xs font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingItemId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Are you sure?</h3>
            <p className="text-xs text-slate-600">
              This action will permanently delete this item from both the Admin dashboard and the public Gem Gallery.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeletingItemId(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(deletingItemId)}
                className="flex-1 bg-rose-700 hover:bg-rose-800 text-white py-2 rounded-lg text-xs font-semibold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
