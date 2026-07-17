<template>
  <div class="max-w-7xl mx-auto px-6 py-12 space-y-12">
    <!-- Header Page Description -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <span class="text-xs font-sans tracking-[0.25em] text-brand-caramel uppercase font-semibold">CRAFTING STUDIO</span>
      <h1 class="font-serif text-3xl md:text-5xl text-brand-cocoa-dark leading-tight">
        Create a Box as Unique as Your Celebration
      </h1>
      <p class="font-sans text-sm text-brand-text/70 leading-relaxed">
        Choose your box size and luxury packaging, select our artisanal chocolate shapes, and personalize them with custom letters or fillings to create a truly unforgettable gift.
      </p>
    </div>

    <!-- Main Customizer Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      <!-- Left Column: Visual Box Grid Compartments -->
      <div class="lg:col-span-7 flex flex-col items-center space-y-6">
        <!-- Packaging Box Wrapper -->
        <div 
          class="w-full max-w-125 min-w-0 aspect-square p-4 sm:p-8 rounded-3xl border-4 flex flex-col justify-between shadow-2xl relative transition-all duration-500"
          :class="boxColorStyle"
        >
          <!-- Box Brand Stamp -->
          <div class="absolute top-3 left-0 right-0 text-center pointer-events-none">
            <span class="font-serif text-[10px] tracking-[0.3em] opacity-40 uppercase">COCORA DELIGHTS</span>
          </div>

          <!-- The Chocolate Grid Layout -->
          <div class="grow flex items-center justify-center py-4 min-w-0">
            <div 
              class="grid gap-1.5 sm:gap-3 bg-brand-cocoa-dark/95 p-2 sm:p-4 rounded-xl border border-brand-gold/30 shadow-inner w-full max-w-95"
              :class="gridColsClass"
            >
              <div 
                v-for="idx in boxSize" 
                :key="idx"
                @click="openPieceSelector(idx - 1)"
                class="aspect-square rounded-lg border border-brand-gold/10 flex items-center justify-center relative cursor-pointer group transition-all duration-300"
                :class="selectedBoxGrid[idx - 1] ? 'bg-brand-cocoa-light/60 hover:bg-brand-cocoa-light' : 'bg-brand-cocoa-dark hover:bg-brand-cocoa-light/30 border-dashed'"
              >
                <!-- Compartment visual texture -->
                <div class="absolute inset-0 bg-radial-gradient from-transparent to-black/20 pointer-events-none rounded-lg"></div>

                <!-- Empty Compartment Indicator -->
                <div v-if="!selectedBoxGrid[idx - 1]" class="flex flex-col items-center justify-center space-y-1 p-1">
                  <span class="text-brand-gold/50 group-hover:text-brand-gold text-lg transition-colors duration-300 font-light">+</span>
                  <span class="text-[8px] text-brand-cream/30 group-hover:text-brand-cream/60 transition-colors duration-300 uppercase tracking-widest text-center">Add</span>
                </div>

                <!-- Populated Compartment (Renders Chocolate Shape) -->
                <div v-else class="w-full h-full p-2 flex flex-col items-center justify-center relative animate-fade-in">
                  <!-- Custom Chocolate Shapes -->
                  <div class="relative w-full h-full flex items-center justify-center">
                    <!-- Heart Chocolate shape in CSS -->
                    <div 
                      v-if="selectedBoxGrid[idx - 1].shape === 'heart'" 
                      class="w-10 h-10 relative flex items-center justify-center transition-transform group-hover:scale-105"
                    >
                      <svg viewBox="0 0 32 32" class="w-full h-full" :fill="getChocolateColor(selectedBoxGrid[idx - 1])">
                        <path d="M16 28.5S2 16.5 2 9.5a7 7 0 0 1 12-4.9 7 7 0 0 1 12 4.9c0 7-14 19-14 19z"/>
                      </svg>
                      <!-- Dusting effect -->
                      <span v-if="selectedBoxGrid[idx - 1].fillings === 'pistachio'" class="absolute w-2 h-2 rounded-full bg-brand-gold/80 blur-[1px] top-2"></span>
                    </div>

                    <!-- Cube Chocolate shape -->
                    <div 
                      v-else-if="selectedBoxGrid[idx - 1].shape === 'cube'" 
                      class="w-9 h-9 rounded-md shadow-md border-b-4 border-r-4 border-black/30 transform transition-transform group-hover:scale-105"
                      :style="{ backgroundColor: getChocolateColor(selectedBoxGrid[idx - 1]) }"
                    >
                      <!-- Inner foil shine simulation -->
                      <div class="w-2 h-2 bg-white/20 rounded-full blur-[1px] m-1"></div>
                    </div>

                    <!-- Bar Chocolate shape -->
                    <div 
                      v-else-if="selectedBoxGrid[idx - 1].shape === 'bar'" 
                      class="w-11 h-6 rounded border-b-2 border-r-2 border-black/30 flex justify-between px-1 items-center transition-transform group-hover:scale-105"
                      :style="{ backgroundColor: getChocolateColor(selectedBoxGrid[idx - 1]) }"
                    >
                      <span class="w-0.5 h-4 bg-black/20 rounded"></span>
                      <span class="w-0.5 h-4 bg-black/20 rounded"></span>
                      <span class="w-0.5 h-4 bg-black/20 rounded"></span>
                    </div>

                    <!-- Default / Stuffed date -->
                    <div 
                      v-else
                      class="w-10 h-6 rounded-full border-b-2 border-r-2 border-black/40 shadow-md transform rotate-12 flex items-center justify-center transition-transform group-hover:scale-105"
                      :style="{ backgroundColor: getChocolateColor(selectedBoxGrid[idx - 1]) }"
                    >
                      <span class="w-6 h-1 bg-white/10 rounded-full"></span>
                    </div>

                    <!-- Letter Engraving Overlay (if customized) -->
                    <div 
                      v-if="selectedBoxGrid[idx - 1].letter" 
                      class="absolute inset-0 flex items-center justify-center text-brand-gold font-serif font-bold text-xs uppercase drop-shadow-md select-none pointer-events-none"
                    >
                      {{ selectedBoxGrid[idx - 1].letter }}
                    </div>
                  </div>

                  <!-- Small Tooltip Overlay on hover -->
                  <div class="absolute inset-0 bg-brand-cocoa-dark/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex flex-col items-center justify-center p-1 text-center">
                    <p class="text-[9px] text-brand-gold font-bold line-clamp-1 leading-none uppercase">{{ selectedBoxGrid[idx - 1].name }}</p>
                    <p class="text-[8px] text-brand-cream/70 line-clamp-1 mt-0.5">{{ selectedBoxGrid[idx - 1].letter ? `Letter: '${selectedBoxGrid[idx - 1].letter}'` : selectedBoxGrid[idx - 1].fillings + ' fill' }}</p>
                    <span class="text-[8px] text-brand-burgundy font-bold mt-1 px-1 bg-brand-gold rounded-full hover:bg-brand-cream">Replace</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ribbon representation -->
          <div class="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
            <span class="px-4 py-1 text-[8px] bg-brand-gold text-brand-cocoa-dark rounded-full tracking-[0.2em] font-bold uppercase shadow-md border border-brand-cream/20">
              {{ ribbonColor }} Ribbon Wrap
            </span>
          </div>
        </div>

        <!-- Customizer Utility Actions -->
        <div class="flex items-center space-x-4">
          <button @click="autofillBox" class="px-5 py-2.5 border border-brand-gold/30 rounded-full text-xs text-brand-cocoa-dark hover:bg-brand-cream font-medium tracking-wide">
            Auto-fill Assortment
          </button>
          <button @click="clearBox" class="px-5 py-2.5 border border-brand-burgundy/20 rounded-full text-xs text-brand-burgundy hover:bg-brand-burgundy/5 font-medium tracking-wide">
            Clear Box
          </button>
        </div>
      </div>

      <!-- Right Column: Configurations Panel -->
      <div class="lg:col-span-5 space-y-8 bg-brand-cream p-8 rounded-2xl border border-brand-gold/15">
        
        <!-- Step 1: Box Size -->
        <div class="space-y-3.5">
          <h3 class="font-serif text-base text-brand-cocoa-dark font-bold tracking-wide">1. Select Box Size</h3>
          <div class="grid grid-cols-3 gap-3">
            <button 
              v-for="opt in sizeOptions" 
              :key="opt.size"
              @click="changeBoxSize(opt.size)"
              class="p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 text-center"
              :class="boxSize === opt.size ? 'border-brand-gold bg-brand-bg shadow-sm font-semibold' : 'border-brand-gold/25 hover:border-brand-gold'"
            >
              <span class="text-sm font-serif text-brand-cocoa-dark">{{ opt.name }}</span>
              <span class="text-[10px] text-brand-caramel tracking-wider uppercase mt-1">{{ opt.size }} Pieces</span>
            </button>
          </div>
        </div>

        <!-- Step 2: Packaging Style -->
        <div class="space-y-3.5">
          <h3 class="font-serif text-base text-brand-cocoa-dark font-bold tracking-wide">2. Choose Presentation Theme</h3>
          <div class="grid grid-cols-3 gap-3">
            <button 
              v-for="color in themeOptions" 
              :key="color.name"
              @click="boxColor = color.name"
              class="p-3 rounded-xl border flex flex-col items-center space-y-2 text-center transition-all duration-300"
              :class="boxColor === color.name ? 'border-brand-gold bg-brand-bg shadow-sm font-semibold' : 'border-brand-gold/25 hover:border-brand-gold'"
            >
              <span class="w-6 h-6 rounded-full border border-black/10" :style="{ backgroundColor: color.colorCode }"></span>
              <span class="text-[10px] tracking-wide uppercase font-medium text-brand-cocoa-dark leading-none">{{ color.label }}</span>
            </button>
          </div>
        </div>

        <!-- Step 3: Calligraphy card text -->
        <div class="space-y-3">
          <h3 class="font-serif text-base text-brand-cocoa-dark font-bold tracking-wide">3. Add Handwritten Greetings Card</h3>
          <textarea 
            v-model="giftMessage"
            maxlength="250"
            placeholder="Type your personalized message here (e.g. 'Wishing you a blessed Eid, with all our love!'). We will handwrite this on premium heavy cardstock."
            class="w-full bg-brand-bg border border-brand-gold/30 rounded-xl p-4 text-xs font-sans focus:outline-none focus:border-brand-gold transition-colors duration-300 text-brand-cocoa-dark"
            rows="3"
          ></textarea>
          <div class="flex justify-between text-[9px] text-brand-text/50 font-sans">
            <span>Premium ivory cardstock included</span>
            <span>{{ giftMessage.length }} / 250 characters</span>
          </div>
        </div>

        <!-- Dynamic Billing summary -->
        <div class="border-t border-brand-gold/15 pt-6 space-y-4">
          <div class="flex justify-between items-center text-xs text-brand-text/70 font-sans">
            <span>{{ boxSize }}-Piece Luxury Box Packaging</span>
            <span>{{ formatPrice(boxBasePrice) }}</span>
          </div>
          <div class="flex justify-between items-center text-xs text-brand-text/70 font-sans">
            <span>Chocolate Delicacies Filled ({{ selectedCount }} / {{ boxSize }})</span>
            <span>{{ formatPrice(chocolatesTotalCost) }}</span>
          </div>
          <div class="flex justify-between items-center font-serif text-brand-cocoa-dark font-bold border-t border-dashed border-brand-gold/20 pt-4">
            <span class="text-sm">TOTAL PRICE</span>
            <span class="text-lg text-brand-burgundy">{{ formatPrice(totalBoxPrice) }}</span>
          </div>
        </div>

        <!-- Add custom box to cart -->
        <button 
          @click="addBoxToCart"
          class="w-full py-4 rounded-full text-xs tracking-widest font-semibold btn-luxury-cocoa uppercase shadow-lg transition-transform duration-300"
          :disabled="selectedCount === 0"
          :class="selectedCount === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01]'"
        >
          Add Custom Box to Cart
        </button>
      </div>

    </div>

    <!-- Piece Selection Drawer / Modal Overlay -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="activeSlotIndex !== null" class="fixed inset-0 z-50 bg-brand-cocoa-dark/50 backdrop-blur-sm flex items-center justify-center p-6">
        
        <div class="bg-brand-bg max-w-2xl w-full rounded-2xl border border-brand-gold/15 shadow-2xl p-6 md:p-8 flex flex-col space-y-6 max-h-[90vh]">
          <!-- Drawer Header -->
          <div class="flex justify-between items-center border-b border-brand-gold/10 pb-4">
            <div>
              <h3 class="font-serif text-lg text-brand-cocoa-dark font-bold">Select Chocolate Delicacy</h3>
              <p class="text-xs text-brand-text/50 font-sans mt-0.5">Choose a chocolate for Compartment #{{ activeSlotIndex + 1 }}</p>
            </div>
            <button @click="activeSlotIndex = null" class="text-brand-cocoa-dark/60 hover:text-brand-cocoa-dark p-3 -mr-2 -mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Grid of available chocolates -->
          <div class="grow overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 pr-2">
            <div 
              v-for="item in chocolateProducts" 
              :key="item.id"
              @click="selectPiece(item)"
              class="border border-brand-gold/10 p-4 rounded-xl flex space-x-4 items-center cursor-pointer hover:border-brand-gold bg-brand-cream hover:bg-brand-bg transition-all duration-300 group"
            >
              <!-- Small rendering representation -->
              <div class="w-12 h-12 rounded-lg bg-brand-cocoa-dark flex items-center justify-center text-brand-gold relative">
                <svg v-if="item.shape === 'heart'" viewBox="0 0 32 32" class="w-6 h-6" :fill="getChocolateColor(item)">
                  <path d="M16 28.5S2 16.5 2 9.5a7 7 0 0 1 12-4.9 7 7 0 0 1 12 4.9c0 7-14 19-14 19z"/>
                </svg>
                <div v-else-if="item.shape === 'cube'" class="w-6 h-6 rounded border-b-2 border-r-2 border-black/25" :style="{ backgroundColor: getChocolateColor(item) }"></div>
                <div v-else-if="item.shape === 'bar'" class="w-8 h-4 rounded border-b-2 border-r-2 border-black/25 flex justify-between px-0.5 items-center" :style="{ backgroundColor: getChocolateColor(item) }">
                  <span class="w-px h-2 bg-black/20"></span>
                  <span class="w-px h-2 bg-black/20"></span>
                </div>
                <div v-else class="w-8 h-5 rounded-full border-b-2 border-r-2 border-black/30" :style="{ backgroundColor: getChocolateColor(item) }"></div>
              </div>

              <!-- Product Details -->
              <div class="grow">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif text-sm text-brand-cocoa-dark font-bold group-hover:text-brand-gold transition-colors duration-300">{{ item.name }}</h4>
                  <span class="text-xs font-serif font-bold text-brand-cocoa-dark">{{ formatPrice(item.price) }}</span>
                </div>
                <p class="text-[11px] text-brand-text/60 leading-relaxed font-sans line-clamp-1 mt-0.5">{{ item.description }}</p>
                <span class="text-[9px] text-brand-caramel uppercase tracking-wider font-semibold font-sans block mt-1">Fill: {{ item.fillings }}</span>
              </div>
            </div>
          </div>

          <!-- Step 4 Optional Calligraphy Engraving -->
          <div class="border-t border-brand-gold/10 pt-4 space-y-3">
            <h4 class="font-serif text-xs text-brand-cocoa-dark font-bold uppercase tracking-wider">Option: Letter Engraving</h4>
            <p class="text-[10px] text-brand-text/60 font-sans leading-relaxed">
              Spell out custom messages on your chocolate (e.g. "EID", "I LOVE U", or initials). Type a single character to emboss on this piece in gold ink.
            </p>
            <div class="flex items-center space-x-3">
              <input 
                id="letterEngraving"
                name="letterEngraving"
                v-model="activeLetter" 
                type="text" 
                maxlength="1" 
                placeholder="A"
                class="w-12 bg-brand-cream border border-brand-gold/30 rounded-lg p-2 text-center text-sm font-serif font-bold uppercase focus:outline-none focus:border-brand-gold text-brand-cocoa-dark"
              />
              <span class="text-[10px] text-brand-text/50 font-sans">(Leave blank for standard textured finish)</span>
            </div>
          </div>

        </div>

      </div>
    </transition>
  </div>
