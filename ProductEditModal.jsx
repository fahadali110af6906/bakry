import React, { useState, useEffect } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { CATEGORIES } from '../../data/mockData';
import {
  X,
  Cake,
  Save
} from 'lucide-react';

export const ProductEditModal = ({ isOpen, onClose, productToEdit }) => {
  const { addProduct, updateProduct } = useBakery();

  const isEditing = !!productToEdit;

  const [formData, setFormData] = useState({
    name: '',
    category: 'breads',
    price: 6.50,
    originalPrice: 7.50,
    stockQuantity: 20,
    inStock: true,
    isBestseller: false,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
    description: '',
    fullStory: '',
    ingredientsStr: 'French Flour, AOP Butter, Filtered Water, Sea Salt',
    allergensStr: 'Wheat, Dairy',
    dietaryBadgesStr: 'Vegetarian, AOP Butter',
    bakingSchedule: 'Baked Fresh Daily at 6:00 AM'
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || 'breads',
        price: productToEdit.price || 0,
        originalPrice: productToEdit.originalPrice || 0,
        stockQuantity: productToEdit.stockQuantity || 15,
        inStock: productToEdit.inStock ?? true,
        isBestseller: productToEdit.isBestseller || false,
        isNew: productToEdit.isNew || false,
        image: productToEdit.image || '',
        description: productToEdit.description || '',
        fullStory: productToEdit.fullStory || '',
        ingredientsStr: productToEdit.ingredients ? productToEdit.ingredients.join(', ') : '',
        allergensStr: productToEdit.allergens ? productToEdit.allergens.join(', ') : '',
        dietaryBadgesStr: productToEdit.dietaryBadges ? productToEdit.dietaryBadges.join(', ') : '',
        bakingSchedule: productToEdit.bakingSchedule || 'Baked fresh daily'
      });
    } else {
      setFormData({
        name: '',
        category: 'pastries',
        price: 6.50,
        originalPrice: 7.50,
        stockQuantity: 20,
        inStock: true,
        isBestseller: false,
        isNew: true,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
        description: 'Delicate butter-laminated pastry with organic French flour.',
        fullStory: 'Crafted with 84% churned French butter and folded through a 3-day lamination cycle.',
        ingredientsStr: 'T55 French Flour, AOP Butter, Sea Salt, Milk',
        allergensStr: 'Wheat, Dairy, Eggs',
        dietaryBadgesStr: 'Vegetarian',
        bakingSchedule: 'Baked Fresh Daily at 6:00 AM'
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const productPayload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      originalPrice: parseFloat(formData.originalPrice) || 0,
      stockQuantity: parseInt(formData.stockQuantity, 10) || 0,
      ingredients: formData.ingredientsStr.split(',').map((s) => s.trim()).filter(Boolean),
      allergens: formData.allergensStr.split(',').map((s) => s.trim()).filter(Boolean),
      dietaryBadges: formData.dietaryBadgesStr.split(',').map((s) => s.trim()).filter(Boolean),
      rating: productToEdit?.rating || 5.0,
      reviewsCount: productToEdit?.reviewsCount || 1,
    };

    if (isEditing) {
      updateProduct({ ...productPayload, id: productToEdit.id });
    } else {
      addProduct(productPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-300 relative my-6">
        
        <div className="p-6 border-b border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                {isEditing ? `Edit: ${productToEdit.name}` : 'Add New Bakery Product'}
              </h2>
              <p className="text-xs text-stone-500">
                Update prices, ingredients, baking schedule, and live stock
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
            aria-label="Close Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[78vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">Pastry / Bread Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Cardamom Rose Bun"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Selling Price ($)</label>
              <input
                type="number"
                step="0.25"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Original Price ($)</label>
              <input
                type="number"
                step="0.25"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Initial Daily Stock Qty</label>
              <input
                type="number"
                required
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">HD Image URL</label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">Short Description (Catalog view)</label>
              <textarea
                rows={2}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">Ingredients (comma separated)</label>
              <input
                type="text"
                value={formData.ingredientsStr}
                onChange={(e) => setFormData({ ...formData, ingredientsStr: e.target.value })}
                placeholder="Flour, Butter, Sugar, Yeast"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Allergens (comma separated)</label>
              <input
                type="text"
                value={formData.allergensStr}
                onChange={(e) => setFormData({ ...formData, allergensStr: e.target.value })}
                placeholder="Wheat, Dairy, Nuts"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Dietary Badges</label>
              <input
                type="text"
                value={formData.dietaryBadgesStr}
                onChange={(e) => setFormData({ ...formData, dietaryBadgesStr: e.target.value })}
                placeholder="100% Organic, Vegan"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 border-t border-stone-200">
            <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span>In Stock for Customers</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBestseller}
                onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span>Mark as Bestseller</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span>Mark as New Batch</span>
            </label>
          </div>

          <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-stone-900 hover:bg-bakery-800 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
