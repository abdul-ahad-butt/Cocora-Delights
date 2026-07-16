<template>
  <div class="min-h-screen bg-brand-cocoa-dark font-sans text-brand-cream flex flex-col">
    <!-- Header -->
    <header class="bg-brand-bg/10 backdrop-blur-md border-b border-brand-gold/10 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 border border-brand-gold/30 rotate-45 flex items-center justify-center bg-brand-cocoa-dark shadow-lg">
            <span class="font-serif text-lg text-brand-gold -rotate-45 block leading-none">C</span>
          </div>
          <div>
            <h1 class="font-serif text-lg font-bold text-brand-cream leading-tight">Concierge Dashboard</h1>
            <p class="text-[9px] tracking-widest text-brand-gold uppercase">Luxury Order Management</p>
          </div>
        </div>
        
        <button @click="logout" class="text-xs font-semibold text-brand-cream/70 hover:text-brand-gold uppercase tracking-widest transition-colors duration-300">
          Sign Out
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="grow max-w-7xl mx-auto px-6 py-12 w-full space-y-8">
      
      <div class="flex justify-between items-end border-b border-brand-gold/10 pb-4">
        <div>
          <h2 class="font-serif text-2xl text-brand-cream">Incoming Submissions</h2>
          <p class="text-xs text-brand-cream/50 mt-1">Review custom box configurations and signature orders.</p>
        </div>
        <button @click="fetchOrders" class="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:bg-brand-gold/10 transition-colors duration-300" title="Refresh Orders">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" :class="{'animate-spin': loading}">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="py-20 flex justify-center">
        <div class="w-8 h-8 border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="orders.length === 0" class="py-20 text-center border border-brand-gold/10 rounded-2xl bg-brand-bg/5">
        <p class="text-brand-cream/50 font-serif">No orders have been submitted yet.</p>
      </div>

      <!-- Data Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="order in orders" 
          :key="order.id"
          @click="openOrderDetails(order)"
          class="bg-brand-bg/5 border border-brand-gold/15 hover:border-brand-gold/40 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group flex flex-col h-full"
        >
          <div class="flex justify-between items-start mb-4 border-b border-brand-gold/5 pb-4">
            <div>
              <span class="text-[10px] text-brand-gold font-bold uppercase tracking-widest">{{ order.id }}</span>
              <h3 class="font-serif text-lg font-bold mt-1 text-brand-cream">{{ order.customerName }}</h3>
            </div>
            <span class="text-xs font-bold text-brand-cream bg-brand-bg/40 px-2 py-1 rounded">{{ formatPrice(order.totalPrice) }}</span>
          </div>

          <div class="space-y-2 grow">
            <p class="text-xs text-brand-cream/70 flex justify-between">
              <span>Type:</span>
              <span class="font-medium text-brand-cream capitalize">{{ order.orderType.replace('_', ' ') }}</span>
            </p>
            <p class="text-xs text-brand-cream/70 flex justify-between">
              <span>Date:</span>
              <span class="font-medium text-brand-cream">{{ new Date(order.createdAt).toLocaleDateString() }}</span>
            </p>
            <p class="text-xs text-brand-cream/70 flex justify-between">
              <span>City:</span>
              <span class="font-medium text-brand-cream line-clamp-1 text-right">{{ order.shippingCity }}, {{ order.shippingCountry }}</span>
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-brand-gold/5 flex items-center justify-between">
            <span class="text-[9px] uppercase tracking-wider text-brand-cream/40 group-hover:text-brand-gold transition-colors duration-300 flex items-center space-x-1">
              <span>View Full Details</span>
              <span>→</span>
            </span>
            <span 
              class="w-2 h-2 rounded-full" 
              :class="order.orderStatus === 'pending' ? 'bg-brand-caramel' : 'bg-brand-success'"
            ></span>
          </div>
        </div>
      </div>
    </main>

    <!-- Detailed Order Modal -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
      enter-to-class="opacity-100 translate-y-0 md:scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 md:scale-100"
      leave-to-class="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
    >
      <div v-if="selectedOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-cocoa-dark/80 backdrop-blur-md">
        <div class="bg-brand-cocoa-dark border border-brand-gold/30 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
          
          <!-- Modal Header -->
          <div class="sticky top-0 bg-brand-cocoa-dark/95 backdrop-blur border-b border-brand-gold/10 p-6 flex justify-between items-center z-10">
            <div>
              <h2 class="font-serif text-2xl text-brand-cream font-bold">Order Details</h2>
              <p class="text-xs text-brand-gold font-mono mt-1">{{ selectedOrder.id }}</p>
            </div>
            <button @click="closeOrderDetails" class="p-2 text-brand-cream/50 hover:text-brand-gold rounded-full hover:bg-brand-gold/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <!-- Customer Info -->
            <div class="space-y-8">
              <section>
                <h3 class="text-[10px] tracking-widest text-brand-gold uppercase font-bold border-b border-brand-gold/20 pb-2 mb-4">Client Information</h3>
                <div class="space-y-3 text-sm text-brand-cream/80">
                  <p><strong class="text-brand-cream">Name:</strong> {{ selectedOrder.customerName }}</p>
                  <p><strong class="text-brand-cream">Email:</strong> {{ selectedOrder.customerEmail }}</p>
                  <p><strong class="text-brand-cream">Phone:</strong> {{ selectedOrder.customerPhone }}</p>
                  <p><strong class="text-brand-cream">Payment:</strong> <span class="uppercase text-xs tracking-wider">{{ selectedOrder.paymentMethod }}</span></p>
                </div>
              </section>

              <section>
                <h3 class="text-[10px] tracking-widest text-brand-gold uppercase font-bold border-b border-brand-gold/20 pb-2 mb-4">Delivery Details</h3>
                <div class="space-y-3 text-sm text-brand-cream/80">
                  <p><strong class="text-brand-cream">Address:</strong> {{ selectedOrder.shippingAddress }}</p>
                  <p><strong class="text-brand-cream">City:</strong> {{ selectedOrder.shippingCity }}</p>
                  <p><strong class="text-brand-cream">Country:</strong> {{ selectedOrder.shippingCountry }}</p>
                </div>
              </section>
              
              <section v-if="parsedCustomBoxDetails && parsedCustomBoxDetails.length > 0 && parsedCustomBoxDetails[0].details?.giftMessage">
                <h3 class="text-[10px] tracking-widest text-brand-gold uppercase font-bold border-b border-brand-gold/20 pb-2 mb-4">Handwritten Message</h3>
                <div class="bg-brand-cream text-brand-cocoa-dark p-6 rounded-xl font-serif text-sm italic shadow-inner">
                  "{{ parsedCustomBoxDetails[0].details.giftMessage }}"
                </div>
              </section>
            </div>

            <!-- Order Configuration Visuals -->
            <div class="space-y-8">
              <section>
                <h3 class="text-[10px] tracking-widest text-brand-gold uppercase font-bold border-b border-brand-gold/20 pb-2 mb-4">Order Composition</h3>
                
                <div v-for="(item, idx) in parsedCustomBoxDetails" :key="idx" class="mb-6 last:mb-0">
                  
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h4 class="font-serif text-lg text-brand-cream">{{ item.name }}</h4>
                      <p class="text-xs text-brand-cream/50 mt-1">Qty: {{ item.quantity }} &nbsp;|&nbsp; {{ formatPrice(item.price) }} each</p>
                    </div>
                  </div>

                  <!-- If it's a custom box with details, render the layout -->
                  <div v-if="item.details" class="bg-brand-bg/5 border border-brand-gold/10 p-5 rounded-2xl">
                    <div class="flex flex-wrap gap-4 text-xs font-sans text-brand-cream/70 mb-4">
                      <div class="bg-brand-cocoa-dark px-3 py-1.5 rounded-full border border-brand-gold/20">Theme: <strong class="text-brand-cream">{{ item.details.color }}</strong></div>
                      <div class="bg-brand-cocoa-dark px-3 py-1.5 rounded-full border border-brand-gold/20">Ribbon: <strong class="text-brand-cream">{{ item.details.ribbon }}</strong></div>
                      <div class="bg-brand-cocoa-dark px-3 py-1.5 rounded-full border border-brand-gold/20">Size: <strong class="text-brand-cream">{{ item.details.size }} Pieces</strong></div>
                    </div>

                    <!-- Mini Grid Visualization -->
                    <div v-if="item.details.items" class="mt-4">
                      <h5 class="text-[9px] uppercase tracking-wider text-brand-gold mb-3">Chocolate Layout Array:</h5>
                      <div 
                        class="grid gap-2 border border-brand-gold/30 p-3 rounded-xl bg-black/20"
                        :class="getGridColsClass(item.details.size)"
                      >
                        <div 
                          v-for="(choco, cIdx) in item.details.items" 
                          :key="cIdx"
                          class="aspect-square bg-brand-cocoa-light/20 border border-brand-gold/10 rounded flex flex-col justify-center items-center relative overflow-hidden"
                          :title="choco ? choco.name : 'Empty'"
                        >
                          <template v-if="choco">
                            <span class="text-[8px] text-brand-cream/40 absolute top-1 left-1">{{ cIdx + 1 }}</span>
                            <div class="w-4 h-4 rounded-full border border-black/20 mb-1" :style="{ backgroundColor: getChocoColor(choco.fillings) }"></div>
                            <span class="text-[6px] text-brand-gold uppercase tracking-widest text-center px-1 font-bold leading-tight">{{ choco.letter || choco.fillings }}</span>
                          </template>
                          <template v-else>
                            <span class="text-[8px] text-brand-cream/20">Empty</span>
                          </template>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              <section class="border-t border-dashed border-brand-gold/20 pt-6">
                <div class="flex justify-between text-brand-cream font-serif">
                  <span class="text-lg">Total Revenue</span>
                  <span class="text-2xl font-bold text-brand-gold">{{ formatPrice(selectedOrder.totalPrice) }}</span>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
