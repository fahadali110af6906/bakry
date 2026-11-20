import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  Star,
  Quote,
  CheckCircle2,
  Send,
  MessageSquareHeart
} from 'lucide-react';

export const ReviewsSection = () => {
  const { reviews, addReview } = useBakery();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    role: 'Verified Customer',
    rating: 5,
    productName: 'Heritage Wild Sourdough Boule',
    content: ''
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.content) return;
    addReview(newReview);
    setNewReview({
      author: '',
      role: 'Verified Customer',
      rating: 5,
      productName: 'Heritage Wild Sourdough Boule',
      content: ''
    });
    setShowReviewForm(false);
  };

  return (
    <section id="reviews" className="py-16 bg-[#F5EFE6]/60 border-t border-amber-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-bakery-600 bg-amber-100 px-3 py-1 rounded-full inline-block mb-2">
              Patron Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Devotion in Every Review
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Read impressions from Michelin chefs, food critics, and our loyal morning regulars.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="self-start md:self-auto flex items-center gap-2 bg-stone-900 hover:bg-bakery-800 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition-all"
          >
            <MessageSquareHeart className="w-4 h-4 text-amber-400" />
            <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
          </button>
        </div>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-luxury mb-10 max-w-2xl mx-auto space-y-4 animate-fadeIn">
            <h3 className="font-serif text-lg font-bold text-stone-900">Share Your Experience</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Claire Montgomery"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">Pastry or Bread Reviewed</label>
                <input
                  type="text"
                  required
                  placeholder="Pure Butter Croissant"
                  value={newReview.productName}
                  onChange={(e) => setNewReview({ ...newReview, productName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">Your Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReview.rating
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">Review Comments</label>
              <textarea
                rows={3}
                required
                placeholder="The crumb was light and airy, perfect lamination..."
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Publish Review</span>
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-luxury transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-amber-200" />
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-amber-200 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 truncate flex items-center gap-1">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  </h4>
                  <span className="text-[10px] text-stone-500 block truncate">
                    {rev.role} • {rev.productName}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
