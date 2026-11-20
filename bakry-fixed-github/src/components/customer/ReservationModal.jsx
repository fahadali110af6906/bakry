import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  X,
  CalendarCheck,
  Send,
  CheckCircle2
} from 'lucide-react';

export const ReservationModal = () => {
  const {
    activeModal,
    setActiveModal,
    addReservation
  } = useBakery();

  const [bookingType, setBookingType] = useState('Salon High-Tea');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: '2026-08-30',
    time: '03:30 PM',
    specialRequests: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedId, setConfirmedId] = useState('');

  if (activeModal !== 'reservation') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = addReservation({
      ...formData,
      type: bookingType,
    });
    setConfirmedId(res.id);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-6">
        
        <div className="p-6 border-b border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Salon Tasting & Event Catering
              </h2>
              <p className="text-xs text-stone-500">
                Reserve our private salon or request artisanal event catering
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
            aria-label="Close Reservation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Reservation #{confirmedId} Confirmed!
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Merci, <strong>{formData.name}</strong>. We have reserved your <strong>{bookingType}</strong> for <strong>{formData.guests} guests</strong> on <strong>{formData.date} at {formData.time}</strong>.
            </p>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
              Our Head Sommelier & Pastry Chef look forward to welcoming you to the Patisserie Salon.
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800"
            >
              Done & Return to Menu
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            
            <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setBookingType('Salon High-Tea')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  bookingType === 'Salon High-Tea'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                ☕ Salon High-Tea Table
              </button>
              <button
                type="button"
                onClick={() => setBookingType('Wedding & Event Catering')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  bookingType === 'Wedding & Event Catering'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                🎂 Wedding / Event Catering
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Charlotte Evans"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="charlotte@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) || 1 })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Preferred Time</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800"
                >
                  <option value="09:00 AM">09:00 AM (Morning Breakfast)</option>
                  <option value="11:30 AM">11:30 AM (Brunch & Pastry)</option>
                  <option value="02:30 PM">02:30 PM (Salon Afternoon Tea)</option>
                  <option value="04:30 PM">04:30 PM (Patisserie Tasting)</option>
                  <option value="06:30 PM">06:30 PM (Evening Desserts)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Allergies & Special Requests</label>
              <textarea
                rows={3}
                placeholder="Nut allergies, gluten sensitivities, celebration notes, champagne pairings..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-bakery-800 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm shadow-luxury transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Submit Reservation Request</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
