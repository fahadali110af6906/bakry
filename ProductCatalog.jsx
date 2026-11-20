import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { CATEGORIES } from '../../data/mockData';
import {
  ShoppingBag,
  Star,
  Eye,
  Sparkles,
  Wheat,
  Cake,
  Croissant,
  Cookie,
  UtensilsCrossed,
  Leaf,
  Coffee,
  AlertCircle
} from 'lucide-react';

const CATEGORY_ICONS = {
  Sparkles,
  Wheat,
  Cake,
  Croissant,
  Cookie,
  UtensilsCrossed,
  Leaf,
  Coffee
};

export const ProductCatalog = ({ searchQuery }) => {
  const {
    products,
    addToCart,
    setSelectedProduct,
    setActiveModal
  } = useBakery();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const dietaryOptions = [
    { id: 'all', label: 'All Diets' },
    { id: 'Organic', label: '🌱 100% Organic' },
    { id: 'Vegan', label: '🌿 Vegan' },
    { id: 'Gluten-Free', label: '🌾 Gluten-Free' },
    { id: 'Vegetarian', label: '🧀 Vegetarian' },
  ];

  const filteredProducts = products.filter((item) => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const searchMatch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    const dietaryMatch = dietaryFilter === 'all' || 
      item.dietaryBadges?.some(badge => badge.toLowerCase().includes(dietaryFilter.toLowerCase()));

    return categoryMatch && searchMatch && dietaryMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'popular') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setActiveModal('productDetail');
  };

  return (
    <section id="menu" className="py-16 bg-[#FAF7F2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-bakery-600 bg-amber-100/70 px-3 py-1 rounded-full inline-block">
          Fresh from the Hearth
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
          The Artisanal Collection
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          Browse our morning bakes, heritage sourdoughs, layered French viennoiserie, and signature celebration cakes.
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat) => {
          const IconComponent = CATEGORY_ICONS[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-stone-900 text-amber-300 shadow-luxury'
                  : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-200/80'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-stone-200/70">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-stone-500 mr-1">Dietary:</span>
          {dietaryOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setDietaryFilter(opt.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                dietaryFilter === opt.id
                  ? 'bg-amber-600 text-white font-semibold shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs font-medium text-stone-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products by"
            className="text-xs font-semibold bg-white border border-stone-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800"
          >
            <option value="popular">Bestsellers & Featured</option>
            <option value="rating">Highest Rated (★ 5.0)</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl">
            🥖
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">No bakery items found</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            We couldn't find any pastries matching your current filter criteria. Try resetting your search or dietary filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setDietaryFilter('all');
            }}
            className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const isOutOfStock = !product.inStock || product.stockQuantity === 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 cursor-pointer" onClick={() => handleOpenDetail(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80";
                    }}
                  />

                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {product.isBestseller && (
                      <span className="bg-amber-500 text-stone-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Bestseller</span>
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                        New Batch
                      </span>
                    )}
                  </div>

                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4 text-center">
                      <AlertCircle className="w-6 h-6 text-amber-400 mb-1" />
                      <span className="font-bold text-sm">Sold Out Today</span>
                      <span className="text-[11px] text-stone-300">Fresh batch tomorrow at 5:00 AM</span>
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(product);
                    }}
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-stone-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    title="Quick Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
                      </div>
                      
                      {product.dietaryBadges?.[0] && (
                        <span className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                          {product.dietaryBadges[0]}
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => handleOpenDetail(product)}
                      className="font-serif text-lg font-bold text-stone-900 hover:text-bakery-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-stone-400 text-[10px] block uppercase font-bold">Fresh Daily</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-lg font-bold text-stone-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs text-stone-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      disabled={isOutOfStock}
                      onClick={() => addToCart(product, 1)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                        isOutOfStock
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                          : 'bg-stone-900 hover:bg-bakery-700 text-white hover:shadow-md'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
