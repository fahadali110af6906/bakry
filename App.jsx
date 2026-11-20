import React, { useState } from 'react';
import { BakeryProvider, useBakery } from './context/BakeryContext';
import { AndroidFrameWrapper } from './components/layout/AndroidFrameWrapper';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/customer/HeroSection';
import { ProductCatalog } from './components/customer/ProductCatalog';
import { ProductDetailModal } from './components/customer/ProductDetailModal';
import { CustomCakeBuilder } from './components/customer/CustomCakeBuilder';
import { CartDrawer } from './components/customer/CartDrawer';
import { CheckoutModal } from './components/customer/CheckoutModal';
import { OrderTrackerModal } from './components/customer/OrderTrackerModal';
import { ReservationModal } from './components/customer/ReservationModal';
import { LoyaltyModal } from './components/customer/LoyaltyModal';
import { ReviewsSection } from './components/customer/ReviewsSection';
import { Footer } from './components/layout/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { KitchenReceiptModal } from './components/admin/KitchenReceiptModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainAppContent = () => {
  const { persona } = useBakery();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AndroidFrameWrapper>
      {persona === 'customer' ? (
        <div className="flex flex-col min-h-full">
          <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <main className="flex-1">
            <HeroSection />
            <ProductCatalog searchQuery={searchQuery} />
            <ReviewsSection />
          </main>
          <Footer />
        </div>
      ) : (
        <AdminDashboard />
      )}

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CustomCakeBuilder />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <ReservationModal />
      <LoyaltyModal />
      <KitchenReceiptModal />
      <ToastContainer />
    </AndroidFrameWrapper>
  );
};

export function App() {
  return (
    <BakeryProvider>
      <MainAppContent />
    </BakeryProvider>
  );
}

export default App;
