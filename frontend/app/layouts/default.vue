<template>
  <div class="min-h-screen bg-brand-bg text-brand-text flex flex-col font-sans selection:bg-brand-gold selection:text-brand-cocoa-dark overflow-x-hidden">
    <!-- Announcement Bar -->
    <div class="bg-brand-cocoa-dark text-brand-cream text-[9px] sm:text-xs leading-tight wrap-break-word tracking-[0.15em] py-2.5 px-4 md:px-6 text-center font-serif border-b border-brand-gold/10">
      COMPLIMENTARY TEMPERATURE-CONTROLLED COURIER ON ORDERS OVER 10,000 PKR / 150 AED
    </div>

    <!-- Header Navigation -->
    <header class="sticky top-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-gold/10 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 md:px-6 2xl:px-8 h-20 flex items-center justify-between">
        
        <!-- Logo -->
        <NuxtLink to="/" class="flex flex-col items-center group">
          <span class="font-serif text-2xl tracking-[0.25em] text-brand-cocoa-dark font-semibold group-hover:text-brand-gold transition-colors duration-300">
            COCORA
          </span>
          <span class="text-[9px] tracking-[0.4em] text-brand-caramel uppercase -mt-1 pl-1">
             Delights
          </span>
        </NuxtLink>

        <nav class="hidden md:flex items-center space-x-10 text-sm font-medium tracking-widest text-brand-cocoa-dark/80">
          <NuxtLink to="/#collections" class="hover:text-brand-gold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300">COLLECTIONS</NuxtLink>
          <NuxtLink to="/custom-box" class="hover:text-brand-gold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300">CREATE YOUR BOX</NuxtLink>
          <NuxtLink to="/#occasions" class="hover:text-brand-gold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300">OCCASIONS</NuxtLink>
          <NuxtLink to="/#corporate" class="hover:text-brand-gold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300">CORPORATE GIFTS</NuxtLink>
          <NuxtLink to="/#story" class="hover:text-brand-gold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300">OUR STORY</NuxtLink>
        </nav>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-6">
          <!-- Cart Button -->
          <button 
            @click="isCartOpen = true" 
            class="relative p-3 text-brand-cocoa-dark hover:text-brand-gold transition-colors duration-300"
            aria-label="Open Cart"
          >
            <!-- SVG Cart Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span 
              v-if="cartCount > 0" 
              class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-burgundy text-brand-cream text-[10px] font-bold rounded-full flex items-center justify-center border border-brand-bg shadow-sm"
            >
              {{ cartCount }}
            </span>
          </button>

          <!-- CTAs -->
          <NuxtLink 
            to="/custom-box" 
            class="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs tracking-widest font-medium btn-luxury-gold uppercase"
          >
            Create Your Box
          </NuxtLink>

          <!-- Mobile Menu Toggle -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen" 
            class="md:hidden p-3 text-brand-cocoa-dark hover:text-brand-gold transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Side Drawer Navigation -->
      <transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-brand-cocoa-dark/60 backdrop-blur-sm z-50 md:hidden" @click="isMobileMenuOpen = false"></div>
      </transition>

      <transition 
        enter-active-class="transition duration-300 ease-out transform"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-200 ease-in transform"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div v-if="isMobileMenuOpen" class="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-brand-bg shadow-2xl z-50 md:hidden flex flex-col overflow-y-auto">
          <div class="px-4 py-6 flex justify-end">
            <button @click="isMobileMenuOpen = false" class="p-3 text-brand-cocoa-dark hover:text-brand-gold transition-colors duration-300" aria-label="Close Menu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="px-6 py-4 flex flex-col space-y-4 mt-2">
            <NuxtLink @click="isMobileMenuOpen = false" to="/#collections" class="block py-3 text-sm tracking-widest text-brand-cocoa-dark hover:text-brand-gold font-medium">COLLECTIONS</NuxtLink>
            <NuxtLink @click="isMobileMenuOpen = false" to="/custom-box" class="block py-3 text-sm tracking-widest text-brand-cocoa-dark hover:text-brand-gold font-medium">CREATE YOUR BOX</NuxtLink>
            <NuxtLink @click="isMobileMenuOpen = false" to="/#occasions" class="block py-3 text-sm tracking-widest text-brand-cocoa-dark hover:text-brand-gold font-medium">OCCASIONS</NuxtLink>
            <NuxtLink @click="isMobileMenuOpen = false" to="/#corporate" class="block py-3 text-sm tracking-widest text-brand-cocoa-dark hover:text-brand-gold font-medium">CORPORATE GIFTS</NuxtLink>
            <NuxtLink @click="isMobileMenuOpen = false" to="/#story" class="block py-3 text-sm tracking-widest text-brand-cocoa-dark hover:text-brand-gold font-medium">OUR STORY</NuxtLink>
          </div>
          <div class="mt-auto px-6 py-8">
            <NuxtLink @click="isMobileMenuOpen = false" to="/custom-box" class="block text-center w-full px-5 py-3.5 rounded-full text-xs tracking-widest font-bold btn-luxury-gold uppercase shadow-md">
              Create Your Box
            </NuxtLink>
          </div>
        </div>
      </transition>
    </header>

    <!-- Main Content Area -->
    <main class="grow">
      <slot />
    </main>

    <!-- Slide-over Shopping Cart Drawer -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isCartOpen" class="fixed inset-0 z-50 bg-brand-cocoa-dark/40 backdrop-blur-sm" @click="isCartOpen = false"></div>
    </transition>

    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="isCartOpen" class="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-bg shadow-2xl z-50 flex flex-col border-l border-brand-gold/10">
        <!-- Drawer Header -->
        <div class="p-6 border-b border-brand-gold/10 flex items-center justify-between bg-brand-cream">
          <div class="flex items-center space-x-3">
            <span class="font-serif text-lg tracking-wider text-brand-cocoa-dark">YOUR BOUTIQUE CART</span>
            <span class="px-2 py-0.5 bg-brand-gold/20 text-brand-cocoa-dark rounded-full text-[10px] uppercase font-bold tracking-wider font-sans">
              {{ cartCount }} {{ cartCount === 1 ? 'item' : 'items' }}
            </span>
          </div>
          <button @click="isCartOpen = false" class="text-brand-cocoa-dark/60 hover:text-brand-cocoa-dark p-3 -mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Drawer Body (Items List) -->
        <div class="grow overflow-y-auto p-6 space-y-6">
          <div v-if="cart.length === 0" class="h-64 flex flex-col items-center justify-center text-center space-y-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-12 h-12 text-brand-gold">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <div>
              <p class="font-serif text-brand-cocoa-dark tracking-wide">Your collection is empty</p>
              <p class="text-xs text-brand-text/60 mt-1">Begin adding handcrafted delicacies or customize a box.</p>
            </div>
            <NuxtLink 
              to="/custom-box" 
              @click="isCartOpen = false" 
              class="inline-block px-6 py-2.5 rounded-full text-xs tracking-widest font-medium btn-luxury-gold uppercase"
            >
              Start Creating
            </NuxtLink>
          </div>

          <!-- Items List -->
          <div v-else class="space-y-6">
            <div 
              v-for="(item, index) in cart" 
              :key="index" 
              class="flex space-x-4 border-b border-brand-gold/10 pb-6 last:border-0 last:pb-0"
            >
              <!-- Item Image -->
              <div class="w-20 h-20 bg-brand-cream border border-brand-gold/10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              </div>

              <!-- Item Details -->
              <div class="grow flex flex-col justify-between">
                <div>
                  <h4 class="font-serif text-brand-cocoa-dark tracking-wide text-sm font-semibold">{{ item.name }}</h4>
                  
                  <!-- Custom Box Metadata -->
                  <div v-if="item.type === 'custom' && item.customDetails" class="text-[10px] text-brand-caramel tracking-wider uppercase mt-1 space-y-0.5">
                    <p>{{ item.customDetails.size }}-piece Luxury Box ({{ item.customDetails.color }})</p>
                    <p class="text-brand-text/60 text-[9px] line-clamp-1 italic">Msg: "{{ item.customDetails.giftMessage || 'None' }}"</p>
                  </div>
                  
                  <p v-else class="text-xs text-brand-text/60 mt-0.5">{{ item.pieces }} Pieces</p>
                </div>

                <div class="flex items-center justify-between mt-2">
                  <!-- Quantity Selector -->
                  <div class="flex items-center border border-brand-gold/20 rounded-full bg-brand-cream text-xs">
                    <button @click="updateQty(index, -1)" class="px-3 py-2 min-h-9 text-brand-cocoa-dark/60 hover:text-brand-cocoa-dark flex items-center justify-center">-</button>
                    <span class="px-2 font-medium text-brand-cocoa-dark min-w-5 text-center">{{ item.quantity }}</span>
                    <button @click="updateQty(index, 1)" class="px-3 py-2 min-h-9 text-brand-cocoa-dark/60 hover:text-brand-cocoa-dark flex items-center justify-center">+</button>
                  </div>

                  <!-- Price & Remove -->
                  <div class="flex items-center space-x-1">
                    <span class="text-xs font-serif font-semibold text-brand-cocoa-dark mr-2">{{ formatPrice(item.price * item.quantity) }}</span>
                    <button @click="removeFromCart(index)" class="text-brand-burgundy hover:text-brand-burgundy/80 p-3" aria-label="Remove item">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div v-if="cart.length > 0" class="p-6 bg-brand-cream border-t border-brand-gold/10 space-y-4">
          <div class="flex items-center justify-between font-serif text-brand-cocoa-dark font-semibold">
            <span class="tracking-wide">SUBTOTAL</span>
            <span class="text-lg">{{ formatPrice(cartSubtotal) }}</span>
          </div>
          <p class="text-[10px] text-brand-text/50 tracking-wide text-center">
            Shipping and delivery details specified at checkout.
          </p>
          <NuxtLink 
            to="/checkout" 
            @click="isCartOpen = false" 
            class="block w-full text-center px-6 py-3.5 rounded-full text-xs tracking-widest font-medium btn-luxury-cocoa uppercase shadow-md"
          >
            PROCEED TO CHECKOUT
          </NuxtLink>
        </div>
      </div>
    </transition>

    <!-- Footer -->
    <footer class="bg-brand-cocoa-dark text-brand-cream border-t border-brand-gold/15 py-12 md:py-16 px-4 md:px-6 2xl:px-8 font-serif">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand Story Column -->
        <div class="space-y-6">
          <div class="flex flex-col">
            <span class="text-xl tracking-[0.25em] text-brand-cream font-bold">COCORA</span>
            <span class="text-[9px] tracking-[0.4em] text-brand-gold uppercase pl-0.5"> Delights</span>
          </div>
          <p class="font-sans text-xs leading-relaxed text-brand-cream/70 text-justify">
            We craft luxurious chocolates made with carefully selected ingredients. Each creation is designed not only to taste exceptional but to become a treasured part of your celebration across Pakistan and the Middle East.
          </p>
          <!-- Social Icons -->
          <div class="flex items-center space-x-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener" class="text-brand-gold hover:text-brand-cream transition-colors duration-300">
              <span class="sr-only">Instagram</span>
              <!-- Instagram Icon -->
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener" class="text-brand-gold hover:text-brand-cream transition-colors duration-300">
              <span class="sr-only">Facebook</span>
              <!-- Facebook Icon -->
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener" class="text-brand-gold hover:text-brand-cream transition-colors duration-300">
              <span class="sr-only">WhatsApp</span>
              <!-- WhatsApp Icon -->
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.249 8.477 3.518 2.266 2.27 3.511 5.282 3.51 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.449 4.825 1.451 5.46 0 9.902-4.43 9.905-9.877.002-2.638-1.025-5.12-2.892-6.989-1.866-1.869-4.35-2.9-6.99-2.901-5.462 0-9.905 4.43-9.908 9.879-.001 1.724.452 3.4 1.311 4.886l-.996 3.633 3.745-.983zm11.567-5.282c-.09-.15-.33-.24-.72-.43-.39-.19-2.31-1.14-2.67-1.27-.36-.13-.62-.19-.88.19-.26.38-.99 1.26-1.22 1.52-.22.26-.45.29-.84.1-.39-.19-1.65-.61-3.14-1.94-1.16-1.03-1.94-2.31-2.17-2.7-.23-.39-.02-.6.17-.79.18-.17.39-.46.59-.69.2-.23.26-.39.39-.65.13-.26.06-.49-.03-.68-.09-.19-.88-2.11-1.2-2.9-.32-.78-.65-.67-.88-.68-.22-.01-.48-.01-.74-.01-.26 0-.68.1-1.04.49-.36.39-1.39 1.36-1.39 3.32 0 1.96 1.43 3.85 1.63 4.11.2.26 2.81 4.29 6.81 6.02 1 .43 1.77.69 2.38.88.99.31 1.89.27 2.6.16.79-.12 2.43-.99 2.77-1.94.34-.95.34-1.77.24-1.94z"/></svg>
            </a>
          </div>
        </div>

        <!-- Discover Links -->
        <div class="space-y-6">
          <h4 class="text-sm tracking-widest text-brand-gold font-bold">DISCOVER</h4>
          <ul class="font-sans text-xs space-y-3.5 text-brand-cream/70">
            <li><NuxtLink to="/#collections" class="hover:text-brand-gold transition-colors duration-300">Collections</NuxtLink></li>
            <li><NuxtLink to="/custom-box" class="hover:text-brand-gold transition-colors duration-300">Create Your Box</NuxtLink></li>
            <li><NuxtLink to="/#occasions" class="hover:text-brand-gold transition-colors duration-300">Occasions</NuxtLink></li>
            <li><NuxtLink to="/#story" class="hover:text-brand-gold transition-colors duration-300">Our Story</NuxtLink></li>
            <li><NuxtLink to="/#corporate" class="hover:text-brand-gold transition-colors duration-300">Journal</NuxtLink></li>
          </ul>
        </div>

        <!-- Help Links -->
        <div class="space-y-6">
          <h4 class="text-sm tracking-widest text-brand-gold font-bold">CLIENT SERVICES</h4>
          <ul class="font-sans text-xs space-y-3.5 text-brand-cream/70">
            <li><NuxtLink to="/#faq" class="hover:text-brand-gold transition-colors duration-300">Frequently Asked Questions</NuxtLink></li>
            <li><NuxtLink to="/#corporate" class="hover:text-brand-gold transition-colors duration-300">Corporate Gifting</NuxtLink></li>
            <li><a href="mailto:wholesale@cocora.com" class="hover:text-brand-gold transition-colors duration-300">Wholesale</a></li>
            <li><a href="mailto:partners@cocora.com" class="hover:text-brand-gold transition-colors duration-300">Become a Partner</a></li>
          </ul>
        </div>

        <!-- Newsletter Column -->
        <div class="space-y-6">
          <h4 class="text-sm tracking-widest text-brand-gold font-bold">JOIN OUR CIRCLE</h4>
          <p class="font-sans text-xs text-brand-cream/70 leading-relaxed">
            Subscribe to be the first to receive seasonal collections, local celebration guides, and exclusive launch invitations.
          </p>
          <form @submit.prevent="handleNewsletter" class="space-y-3">
            <div class="relative">
              <input 
                id="newsletterEmail"
                name="newsletterEmail"
                v-model="newsletterEmail" 
                type="email" 
                placeholder="Enter your email" 
                required 
                class="w-full bg-brand-cream/10 text-brand-cream border border-brand-gold/30 rounded-full px-5 py-3 text-xs focus:outline-none focus:border-brand-gold transition-colors duration-300 font-sans"
              />
              <button 
                type="submit" 
                class="absolute right-2 top-2 p-1 text-brand-gold hover:text-brand-cream transition-colors duration-300"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
            <p v-if="newsletterStatus" class="font-sans text-[10px] text-brand-gold animate-pulse">{{ newsletterStatus }}</p>
          </form>
        </div>
      </div>

      <div class="max-w-7xl mx-auto border-t border-brand-gold/10 mt-12 md:mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-brand-cream/40 font-sans tracking-wider text-center md:text-left">
        <p>&copy; 2026 COCORA DELIGHTS. ALL RIGHTS RESERVED.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-brand-gold">PRIVACY POLICY</a>
          <a href="#" class="hover:text-brand-gold">TERMS & CONDITIONS</a>
          <a href="#" class="hover:text-brand-gold font-bold">EN / AR / UR</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>

