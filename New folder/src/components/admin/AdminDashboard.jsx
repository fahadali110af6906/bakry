import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductEditModal } from './ProductEditModal';
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  TrendingUp,
  ChefHat,
  Flame,
  Printer,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Search,
  Store,
  CalendarCheck,
  Settings,
  BarChart3
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const AdminDashboard = () => {
  const {
    bakeryInfo,
    orders,
    products,
    inventory,
    reservations,
    setPersona,
    updateOrderStatus,
    deleteProduct,
    toggleProductStock,
    restockInventory,
    updateReservationStatus,
    setReceiptOrder,
    setActiveModal,
    salesChartData,
    categorySalesDistribution,
    resetToDemoDefaults
  } = useBakery();

  const [activeTab, setActiveTab] = useState('orders');
  const [orderFilter, setOrderFilter] = useState('all');
  const [searchOrderQuery, setSearchOrderQuery] = useState('');
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const avgOrderValue = orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : '0.00';
  const lowStockCount = inventory.filter(i => i.currentStock <= i.minThreshold).length;

  const filteredOrders = orders.filter(order => {
    const statusMatch = orderFilter === 'all' || order.status === orderFilter;
    const queryMatch = !searchOrderQuery || 
      order.id.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
      order.items?.some(it => it.name.toLowerCase().includes(searchOrderQuery.toLowerCase()));
    return statusMatch && queryMatch;
  });

  const handleOpenReceipt = (order) => {
    setReceiptOrder(order);
    setActiveModal('receipt');
  };

  const handleOpenAddProduct = () => {
    setProductToEdit(null);
    setEditModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setProductToEdit(prod);
    setEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-20">
      
      <div className="bg-stone-900 border-b border-stone-800 sticky top-0 z-30 px-4 sm:px-6 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-lg shadow-lg">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                  {bakeryInfo.name}
                </h1>
                <span className="bg-amber-950 text-amber-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-amber-800">
                  Business Owner Console
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Live Kitchen Operations, Stock & Executive Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPersona('customer')}
              className="bg-amber-600 hover:bg-amber-500 text-stone-950 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Store className="w-4 h-4" />
              <span>Switch to Customer Storefront</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-stone-900/90 border border-stone-800 p-4 sm:p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
              ${totalRevenue.toFixed(2)}
            </div>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% this week</span>
            </span>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 p-4 sm:p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active In Kitchen</span>
              <ChefHat className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">
              {activeOrdersCount}
            </div>
            <span className="text-[11px] text-stone-400">
              {orders.length} total orders recorded
            </span>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 p-4 sm:p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider">Average Order</span>
              <ShoppingBag className="w-4 h-4 text-sky-400" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
              ${avgOrderValue}
            </div>
            <span className="text-[11px] text-stone-400">
              High-value custom cakes included
            </span>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 p-4 sm:p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider">Supply Alerts</span>
              <AlertTriangle className={`w-4 h-4 ${lowStockCount > 0 ? 'text-rose-400 animate-pulse' : 'text-stone-500'}`} />
            </div>
            <div className={`font-serif text-2xl sm:text-3xl font-bold ${lowStockCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {lowStockCount} Items
            </div>
            <span className="text-[11px] text-stone-400">
              {lowStockCount > 0 ? 'Low ingredient stock warning' : 'All pantry supplies healthy'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-800 text-xs sm:text-sm font-semibold">
          {[
            { id: 'orders', label: 'Live Orders & Kitchen Queue', icon: ShoppingBag, count: activeOrdersCount },
            { id: 'products', label: 'Menu & Product Editor', icon: Package, count: products.length },
            { id: 'inventory', label: 'Ingredient Supply Tracker', icon: AlertTriangle, count: lowStockCount > 0 ? lowStockCount : null, countColor: 'bg-rose-900 text-rose-300' },
            { id: 'reservations', label: 'Tasting & Event Bookings', icon: CalendarCheck, count: reservations.length },
            { id: 'analytics', label: 'Sales & Revenue Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Bakery Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== null && tab.count !== undefined && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab.countColor || (isSelected ? 'bg-stone-950 text-amber-300' : 'bg-stone-800 text-stone-300')}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/80 p-3 rounded-2xl border border-stone-800">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Orders' },
                  { id: 'pending', label: 'New / Pending' },
                  { id: 'baking', label: 'In Oven 🔥' },
                  { id: 'decorating', label: 'Decorating 🎨' },
                  { id: 'ready', label: 'Ready for Pickup 📦' },
                  { id: 'delivered', label: 'Completed ✅' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderFilter(st.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      orderFilter === st.id
                        ? 'bg-stone-800 text-amber-300 border border-amber-500/50 shadow'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search order ID, customer..."
                  value={searchOrderQuery}
                  onChange={(e) => setSearchOrderQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800 p-8 space-y-2">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-stone-300">No orders found</h3>
                <p className="text-xs text-stone-500">No orders currently match the selected status filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const isCompleted = order.status === 'delivered' || order.status === 'completed';

                  return (
                    <div
                      key={order.id}
                      className="bg-stone-900/90 border border-stone-800 hover:border-stone-700 rounded-3xl p-5 sm:p-6 shadow-sm transition-all space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3.5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-amber-400 bg-amber-950/70 border border-amber-800/80 px-2.5 py-1 rounded-xl">
                            #{order.id}
                          </span>
                          <div>
                            <strong className="text-sm text-white block">{order.customerName}</strong>
                            <span className="text-[11px] text-stone-400">{order.orderType} • {order.deliverySlot}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full border ${
                            order.status === 'pending'
                              ? 'bg-amber-950 text-amber-300 border-amber-800 animate-pulse'
                              : order.status === 'baking'
                              ? 'bg-orange-950 text-orange-300 border-orange-800'
                              : order.status === 'decorating'
                              ? 'bg-purple-950 text-purple-300 border-purple-800'
                              : order.status === 'ready'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : 'bg-stone-800 text-stone-400 border-stone-700'
                          }`}>
                            {order.status}
                          </span>

                          <button
                            onClick={() => handleOpenReceipt(order)}
                            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                            title="Print Thermal Kitchen Ticket"
                          >
                            <Printer className="w-4 h-4 text-amber-400" />
                            <span className="hidden sm:inline">Ticket</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1.5">
                          <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Ordered Pastries & Cakes:</span>
                          <div className="space-y-1">
                            {order.items?.map((item, i) => (
                              <div key={i} className="flex justify-between text-stone-300 bg-stone-950/60 p-2 rounded-xl border border-stone-800/80">
                                <span>{item.quantity}× {item.name}</span>
                                <span className="font-mono text-amber-200 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 text-stone-300 bg-stone-950/40 p-3 rounded-2xl border border-stone-800/80 flex flex-col justify-between">
                          <div>
                            <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider block mb-1">Customer Notes / Destination:</span>
                            <p className="text-[11px] text-stone-300 italic">{order.specialNotes || 'No special notes.'}</p>
                            {order.deliveryAddress && (
                              <p className="text-[11px] text-stone-400 mt-1">📍 {order.deliveryAddress}</p>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-baseline pt-2 border-t border-stone-800/80">
                            <span className="text-stone-400">Total Billed ({order.paymentMethod}):</span>
                            <span className="font-serif text-base font-bold text-amber-300">${order.total?.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800">
                        <span className="text-xs text-stone-500">Order stage management:</span>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'baking')}
                              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                            >
                              <Flame className="w-3.5 h-3.5" />
                              <span>Send to Stone Oven 🔥</span>
                            </button>
                          )}

                          {order.status === 'baking' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'decorating')}
                              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                            >
                              <ChefHat className="w-3.5 h-3.5" />
                              <span>Start Decorating / Glazing 🎨</span>
                            </button>
                          )}

                          {order.status === 'decorating' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                            >
                              <Package className="w-3.5 h-3.5" />
                              <span>Mark Ready for Pickup / Dispatch 📦</span>
                            </button>
                          )}

                          {order.status === 'ready' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                            >
                              <span>Complete & Delivered ✅</span>
                            </button>
                          )}

                          {!isCompleted && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              className="px-3 py-2 bg-stone-800 hover:bg-rose-950 hover:text-rose-300 text-stone-400 rounded-xl text-xs font-semibold transition-colors"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Bakery Menu & Catalog</h3>
                <p className="text-xs text-stone-400">Add new creations, adjust prices, and toggle in-stock / sold-out status</p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Pastry / Cake</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-stone-800 shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded">
                        {prod.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-white truncate">{prod.name}</h4>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-base font-bold text-amber-300">${prod.price.toFixed(2)}</span>
                        <span className="text-xs text-stone-500">Stock: {prod.stockQuantity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => toggleProductStock(prod.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                        prod.inStock
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {prod.inStock ? '● In Stock' : '✕ Sold Out'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditProduct(prod)}
                        className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 bg-stone-800 hover:bg-rose-950 hover:text-rose-400 text-stone-400 rounded-lg"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Artisan Ingredient & Pantry Stock</h3>
                <p className="text-xs text-stone-400">Track organic flours, French butter, single-origin chocolate, and packaging</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inventory.map((item) => {
                const isLow = item.currentStock <= item.minThreshold;
                const stockPercent = Math.min(100, (item.currentStock / (item.minThreshold * 2.5)) * 100);

                return (
                  <div
                    key={item.id}
                    className="bg-stone-900 border border-stone-800 rounded-3xl p-5 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-500 block">{item.category}</span>
                        <h4 className="font-serif text-base font-bold text-white">{item.name}</h4>
                        <span className="text-xs text-stone-400">Supplier: {item.supplier}</span>
                      </div>

                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                        isLow
                          ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
                          : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      }`}>
                        {isLow ? 'Low Stock' : 'Healthy'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-400">Current Level:</span>
                        <strong className="text-amber-300">{item.currentStock} {item.unit}</strong>
                      </div>
                      <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLow ? 'bg-rose-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${stockPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-500">
                        <span>Min Threshold: {item.minThreshold} {item.unit}</span>
                        <span>Est Cost: ${item.costPerUnit}/{item.unit.split(' ')[0]}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex justify-end">
                      <button
                        onClick={() => restockInventory(item.id, 50)}
                        className="px-3.5 py-1.5 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Quick Restock (+50 {item.unit.split(' ')[0]})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Salon Tastings & Wedding Inquiries</h3>
                <p className="text-xs text-stone-400">Manage table bookings and custom corporate catering quotes</p>
              </div>
            </div>

            <div className="space-y-3">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="bg-stone-900 border border-stone-800 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-stone-950 px-2 py-0.5 rounded">
                        #{res.id}
                      </span>
                      <strong className="text-sm text-white font-bold">{res.name}</strong>
                      <span className="text-xs text-amber-300 font-semibold">({res.type})</span>
                    </div>
                    <p className="text-xs text-stone-400">
                      📅 {res.date} at {res.time} • 👥 {res.guests} Guests • 📞 {res.phone} ({res.email})
                    </p>
                    {res.specialRequests && (
                      <p className="text-xs text-stone-300 italic bg-stone-950/60 p-2 rounded-xl mt-1">
                        "{res.specialRequests}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      res.status === 'Confirmed'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {res.status}
                    </span>

                    {res.status !== 'Confirmed' && (
                      <button
                        onClick={() => updateReservationStatus(res.id, 'Confirmed')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs rounded-xl"
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">Daily Revenue Trend</h3>
                    <p className="text-xs text-stone-400">Weekly sales breakdown across bakery categories</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg">
                    $17,370 Weekly Total
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesChartData}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D97706" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" stroke="#78716c" fontSize={12} />
                      <YAxis stroke="#78716c" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: 12, color: '#fff' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#D97706" strokeWidth={3} fillOpacity={1} fill="url(#revenueGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4 bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-white">Revenue by Category</h3>
                  <p className="text-xs text-stone-400">Highest grossing bakery segments</p>
                </div>

                <div className="h-52 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categorySalesDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categorySalesDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1.5 text-xs text-stone-300">
                  {categorySalesDistribution.map((cat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.fill }} />
                        <span>{cat.name}</span>
                      </span>
                      <span className="font-bold">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-lg font-bold text-white">Bakery Operations Settings</h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-stone-400 font-bold block mb-1">Bakery Name</label>
                <input
                  type="text"
                  defaultValue={bakeryInfo.name}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-400 font-bold block mb-1">Standard Delivery Fee ($)</label>
                  <input
                    type="number"
                    defaultValue={bakeryInfo.deliveryFee}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200"
                  />
                </div>
                <div>
                  <label className="text-stone-400 font-bold block mb-1">Free Delivery Min Spend ($)</label>
                  <input
                    type="number"
                    defaultValue={bakeryInfo.freeDeliveryThreshold}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-400 font-bold block mb-1">Sales Tax Rate (%)</label>
                <input
                  type="text"
                  defaultValue="8.25%"
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200"
                />
              </div>

              <div className="pt-4 border-t border-stone-800">
                <button
                  onClick={resetToDemoDefaults}
                  className="w-full py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>Restore Clean Bakery Demo Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <ProductEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        productToEdit={productToEdit}
      />

    </div>
  );
};
