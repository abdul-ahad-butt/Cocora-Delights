<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    
    <!-- Success State View -->
    <div v-if="orderPlaced" class="max-w-xl mx-auto text-center space-y-8 bg-brand-cream border border-brand-gold/15 p-8 md:p-12 rounded-[24px] shadow-xl animate-fade-in">
      <div class="w-16 h-16 bg-brand-success/20 text-brand-success rounded-full flex items-center justify-center mx-auto text-3xl">✓</div>
      
      <div class="space-y-3">
        <span class="text-xs font-sans tracking-[0.25em] text-brand-caramel uppercase font-bold">THANK YOU</span>
        <h1 class="font-serif text-3xl text-brand-cocoa-dark font-bold">Your Order is Placed</h1>
        <p class="text-xs text-brand-text/50 font-sans">ORDER ID: <span class="font-bold text-brand-cocoa-dark">{{ orderResult.orderId }}</span></p>
      </div>

      <div class="w-full h-[1px] bg-brand-gold/20"></div>

      <div class="space-y-4 text-left font-sans text-xs">
        <h4 class="font-serif text-sm font-semibold text-brand-cocoa-dark uppercase tracking-wider text-center">Summary for {{ orderResult.customerName }}</h4>
        <div class="space-y-2 text-brand-text/80">
          <p><strong>Shipping City:</strong> {{ shippingForm.shippingCity }}, {{ shippingForm.shippingCountry }}</p>
          <p><strong>Payment Method:</strong> {{ getPaymentMethodName(shippingForm.paymentMethod) }}</p>
          <p><strong>Estimated Delivery:</strong> 1-3 Business Days via Premium Temperature Courier</p>
          <p class="text-center font-serif text-sm text-brand-burgundy font-bold pt-2">Total Paid: {{ formatPrice(orderResult.totalPrice) }}</p>
        </div>
      </div>

      <div class="pt-6 flex flex-col gap-4">
        <!-- If placed via WhatsApp, encourage messaging concierge -->
        <a 
          v-if="shippingForm.paymentMethod === 'whatsapp'"
          :href="whatsappUrl" 
          target="_blank" 
          class="w-full py-4 rounded-full text-xs tracking-widest font-semibold bg-brand-success text-brand-cream hover:bg-brand-success/90 uppercase text-center flex items-center justify-center space-x-2 shadow"
        >
          <span>Connect with Concierge on WhatsApp</span>
        </a>
        
        <NuxtLink to="/" class="w-full py-4 rounded-full text-xs tracking-widest font-semibold btn-luxury-gold uppercase text-center">
          Return to Boutique Home
        </NuxtLink>
      </div>
    </div>

    <!-- Active Checkout Form View -->
    <div v-else class="space-y-12">
      <!-- Page Description -->
      <div class="text-center space-y-3 max-w-lg mx-auto">
        <span class="text-xs font-sans tracking-[0.25em] text-brand-caramel uppercase font-semibold">SECURE CHECKOUT</span>
        <h1 class="font-serif text-3xl md:text-4xl text-brand-cocoa-dark">Finalise Your Gifting Selection</h1>
        <div class="w-12 h-[1px] bg-brand-gold mx-auto mt-4"></div>
      </div>

      <div v-if="cart.length === 0" class="h-64 flex flex-col items-center justify-center text-center space-y-4">
        <p class="font-serif text-brand-cocoa-dark">Your cart is empty.</p>
        <NuxtLink to="/custom-box" class="px-6 py-2.5 rounded-full text-xs tracking-widest font-medium btn-luxury-gold uppercase">
          Build Custom Box
        </NuxtLink>
      </div>

      <!-- Checkout Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Left: Form details (Shipping & Payment) -->
        <form @submit.prevent="submitOrder" class="lg:col-span-7 space-y-8 bg-brand-cream p-6 md:p-8 rounded-[20px] border border-brand-gold/10">
          <!-- Customer Details -->
          <div class="space-y-4">
            <h3 class="font-serif text-base text-brand-cocoa-dark font-bold tracking-wide border-b border-brand-gold/10 pb-2">1. Your Personal Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-[10px] tracking-wider uppercase text-brand-text/60 font-sans" for="name">Full Name</label>
                <input v-model="shippingForm.customerName" required id="name" type="text" class="input-luxury w-full bg-brand-bg rounded-lg p-3 text-xs focus:outline-none border border-brand-gold/20 focus:border-brand-gold text-brand-cocoa-dark" />
              </div>
              <div class="space-y-1">
                <label class="text-[10px] tracking-wider uppercase text-brand-text/60 font-sans" for="email">Email Address</label>
                <input v-model="shippingForm.customerEmail" required id="email" type="email" class="input-luxury w-full bg-brand-bg rounded-lg p-3 text-xs focus:outline-none border border-brand-gold/20 focus:border-brand-gold text-brand-cocoa-dark" />
              </div>
              <div class="space-y-1 md:col-span-2">
                <label class="text-[10px] tracking-wider uppercase text-brand-text/60 font-sans" for="phone">Phone Number (For Courier Coordination)</label>
                <input v-model="shippingForm.customerPhone" required id="phone" type="tel" placeholder="+92 300 1234567 or +971 50 1234567" class="input-luxury w-full bg-brand-bg rounded-lg p-3 text-xs focus:outline-none border border-brand-gold/20 focus:border-brand-gold text-brand-cocoa-dark" />
              </div>
            </div>
          </div>

          <!-- Shipping Details -->
          <div class="space-y-4">
            <h3 class="font-serif text-base text-brand-cocoa-dark font-bold tracking-wide border-b border-brand-gold/10 pb-2">2. Delivery Address</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1 md:col-span-2">
                <label class="text-[10px] tracking-wider uppercase text-brand-text/60 font-sans" for="address">Street Address, Apartment, Landmark</label>
                <input v-model="shippingForm.shippingAddress" required id="address" type="text" class="input-luxury w-full bg-brand-bg rounded-lg p-3 text-xs focus:outline-none border border-brand-gold/20 focus:border-brand-gold text-brand-cocoa-dark" />
              </div>
              
              <div class="space-y-1">
                <label class="text-[10px] tracking-wider uppercase text-brand-text/60 font-sans" for="country">Country</label>
                <select v-model="shippingForm.shippingCountry" @change="onCountryChange" id="country" class="input-luxury w-full bg-brand-bg rounded-lg p-3 text-xs focus:outline-none border border-brand-gold/20 focus:border-brand-gold text-brand-cocoa-dark font-sans">
                  <option value="Pakistan">Pakistan</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                </select>
              </div>

              <div class="space-y-1">
                <label class="text-[10px] tracking-wider uppercase text-brand-text/60 font-sans" for="city">City</label>
                <select v-model="shippingForm.shippingCity" id="city" class="input-luxury w-full bg-brand-bg rounded-lg p-3 text-xs focus:outline-none border border-brand-gold/20 focus:border-brand-gold text-brand-cocoa-dark font-sans">
                  <option v-for="city in availableCities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="space-y-4">
            <h3 class="font-serif text-base text-brand-cocoa-dark font-bold tracking-wide border-b border-brand-gold/10 pb-2">3. Select Payment Option</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                type="button" 
                @click="shippingForm.paymentMethod = 'whatsapp'"
                class="p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 text-center space-y-2"
                :class="shippingForm.paymentMethod === 'whatsapp' ? 'border-brand-gold bg-brand-bg font-semibold' : 'border-brand-gold/20 hover:border-brand-gold'"
              >
                <!-- Whatsapp Icon representation -->
                <span class="w-6 h-6 rounded-full bg-brand-success/20 text-brand-success flex items-center justify-center text-xs font-bold font-sans">WA</span>
                <span class="text-[10px] tracking-wider uppercase text-brand-cocoa-dark font-medium leading-none">WhatsApp Order</span>
              </button>

              <button 
                type="button" 
                @click="shippingForm.paymentMethod = 'card'"
                class="p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 text-center space-y-2"
                :class="shippingForm.paymentMethod === 'card' ? 'border-brand-gold bg-brand-bg font-semibold' : 'border-brand-gold/20 hover:border-brand-gold'"
              >
                <span class="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center text-xs font-bold font-sans">💳</span>
                <span class="text-[10px] tracking-wider uppercase text-brand-cocoa-dark font-medium leading-none">Credit Card</span>
              </button>

              <button 
                type="button" 
                @click="shippingForm.paymentMethod = 'cod'"
                class="p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 text-center space-y-2"
                :class="shippingForm.paymentMethod === 'cod' ? 'border-brand-gold bg-brand-bg font-semibold' : 'border-brand-gold/20 hover:border-brand-gold'"
              >
                <span class="w-6 h-6 rounded-full bg-brand-caramel/20 text-brand-caramel flex items-center justify-center text-xs font-bold font-sans">💵</span>
                <span class="text-[10px] tracking-wider uppercase text-brand-cocoa-dark font-medium leading-none">Cash on Delivery</span>
              </button>
            </div>

            <!-- Simulated Card details form -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0 scale-95"
              enter-to-class="opacity-100 max-h-60 scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 max-h-60 scale-100"
              leave-to-class="opacity-0 max-h-0 scale-95"
            >
              <div v-if="shippingForm.paymentMethod === 'card'" class="bg-brand-bg border border-brand-gold/20 p-4 rounded-xl space-y-4 mt-4">
                <h4 class="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold font-sans">Card Details</h4>
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div class="sm:col-span-4 space-y-1">
                    <label class="text-[9px] tracking-wider uppercase text-brand-text/50 font-sans" for="cardNumber">Card Number</label>
                    <input required id="cardNumber" type="text" placeholder="xxxx xxxx xxxx xxxx" class="w-full bg-brand-cream rounded-lg p-2.5 text-xs focus:outline-none border border-brand-gold/20 text-brand-cocoa-dark" />
                  </div>
                  <div class="sm:col-span-2 space-y-1">
                    <label class="text-[9px] tracking-wider uppercase text-brand-text/50 font-sans" for="cardExpiry">Expiration Date</label>
                    <input required id="cardExpiry" type="text" placeholder="MM/YY" class="w-full bg-brand-cream rounded-lg p-2.5 text-xs focus:outline-none border border-brand-gold/20 text-brand-cocoa-dark" />
                  </div>
                  <div class="sm:col-span-2 space-y-1">
                    <label class="text-[9px] tracking-wider uppercase text-brand-text/50 font-sans" for="cardCvv">Security Code (CVV)</label>
                    <input required id="cardCvv" type="password" placeholder="•••" class="w-full bg-brand-cream rounded-lg p-2.5 text-xs focus:outline-none border border-brand-gold/20 text-brand-cocoa-dark" />
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div class="pt-4 border-t border-brand-gold/10 flex items-center justify-between">
            <span v-if="submitError" class="text-xs text-brand-burgundy font-medium animate-pulse">{{ submitError }}</span>
            <button 
              type="submit" 
              class="w-full py-4 rounded-full text-xs tracking-widest font-semibold btn-luxury-cocoa uppercase shadow-lg text-center"
              :disabled="submitting"
            >
              {{ submitting ? 'Processing Order...' : shippingForm.paymentMethod === 'whatsapp' ? 'Place Order & Open WhatsApp' : 'Submit Luxury Order' }}
            </button>
          </div>
        </form>

        <!-- Right: Items summary list -->
        <div class="lg:col-span-5 bg-brand-cream p-6 md:p-8 rounded-[20px] border border-brand-gold/10 space-y-6">
          <h3 class="font-serif text-base text-brand-cocoa-dark font-bold tracking-wide border-b border-brand-gold/10 pb-2 uppercase">Order Summary</h3>
          
          <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
            <div 
              v-for="(item, idx) in cart" 
              :key="idx" 
              class="flex space-x-3 text-xs border-b border-brand-gold/10 pb-4 last:border-0 last:pb-0"
            >
              <!-- Small thumbnail -->
              <div class="w-12 h-12 bg-brand-bg rounded overflow-hidden flex-shrink-0 flex items-center justify-center border border-brand-gold/5">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              </div>
              <div class="flex-grow">
                <h4 class="font-serif text-brand-cocoa-dark font-bold line-clamp-1">{{ item.name }}</h4>
                <p v-if="item.type === 'custom'" class="text-[9px] text-brand-caramel uppercase tracking-wider">
                  {{ item.customDetails.size }} Pieces ({{ item.customDetails.color }})
                </p>
                <p v-else class="text-[9px] text-brand-text/50 uppercase tracking-wider">{{ item.pieces }} Pieces</p>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-brand-text/50">Qty: {{ item.quantity }}</span>
                  <span class="font-serif font-bold text-brand-cocoa-dark">{{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-brand-gold/15 pt-4 space-y-3 font-sans text-xs">
            <div class="flex justify-between text-brand-text/70">
              <span>Items Subtotal</span>
              <span>{{ formatPrice(cartSubtotal) }}</span>
            </div>
            <div class="flex justify-between text-brand-text/70">
              <span>Temperature Chilled Courier</span>
              <span>{{ formatPrice(shippingCost) }}</span>
            </div>
            <div class="flex justify-between font-serif text-brand-cocoa-dark font-bold text-sm border-t border-dashed border-brand-gold/20 pt-3">
              <span>TOTAL ORDER</span>
              <span class="text-brand-burgundy text-base">{{ formatPrice(orderTotalCost) }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>

// SEO head configuration
useHead({
  title: 'Cocora | Elegant Luxury Checkout',
  meta: [
    { name: 'description', content: 'Finalize your premium chocolate gifting selection. Choose between credit cards, COD, and placing custom orders directly via WhatsApp.' }
  ]
});

// Access shared shopping cart state
const cart = useState('cocora-cart');
const isCartOpen = useState('cocora-cart-open');

// Local States
const orderPlaced = ref(false);
const submitting = ref(false);
const submitError = ref('');
const orderResult = ref({});
const whatsappUrl = ref('');

const shippingForm = ref({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  shippingAddress: '',
  shippingCity: 'Karachi',
  shippingCountry: 'Pakistan',
  paymentMethod: 'whatsapp', // Default WhatsApp order option
});

// Computed items pricing
const cartSubtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const shippingCost = computed(() => {
  // Free delivery above 10,000 PKR
  if (cartSubtotal.value >= 10000) return 0;
  // Delivery cost differs by country
  return shippingForm.value.shippingCountry === 'Pakistan' ? 350 : 35; // 350 PKR / 35 AED
});

const orderTotalCost = computed(() => {
  return cartSubtotal.value + shippingCost.value;
});

// City dropdown details based on regional coordinates
const citiesByCountry = {
  'Pakistan': ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Peshawar', 'Multan'],
  'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain'],
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina']
};

const availableCities = computed(() => {
  return citiesByCountry[shippingForm.value.shippingCountry] || [];
});

const onCountryChange = () => {
  shippingForm.value.shippingCity = availableCities.value[0] || '';
};

// Help helper for payment format name
const getPaymentMethodName = (method) => {
  if (method === 'whatsapp') return 'WhatsApp Boutique Concierge Confirmation';
  if (method === 'card') return 'Simulated Credit Card Authorization';
  return 'Cash on Delivery';
};

// Pricing formatting
const formatPrice = (value) => {
  const isPkr = shippingForm.value.shippingCountry === 'Pakistan';
  if (isPkr) {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(value);
  } else {
    // Show in AED/SAR equivalents
    const converted = shippingForm.value.shippingCountry === 'Saudi Arabia' 
      ? value * 0.014 // Mock SAR rate
      : value * 0.014; // Mock AED rate
    const currencyCode = shippingForm.value.shippingCountry === 'Saudi Arabia' ? 'SAR' : 'AED';
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0
    }).format(converted);
  }
};

