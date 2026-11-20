import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BAKERY_INFO,
  PRODUCTS as DEFAULT_PRODUCTS,
  INITIAL_ORDERS as DEFAULT_ORDERS,
  INITIAL_INVENTORY as DEFAULT_INVENTORY,
  INITIAL_REVIEWS as DEFAULT_REVIEWS,
  INITIAL_RESERVATIONS as DEFAULT_RESERVATIONS,
  PROMO_CODES,
  SALES_CHART_DATA,
  CATEGORY_SALES_DISTRIBUTION
} from '../data/mockData';

const BakeryContext = createContext();

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};

export const BakeryProvider = ({ children }) => {
  // 1. Role / Persona State: 'customer' or 'admin'
  const [persona, setPersona] = useState(() => {
    return localStorage.getItem('bakery_persona') || 'customer';
  });

  // 2. Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeOrderForTracking, setActiveOrderForTracking] = useState(null);
  const [receiptOrder, setReceiptOrder] = useState(null);

  // 3. Notifications & Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // 4. Products & Catalog State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('bakery_products');
    if (!saved) return DEFAULT_PRODUCTS;
    try {
      const parsed = JSON.parse(saved);
      // Synchronize latest verified images from default products
      return parsed.map((item) => {
        const defaultMatch = DEFAULT_PRODUCTS.find((dp) => dp.id === item.id);
        if (defaultMatch) {
          return { ...item, image: defaultMatch.image };
        }
        return item;
      });
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  });

  // 5. Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('bakery_orders');
    return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
  });

  // 6. Inventory State
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('bakery_inventory');
    return saved ? JSON.parse(saved) : DEFAULT_INVENTORY;
  });

  // 7. Reviews State
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('bakery_reviews');
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
  });

  // 8. Reservations & Catering Requests
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('bakery_reservations');
    return saved ? JSON.parse(saved) : DEFAULT_RESERVATIONS;
  });

  // 9. Shopping Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bakery_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [deliveryType, setDeliveryType] = useState('delivery');
  const [deliverySlot, setDeliverySlot] = useState('Today, 2:00 PM - 4:00 PM');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    const saved = localStorage.getItem('bakery_loyalty_pts');
    return saved ? parseInt(saved, 10) : 320;
  });

  useEffect(() => {
    localStorage.setItem('bakery_persona', persona);
  }, [persona]);

  useEffect(() => {
    localStorage.setItem('bakery_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bakery_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bakery_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('bakery_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('bakery_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bakery_loyalty_pts', loyaltyPoints.toString());
  }, [loyaltyPoints]);

  useEffect(() => {
    if (activeOrderForTracking) {
      const freshOrder = orders.find((o) => o.id === activeOrderForTracking.id);
      if (freshOrder) {
        setActiveOrderForTracking(freshOrder);
      }
    }
  }, [orders]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      discountAmount = (cartSubtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.discountAmount) {
      discountAmount = appliedPromo.discountAmount;
    }
  }

  const qualifiesFreeShipping = cartSubtotal >= BAKERY_INFO.freeDeliveryThreshold || (appliedPromo && appliedPromo.freeDelivery);
  const calculatedDeliveryFee = deliveryType === 'pickup' ? 0.00 : (qualifiesFreeShipping ? 0.00 : BAKERY_INFO.deliveryFee);
  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const calculatedTax = taxableAmount * BAKERY_INFO.taxRate;
  const cartTotal = taxableAmount + calculatedDeliveryFee + calculatedTax;

  const addToCart = (product, quantity = 1, customDetails = null) => {
    const uniqueCartId = customDetails 
      ? `custom-${Date.now()}` 
      : `${product.id}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.uniqueCartId === uniqueCartId);
      if (existing && !customDetails) {
        return prev.map((item) =>
          item.uniqueCartId === uniqueCartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            uniqueCartId,
            quantity,
            isCustomCake: !!customDetails,
            customDetails
          }
        ];
      }
    });

    showToast(`Added ${product.name} (${quantity}x) to your bag! 🥐`, 'success');
  };

  const removeFromCart = (uniqueCartId) => {
    setCart((prev) => prev.filter((item) => item.uniqueCartId !== uniqueCartId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (uniqueCartId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(uniqueCartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.uniqueCartId === uniqueCartId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (codeStr) => {
    const cleaned = codeStr.trim().toUpperCase();
    const promo = PROMO_CODES[cleaned];
    if (!promo) {
      showToast(`Invalid promo code "${cleaned}". Try WELCOME10 or GOLDEN15!`, 'error');
      return false;
    }
    if (cartSubtotal < promo.minSpend) {
      showToast(`Code ${cleaned} requires minimum order of $${promo.minSpend.toFixed(2)}`, 'error');
      return false;
    }
    setAppliedPromo({ code: cleaned, ...promo });
    showToast(`Promo code ${cleaned} applied successfully! 🎉`, 'success');
    return true;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  const placeOrder = (customerDetails) => {
    const orderNumber = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: orderNumber,
      customerName: customerDetails.name,
      customerEmail: customerDetails.email,
      customerPhone: customerDetails.phone,
      orderType: deliveryType === 'pickup' ? 'Store Pickup' : 'Delivery',
      deliveryAddress: deliveryType === 'pickup' ? 'Bakery Main Pickup Counter' : customerDetails.address,
      deliveryDate: customerDetails.deliveryDate || formattedDate,
      deliverySlot: deliverySlot,
      status: 'pending',
      orderTime: `${formattedDate} ${formattedTime}`,
      items: cart.map((c) => ({
        id: c.id,
        name: c.name,
        quantity: c.quantity,
        price: c.price,
        isCustomCake: c.isCustomCake,
        customDetails: c.customDetails,
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      tax: calculatedTax,
      deliveryFee: calculatedDeliveryFee,
      total: cartTotal,
      paymentMethod: customerDetails.paymentMethod || 'Credit Card',
      paymentStatus: customerDetails.paymentMethod === 'Cash on Delivery' ? 'Pending on Delivery' : 'Paid',
      specialNotes: customerDetails.notes || 'Handle with artisan care.',
      trackingTimeline: [
        { status: 'Order Placed & Confirmed', time: formattedTime, completed: true },
        { status: 'Dough Preparation & In Oven', time: 'In Queue', completed: false },
        { status: 'Glazing, Decorating & Finishing', time: 'Pending', completed: false },
        { status: 'Packaging & Quality Inspection', time: 'Pending', completed: false },
        { status: deliveryType === 'pickup' ? 'Ready for Pickup at Counter' : 'Out for Express Delivery', time: 'Pending', completed: false },
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    const earnedPoints = Math.floor(cartTotal);
    setLoyaltyPoints((prev) => prev + earnedPoints);

    clearCart();
    setActiveOrderForTracking(newOrder);
    setActiveModal('orderTracker');

    showToast(`Order #${orderNumber} placed! You earned +${earnedPoints} Loyalty Points ✨`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        let updatedTimeline = [...order.trackingTimeline];
        const statusMap = {
          'pending': 0,
          'baking': 1,
          'decorating': 2,
          'ready': 3,
          'delivered': 4,
          'completed': 4,
          'cancelled': -1
        };

        const targetIndex = statusMap[newStatus];
        if (targetIndex !== undefined && targetIndex >= 0) {
          updatedTimeline = updatedTimeline.map((step, idx) => ({
            ...step,
            completed: idx <= targetIndex,
            time: idx === targetIndex ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : step.time
          }));
        }

        return {
          ...order,
          status: newStatus,
          trackingTimeline: updatedTimeline
        };
      })
    );

    showToast(`Order ${orderId} status updated to ${newStatus.toUpperCase()}`, 'info');
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast(`Product "${updatedProduct.name}" updated successfully!`, 'success');
  };

  const addProduct = (newProduct) => {
    const id = `prod-${Date.now()}`;
    const productWithId = { ...newProduct, id };
    setProducts((prev) => [productWithId, ...prev]);
    showToast(`New product "${newProduct.name}" added to bakery menu!`, 'success');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog', 'info');
  };

  const toggleProductStock = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, inStock: !p.inStock } : p
      )
    );
    showToast('Product stock status updated', 'info');
  };

  const restockInventory = (itemId, addQty) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = item.currentStock + addQty;
          return {
            ...item,
            currentStock: newQty,
            lastRestocked: new Date().toISOString().split('T')[0],
            status: newQty > item.minThreshold ? 'healthy' : 'low'
          };
        }
        return item;
      })
    );
    showToast(`Restocked ingredient! Stock level updated.`, 'success');
  };

  const addReservation = (resData) => {
    const id = `RES-${Math.floor(500 + Math.random() * 500)}`;
    const newRes = { id, status: 'Pending Review', ...resData };
    setReservations((prev) => [newRes, ...prev]);
    showToast(`Reservation request #${id} received! We will confirm via email/SMS.`, 'success');
    return newRes;
  };

  const updateReservationStatus = (resId, newStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: newStatus } : r))
    );
    showToast(`Reservation #${resId} updated to ${newStatus}`, 'info');
  };

  const addReview = (reviewData) => {
    const id = `rev-${Date.now()}`;
    const newRev = {
      id,
      date: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      featured: false,
      ...reviewData
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you for your delicious review! ⭐', 'success');
  };

  const resetToDemoDefaults = () => {
    localStorage.clear();
    setProducts(DEFAULT_PRODUCTS);
    setOrders(DEFAULT_ORDERS);
    setInventory(DEFAULT_INVENTORY);
    setReviews(DEFAULT_REVIEWS);
    setReservations(DEFAULT_RESERVATIONS);
    setCart([]);
    setAppliedPromo(null);
    setLoyaltyPoints(320);
    showToast('Reset all data to fresh luxury demo defaults!', 'info');
  };

  return (
    <BakeryContext.Provider
      value={{
        bakeryInfo: BAKERY_INFO,
        persona,
        setPersona,
        products,
        orders,
        inventory,
        reviews,
        reservations,
        cart,
        cartOpen,
        setCartOpen,
        activeModal,
        setActiveModal,
        selectedProduct,
        setSelectedProduct,
        activeOrderForTracking,
        setActiveOrderForTracking,
        receiptOrder,
        setReceiptOrder,
        toasts,
        showToast,
        deliveryType,
        setDeliveryType,
        deliverySlot,
        setDeliverySlot,
        appliedPromo,
        loyaltyPoints,
        cartSubtotal,
        cartItemCount,
        discountAmount,
        calculatedDeliveryFee,
        calculatedTax,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
        placeOrder,
        updateOrderStatus,
        updateProduct,
        addProduct,
        deleteProduct,
        toggleProductStock,
        restockInventory,
        addReservation,
        updateReservationStatus,
        addReview,
        resetToDemoDefaults,
        salesChartData: SALES_CHART_DATA,
        categorySalesDistribution: CATEGORY_SALES_DISTRIBUTION
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
};