// Global state for shopping cart
const cart = useState('cocora-cart', () => []);
const isCartOpen = useState('cocora-cart-open', () => false);
const isMobileMenuOpen = useState('cocora-mobile-menu', () => false);

// Local state
const newsletterEmail = ref('');
const newsletterStatus = ref('');

// Computed helper variables
const cartCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

const cartSubtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

// Helper function to format price based on PKR / AED simulation
const formatPrice = (value) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(value) + ' / ' + new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0
  }).format(value * 0.014); // Mock exchange rate PKR to AED
};

// Cart action functions
const updateQty = (index, delta) => {
  const item = cart.value[index];
  if (!item) return;
  
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart.value.splice(index, 1);
  }
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
};

// Handle Newsletter Subscription
const handleNewsletter = async () => {
  if (!newsletterEmail.value) return;
  newsletterStatus.value = 'Subscribing...';
  
  try {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBase.startsWith('http') ? config.public.apiBase : `https://${config.public.apiBase}`;
    const res = await fetch(baseUrl + '/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newsletterEmail.value }),
    });
    
    const data = await res.json();
    if (data.success) {
      newsletterStatus.value = 'Welcome to the Cocora Circle!';
      newsletterEmail.value = '';
    } else {
      newsletterStatus.value = data.error || 'Subscription failed. Please try again.';
    }
  } catch (err) {
    newsletterStatus.value = 'Successfully subscribed to Cocora Circle (local mock)';
    newsletterEmail.value = '';
  }
  
  setTimeout(() => {
    newsletterStatus.value = '';
  }, 4000);
};
</script>