// Order placement logic
const submitOrder = async () => {
  submitting.value = true;
  submitError.value = '';
  
  // Format cart list item strings for API storage and WhatsApp messages
  const cartSummary = cart.value.map(item => {
    let desc = `${item.quantity}x ${item.name}`;
    if (item.type === 'custom' && item.customDetails) {
      desc += ` [Size: ${item.customDetails.size}-pc, Style: ${item.customDetails.color}]`;
    }
    return desc;
  }).join(', ');

  const payload = {
    customerName: shippingForm.value.customerName,
    customerEmail: shippingForm.value.customerEmail,
    customerPhone: shippingForm.value.customerPhone,
    shippingAddress: shippingForm.value.shippingAddress,
    shippingCity: shippingForm.value.shippingCity,
    shippingCountry: shippingForm.value.shippingCountry,
    orderType: cart.value[0]?.type === 'custom' ? 'custom_box' : 'signature_collection',
    customBoxDetails: cart.value.map(c => ({
      name: c.name,
      price: c.price,
      quantity: c.quantity,
      details: c.customDetails || null
    })),
    totalPrice: orderTotalCost.value,
    paymentMethod: shippingForm.value.paymentMethod
  };

  try {
    const res = await fetch('http://localhost:8787/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    
    if (json.success) {
      orderResult.value = json.data;
      
      // If payment method is WhatsApp, compile a gorgeous prefilled message
      if (shippingForm.value.paymentMethod === 'whatsapp') {
        const text = `Greetings Cocora Concierge! 🍫\n\nI would like to place a luxury chocolate order:\n\n*Order ID:* ${json.data.orderId}\n*Client:* ${shippingForm.value.customerName}\n*City:* ${shippingForm.value.shippingCity}\n*Address:* ${shippingForm.value.shippingAddress}\n*Selections:* ${cartSummary}\n*Total Price:* ${formatPrice(orderTotalCost.value)}\n\nPlease confirm my delivery slot! Thank you.`;
        whatsappUrl.value = `https://wa.me/923000000000?text=${encodeURIComponent(text)}`;
        
        // Auto redirect to WhatsApp after short delay
        setTimeout(() => {
          window.open(whatsappUrl.value, '_blank');
        }, 1500);
      }
      
      orderPlaced.value = true;
      cart.value = []; // Clear shopping cart
    } else {
      submitError.value = json.error || 'Failed to place order. Please try again.';
    }
  } catch (err) {
    // Local fallback/offline success simulation for demo robustness
    const fallbackId = 'COC-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    orderResult.value = {
      orderId: fallbackId,
      customerName: shippingForm.value.customerName,
      totalPrice: orderTotalCost.value
    };
    
    if (shippingForm.value.paymentMethod === 'whatsapp') {
      const text = `Greetings Cocora Concierge! 🍫\n\nI would like to place a luxury chocolate order:\n\n*Order ID:* ${fallbackId}\n*Client:* ${shippingForm.value.customerName}\n*City:* ${shippingForm.value.shippingCity}\n*Address:* ${shippingForm.value.shippingAddress}\n*Selections:* ${cartSummary}\n*Total Price:* ${formatPrice(orderTotalCost.value)}\n\nPlease confirm my delivery slot! Thank you.`;
      whatsappUrl.value = `https://wa.me/923000000000?text=${encodeURIComponent(text)}`;
      setTimeout(() => {
        window.open(whatsappUrl.value, '_blank');
      }, 1500);
    }
    
    orderPlaced.value = true;
    cart.value = [];
  } finally {
    submitting.value = false;
  }
};
</script>
