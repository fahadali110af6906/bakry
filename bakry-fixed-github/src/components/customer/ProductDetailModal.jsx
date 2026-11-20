import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  X,
  Star,
  ShoppingBag,
  Clock,
  AlertTriangle,
  Sparkles,
  Coffee
} from 'lucide-react';

export const ProductDetailModal = () => {
  const {
    activeModal,
    setActiveModal,
    selectedProduct,
    addToCart
  } = useBakery();

  const [quantity, setQuantity] = useState(1);

  if (activeModal !== 'productDetail' || !selectedProduct) return null;

  const isOutOfStock = !selectedProduct.inStock || selectedProduct.stockQuantity === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(selectedProduct, quantity);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-8">
        
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-md transition-all"
          aria-label="Close Product Details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="relative aspect-square md:aspect-auto md:h-full bg-stone-100 overflow-hidden">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent md:hidden" />
            
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {selectedProduct.isBestseller && (
                <span className="bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Artisan Bestseller</span>
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-stone-900/85 backdrop-blur-md text-amber-100 p-3 rounded-2xl border border-stone-700/60 text-xs flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{selectedProduct.bakingSchedule || 'Baked fresh daily at dawn.'}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[80vh] overflow-y-auto">
            
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-bakery-600 bg-amber-100/70 px-2.5 py-1 rounded-lg">
                  {selectedProduct.category}
                </span>

                <div className="flex items-center gap-1 text-amber-600 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-stone-400 font-normal">({selectedProduct.reviewsCount} customer reviews)</span>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-serif text-2xl font-bold text-stone-900">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-sm text-stone-400 line-through">
                      ${selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs text-stone-500 ml-1">
                    {isOutOfStock ? '• Sold Out' : `• In Stock (${selectedProduct.stockQuantity} available)`}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-stone-600 text-sm leading-relaxed">
                <p className="font-medium text-stone-800">{selectedProduct.description}</p>
                {selectedProduct.fullStory && (
                  <p className="text-xs text-stone-500 italic bg-amber-50/50 p-3 rounded-xl border border-amber-200/50">
                    "{selectedProduct.fullStory}"
                  </p>
                )}
              </div>

              {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                    Artisanal Ingredients
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.ingredients.map((ing, i) => (
                      <span key={i} className="text-xs bg-white border border-stone-200 px-2.5 py-1 rounded-lg text-stone-700 font-medium">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.allergens && selectedProduct.allergens.length > 0 && (
                <div className="bg-rose-50 border border-rose-200/60 p-3 rounded-xl text-xs flex items-start gap-2 text-rose-900">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Allergen Notice: </strong>
                    <span>Contains {selectedProduct.allergens.join(', ')}. Handled in a facility that uses nuts and gluten.</span>
                  </div>
                </div>
              )}

              {selectedProduct.pairingSuggestions && (
                <div className="bg-amber-50/60 border border-amber-200/60 p-3 rounded-xl text-xs flex items-center gap-2 text-amber-950">
                  <Coffee className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <strong>Chef's Pairing: </strong>
                    <span>{selectedProduct.pairingSuggestions}</span>
                  </div>
                </div>
              )}

              {selectedProduct.nutrition && (
                <div className="border-t border-stone-200 pt-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                    Nutrition Breakdown
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-white p-2 rounded-xl border border-stone-200">
                      <span className="text-stone-400 block text-[10px]">Calories</span>
                      <strong className="text-stone-800">{selectedProduct.nutrition.calories}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-stone-200">
                      <span className="text-stone-400 block text-[10px]">Carbs</span>
                      <strong className="text-stone-800">{selectedProduct.nutrition.carbs}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-stone-200">
                      <span className="text-stone-400 block text-[10px]">Fats</span>
                      <strong className="text-stone-800">{selectedProduct.nutrition.fat}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-stone-200">
                      <span className="text-stone-400 block text-[10px]">Protein</span>
                      <strong className="text-stone-800">{selectedProduct.nutrition.protein}</strong>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded-2xl bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-sm text-stone-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  +
                </button>
              </div>

              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all shadow-md ${
                  isOutOfStock
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-stone-900 hover:bg-bakery-700 text-white hover:shadow-luxury'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>{isOutOfStock ? 'Sold Out Today' : `Add to Bag • $${(selectedProduct.price * quantity).toFixed(2)}`}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