</template>

<script setup>

// SEO Metatags
useHead({
  title: 'Cocora | Interactive Custom Chocolate Box Builder',
  meta: [
    { name: 'description', content: 'Customize a world-class luxury chocolate gift box by choosing your sizes, premium fillings, hand-engraved letters, and elegant regional gift ribbon wraps.' }
  ]
});

// Access shared shopping cart state
const cart = useState('cocora-cart');
const isCartOpen = useState('cocora-cart-open');

// Customizer config options
const boxSize = ref(9); // Default 9 pieces
const boxColor = ref('ivory'); // Default warm ivory
const giftMessage = ref('');
const activeSlotIndex = ref(null);
const activeLetter = ref('');
const selectedBoxGrid = ref(Array(9).fill(null));
const productsFromAPI = ref([]);

// Size & pricing options
const sizeOptions = [
  { name: 'Boutique Collection', size: 9, basePrice: 500 },
  { name: 'Celebration Box', size: 16, basePrice: 800 },
  { name: 'Imperial Gift Array', size: 25, basePrice: 1200 }
];

const themeOptions = [
  { name: 'ivory', label: 'Warm Ivory', colorCode: '#F8F4EE', ribbon: 'Gold' },
  { name: 'cocoa', label: 'Dark Cocoa', colorCode: '#24130E', ribbon: 'Copper' },
  { name: 'burgundy', label: 'Deep Burgundy', colorCode: '#6B2C32', ribbon: 'Champagne Gold' }
];