definePageMeta({
  layout: false, // Don't use public layout
  middleware: ['admin'], // Protect route
});

useHead({
  title: 'Cocora | Concierge Dashboard',
});

const orders = ref([]);
const loading = ref(false);
const selectedOrder = ref(null);
const parsedCustomBoxDetails = ref(null);

const fetchOrders = async () => {
  loading.value = true;
  try {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBase.startsWith('http') ? config.public.apiBase : `https://${config.public.apiBase}`;
    const token = useCookie('admin_token').value;

    const res = await fetch(`${baseUrl}/api/admin/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (data.success) {
      orders.value = data.data;
    } else if (res.status === 401) {
      // Token expired or invalid
      logout();
    }
  } catch (err) {
    console.error("Failed to fetch orders:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrders();
});

const logout = () => {
  const token = useCookie('admin_token');
  token.value = null;
  navigateTo('/admin/login');
};

const openOrderDetails = (order) => {
  selectedOrder.value = order;
  // Parse the JSON string stored in customBoxDetails
  if (order.customBoxDetails) {
    try {
      parsedCustomBoxDetails.value = JSON.parse(order.customBoxDetails);
    } catch (e) {
      parsedCustomBoxDetails.value = [];
      console.error("Failed to parse customBoxDetails", e);
    }
  } else {
    parsedCustomBoxDetails.value = [];
  }
};

const closeOrderDetails = () => {
  selectedOrder.value = null;
  parsedCustomBoxDetails.value = null;
};

// UI Helpers
const formatPrice = (value) => {
  // Assuming PKR default backend storage for simplicity, matching client request format:
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(value) + ' / ' + new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0
  }).format(value * 0.014);
};

const getGridColsClass = (size) => {
  if (size === 16) return 'grid-cols-4';
  if (size === 25) return 'grid-cols-5';
  return 'grid-cols-3';
};

const getChocoColor = (filling) => {
  if (filling === 'pistachio') return '#4E5F3B'; 
  if (filling === 'almond') return '#634433'; 
  if (filling === 'date') return '#612128'; 
  return '#2C160F'; 
};
</script>