// Computed pricing helpers
const boxBasePrice = computed(() => {
  const opt = sizeOptions.find(o => o.size === boxSize.value);
  return opt ? opt.basePrice : 500;
});

const chocolatesTotalCost = computed(() => {
  return selectedBoxGrid.value.reduce((total, item) => {
    return total + (item ? item.price : 0);
  }, 0);
});

const totalBoxPrice = computed(() => {
  return boxBasePrice.value + chocolatesTotalCost.value;
});

const selectedCount = computed(() => {
  return selectedBoxGrid.value.filter(item => item !== null).length;
});

const ribbonColor = computed(() => {
  const opt = themeOptions.find(t => t.name === boxColor.value);
  return opt ? opt.ribbon : 'Gold';
});

// Dynamic styling class for packaging box styling
const boxColorStyle = computed(() => {
  if (boxColor.value === 'cocoa') {
    return 'bg-brand-cocoa-dark border-brand-gold text-brand-cream shadow-[0_20px_50px_rgba(36,19,14,0.4)]';
  } else if (boxColor.value === 'burgundy') {
    return 'bg-brand-burgundy border-brand-gold text-brand-cream shadow-[0_20px_50px_rgba(107,44,50,0.4)]';
  }
  return 'bg-brand-cream border-brand-gold/60 text-brand-cocoa-dark shadow-[0_20px_50px_rgba(45,42,40,0.06)]';
});

const gridColsClass = computed(() => {
  if (boxSize.value === 16) return 'grid-cols-4';
  if (boxSize.value === 25) return 'grid-cols-5';
  return 'grid-cols-3';
});

// Fetch pieces products from Hono D1 API
onMounted(async () => {
  try {
    const baseUrl = useApiBase();
    const res = await fetch(baseUrl + '/api/products');
    const json = await res.json();
    if (json.success && json.data.length > 0) {
      productsFromAPI.value = json.data;
    }
  } catch (err) {
    console.warn('API down, using fallback products.', err);
  }
});

// Fallback pieces
const fallbackProducts = [
  { id: 1, name: 'Almond Rocher Cube', shape: 'cube', fillings: 'almond', price: 150, description: 'Milk chocolate cube with toasted almond slivers.' },
  { id: 2, name: 'Almond Butter Heart', shape: 'heart', fillings: 'almond', price: 160, description: 'Rich dark chocolate heart filled with salted almond butter.' },
  { id: 3, name: 'Pistachio Praline Heart', shape: 'heart', fillings: 'pistachio', price: 180, description: 'Elegant heart filled with stone-ground pistachio praline.' },
  { id: 4, name: 'Pistachio Crunch Cube', shape: 'cube', fillings: 'pistachio', price: 170, description: 'Dark chocolate cube with crunchy roasted pistachios.' },
  { id: 5, name: 'Walnut Ganache Cube', shape: 'cube', fillings: 'walnut', price: 160, description: 'Dark chocolate cube filled with espresso walnut ganache.' },
  { id: 6, name: 'Honey Cashew Bar', shape: 'bar', fillings: 'cashew', price: 220, description: 'Mini milk chocolate bar stuffed with salted cashews.' },
  { id: 7, name: 'Cardamom Date Heart', shape: 'heart', fillings: 'date', price: 180, description: 'Milk chocolate heart filled with cardamom date caramel.' },
  { id: 8, name: 'Stuffed Date Rocher', shape: 'custom', fillings: 'date', price: 250, description: 'Organic date stuffed with a whole almond dipped in chocolate.' }
];

const chocolateProducts = computed(() => {
  return productsFromAPI.value.length > 0 ? productsFromAPI.value : fallbackProducts;
});

// Color rendering helpers based on chocolate type
const getChocolateColor = (item) => {
  if (item.fillings === 'pistachio') return '#4E5F3B'; // Olive Green hints
  if (item.fillings === 'almond') return '#634433'; // Light Cocoa
  if (item.fillings === 'date') return '#612128'; // Deep burgundy undertones
  return '#2C160F'; // Dark Cocoa default
};

// Box configuration action functions
const changeBoxSize = (newSize) => {
  boxSize.value = newSize;
  selectedBoxGrid.value = Array(newSize).fill(null);
};

const openPieceSelector = (slotIndex) => {
  activeSlotIndex.value = slotIndex;
  activeLetter.value = selectedBoxGrid.value[slotIndex]?.letter || '';
};

const selectPiece = (item) => {
  if (activeSlotIndex.value === null) return;
  
  selectedBoxGrid.value[activeSlotIndex.value] = {
    ...item,
    letter: activeLetter.value ? activeLetter.value.toUpperCase() : ''
  };
  
  activeSlotIndex.value = null;
  activeLetter.value = '';
};

const autofillBox = () => {
  const items = chocolateProducts.value;
  for (let i = 0; i < boxSize.value; i++) {
    if (!selectedBoxGrid.value[i]) {
      const randItem = items[Math.floor(Math.random() * items.length)];
      selectedBoxGrid.value[i] = { ...randItem, letter: '' };
    }
  }
};

const clearBox = () => {
  selectedBoxGrid.value = Array(boxSize.value).fill(null);
};

// Cart action integration
const addBoxToCart = () => {
  if (selectedCount.value === 0) return;
  
  const boxTitle = `Customised ${boxSize.value}-Piece Chocolate Box`;
  const itemsSummary = selectedBoxGrid.value
    .filter(item => item !== null)
    .map(item => ({ id: item.id, name: item.name, letter: item.letter || null, fillings: item.fillings }));
  
  const customDetails = {
    size: boxSize.value,
    color: themeOptions.find(t => t.name === boxColor.value).label,
    ribbon: ribbonColor.value,
    giftMessage: giftMessage.value,
    items: itemsSummary
  };

  cart.value.push({
    id: `custom-${Date.now()}`,
    name: boxTitle,
    price: totalBoxPrice.value,
    image: '/images/chocolate_box.png',
    quantity: 1,
    type: 'custom',
    customDetails
  });

  // Reset customizer
  clearBox();
  giftMessage.value = '';
  isCartOpen.value = true;
};

// Price formatting helper
const formatPrice = (value) => {
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
</script>

