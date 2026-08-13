<template>
  <div class="space-y-24 md:space-y-36 pb-24 overflow-hidden relative">
    
    <!-- Floating background decorative elements -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <!-- Swirling background gold blur particles -->
      <div class="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-brand-gold/5 blur-[80px] animate-pulse"></div>
      <div class="absolute top-[40%] right-[10%] w-96 h-96 rounded-full bg-brand-burgundy/5 blur-[120px]"></div>
      <div class="absolute top-[70%] left-[15%] w-80 h-80 rounded-full bg-brand-caramel/5 blur-[90px] animate-pulse"></div>
    </div>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-6 2xl:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 items-center min-h-[calc(100vh-8rem)] relative z-10">
      <!-- Hero Copy -->
      <div class="lg:col-span-6 space-y-8 text-left animate-fade-in">
        <span class="text-xs font-sans tracking-[0.3em] text-brand-caramel uppercase font-bold flex items-center space-x-2">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
          <span>A luxury gifting experience</span>
        </span>
        <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-brand-cocoa-dark leading-[1.05] font-bold">
          Beautifully Crafted.<br />Thoughtfully Gifted.
        </h1>
        <p class="font-sans text-sm md:text-base text-brand-text/80 leading-relaxed max-w-lg">
          Handcrafted chocolates made with carefully selected ingredients, designed to celebrate the moments that matter most.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <NuxtLink to="/custom-box" class="px-8 py-4 rounded-full text-xs tracking-widest font-semibold btn-luxury-cocoa text-center uppercase shadow-md hover:scale-[1.02] transition-transform duration-300">
            Create Your Gift Box
          </NuxtLink>
          <a href="#collections" class="px-8 py-4 rounded-full text-xs tracking-widest font-semibold btn-luxury-gold text-center uppercase hover:scale-[1.02] transition-transform duration-300">
            Explore Selections
          </a>
        </div>
      </div>

      <!-- Hero Cinematic Packaging Image -->
      <div class="lg:col-span-6 relative h-112.5 md:h-137.5 w-full rounded-3xl overflow-hidden shadow-2xl group border border-brand-gold/15 bg-brand-cream/40 flex items-center justify-center p-2">
        <img 
          src="/images/luxury_dark_chocolates.png" 
          alt="Luxury Cocora Gift Box" 
          class="w-full h-full object-cover rounded-[18px] transition-all duration-1000 group-hover:scale-103"
          fetchpriority="high"
          decoding="sync"
        />
        <div class="absolute inset-0 bg-linear-to-t from-brand-cocoa-dark/20 via-transparent to-transparent pointer-events-none"></div>
      </div>
    </section>

    <!-- Brand Story / Heritage Segment -->
    <section id="story" class="max-w-4xl mx-auto px-6 text-center space-y-8 scroll-mt-24 relative z-10">
      <span class="text-xs font-sans tracking-[0.25em] text-brand-gold uppercase font-bold">HERITAGE & BELIEF</span>
      <h2 class="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-brand-cocoa-dark italic leading-snug">"Our journey began with one simple belief: that chocolate is not merely a confection, but a bridge of affection."</h2>
      <div class="w-16 h-px bg-brand-gold mx-auto"></div>
      <p class="font-sans text-xs md:text-sm text-brand-text/75 leading-relaxed max-w-2xl mx-auto">
        Every truffle we mold, every ribbon we hand-tie, and every message card we write is crafted with strict devotion. We combine imported Belgian cocoa with local treasures—emerald pistachios from the orchards and honeyed dates from the groves—to elevate your celebrations into enduring memories.
      </p>
    </section>

    <!-- Featured Categories -->
    <section class="max-w-7xl mx-auto px-4 md:px-6 2xl:px-8 space-y-10 md:space-y-12 relative z-10">
      <div class="text-center space-y-3">
        <span class="text-[10px] tracking-[0.3em] text-brand-gold uppercase font-bold">THE FLAVORS</span>
        <h2 class="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-brand-cocoa-dark font-bold leading-snug">Explore Our Ingredients</h2>
        <div class="w-12 h-px bg-brand-gold mx-auto mt-4"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
        <div 
          v-for="cat in featuredCategories" 
          :key="cat.slug"
          class="card-luxury p-6 flex flex-col items-center text-center space-y-4 group border border-brand-gold/5 relative overflow-hidden"
        >
          <!-- Hover image zoom -->
          <div class="w-full aspect-square rounded-xl overflow-hidden border border-brand-gold/10 bg-brand-bg flex items-center justify-center relative">
            <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
          </div>
          <div>
            <h3 class="font-serif text-base text-brand-cocoa-dark font-bold tracking-wide">{{ cat.name }}</h3>
            <p class="text-xs text-brand-text/60 mt-1 line-clamp-2 leading-relaxed font-sans">{{ cat.desc }}</p>
          </div>
          <NuxtLink :to="`/custom-box?filter=${cat.slug}`" class="text-[10px] tracking-widest text-brand-gold uppercase hover:text-brand-cocoa-dark transition-colors duration-300 font-bold border-b border-brand-gold/20 hover:border-brand-cocoa-dark pb-0.5">
            Select Filling &rarr;
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Personalization Step-by-Step Gifting Journey -->
    <section class="bg-brand-cocoa-dark text-brand-cream border-y border-brand-gold/25 py-16 md:py-24 px-4 md:px-6 relative z-10">
      <div class="max-w-7xl mx-auto space-y-16">
        <div class="text-center space-y-4 max-w-xl mx-auto">
          <span class="text-xs font-sans tracking-[0.25em] text-brand-gold uppercase font-bold">THE CREATIVE JOURNEY</span>
          <h2 class="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-brand-cream font-bold leading-snug">How to Create Your Memorable Gift</h2>
          <p class="font-sans text-xs text-brand-cream/70 leading-relaxed">
            We don't just package chocolates. We invite you to express your love, congratulations, or gratitude through a personalized curation process.
          </p>
        </div>

        <!-- The Journey Roadmap -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 relative">
          <div v-for="(step, idx) in journeySteps" :key="idx" class="flex flex-col items-center text-center space-y-4 relative">
            <!-- Step index circle -->
            <div class="w-12 h-12 rounded-full border border-brand-gold flex items-center justify-center bg-brand-cocoa-light text-brand-gold font-serif font-bold text-sm shadow-md">
              {{ idx + 1 }}
            </div>
            
            <div class="space-y-1">
              <h4 class="font-serif text-sm font-semibold text-brand-cream tracking-wide">{{ step.title }}</h4>
              <p class="text-[11px] text-brand-cream/60 leading-relaxed font-sans">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <div class="text-center pt-8">
          <NuxtLink to="/custom-box" class="inline-flex px-10 py-4 rounded-full text-xs tracking-widest font-bold btn-luxury-gold uppercase shadow-lg">
            Start Designing
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Occasions Section with Gold Illustration SVGs -->
    <section id="occasions" class="max-w-7xl mx-auto px-4 md:px-6 2xl:px-8 space-y-10 md:space-y-12 scroll-mt-24 relative z-10">
      <div class="text-center space-y-3">
        <span class="text-[10px] tracking-[0.3em] text-brand-gold uppercase font-bold">THE CELEBRATIONS</span>
        <h2 class="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-brand-cocoa-dark font-bold leading-snug">Perfect For Every Occasion</h2>
        <div class="w-12 h-px bg-brand-gold mx-auto mt-4"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div 
          v-for="occ in occasionsList" 
          :key="occ.name" 
          class="group relative h-80 rounded-[20px] overflow-hidden shadow-md cursor-pointer border border-brand-gold/10"
        >
          <div class="absolute inset-0 bg-brand-cocoa-dark/50 group-hover:bg-brand-cocoa-dark/60 transition-colors duration-500 z-10"></div>
          <img :src="occ.image" :alt="occ.name" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103" loading="lazy" decoding="async" />
          
          <div class="absolute inset-0 z-20 flex flex-col justify-between p-6">
            <!-- Occasion Gold SVG representation -->
            <div class="w-10 h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold border border-brand-gold/25 self-end">
              <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current" v-html="occ.svgIcon"></svg>
            </div>
            
            <div class="space-y-2 text-left">
              <h3 class="font-serif text-lg text-brand-cream font-bold tracking-wide">{{ occ.name }}</h3>
              <p class="text-xs text-brand-cream/80 line-clamp-2 leading-relaxed font-sans font-light">{{ occ.desc }}</p>
              <NuxtLink to="/custom-box" class="inline-block text-[10px] tracking-widest text-brand-gold uppercase font-bold pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Design Gift Box &rarr;
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Limited Summer Collection Segment -->
    <section class="max-w-7xl mx-auto px-4 md:px-6 2xl:px-8 relative z-10">
      <div class="bg-brand-cream border border-brand-gold/20 rounded-3xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Text details -->
        <div class="lg:col-span-7 space-y-6 text-left">
          <span class="px-3 py-1 bg-brand-burgundy text-brand-cream text-[10px] font-bold rounded-full tracking-widest uppercase inline-block">LIMITED EDITION</span>
          <h2 class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-cocoa-dark leading-snug font-bold">
            The Summer Pistachio Collection
          </h2>
          <p class="font-sans text-xs md:text-sm text-brand-text/75 leading-relaxed">
            Crafted exclusively for the warm season. We select early harvest emerald-green pistachios, stone-grind them over 24 hours, and encapsulate them in a premium white chocolate shell dusted with edible gold flakes.
          </p>
          <div class="flex items-center space-x-6 text-xs text-brand-caramel font-semibold uppercase tracking-wider font-sans">
            <span>AVAILABLE UNTIL AUGUST 31ST</span>
            <span>•</span>
            <span>ONLY 500 BOXES CAST</span>
          </div>
          <div class="pt-2">
            <button 
              @click="addLimitedToCart"
              class="px-8 py-4 rounded-full text-xs tracking-widest font-semibold btn-luxury-cocoa uppercase shadow-md"
            >
              Secure Summer Gift Box
            </button>
          </div>
        </div>

        <!-- Packaging visual -->
        <div class="lg:col-span-5 relative h-72 md:h-80 w-full rounded-2xl overflow-hidden border border-brand-gold/15 shadow-xl">
          <img src="/images/category_pistachio.png" alt="Summer Pistachio Box" class="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>

    <!-- Signature Collections (Premium named collections) -->
    <section id="collections" class="max-w-7xl mx-auto px-4 md:px-6 2xl:px-8 space-y-10 md:space-y-12 scroll-mt-24 relative z-10">
      <div class="text-center space-y-3">
        <span class="text-[10px] tracking-[0.3em] text-brand-gold uppercase font-bold">THE SELECTIONS</span>
        <h2 class="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-brand-cocoa-dark font-bold leading-snug">Featured Signature Collections</h2>
        <div class="w-12 h-px bg-brand-gold mx-auto mt-4"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
        <div 
          v-for="item in collectionsList" 
          :key="item.id" 
          class="card-luxury p-5 flex flex-col justify-between border border-brand-gold/10 relative group"
        >
          <div class="space-y-4">
            <div class="h-52 w-full bg-brand-cream rounded-xl overflow-hidden border border-brand-gold/5 flex items-center justify-center relative">
              <img :src="item.slug === 'the-royal-gifting-array' ? '/images/cocora_box_25_piece.png' : item.slug === 'celebration-no-8' ? '/images/cocora_box_16_piece.png' : item.slug === 'the-signature-box' ? '/images/cocora_box_9_piece.png' : item.imageUrl" :alt="item.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="lazy" decoding="async" />
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] tracking-wider text-brand-caramel uppercase font-bold">{{ item.pieces }} PIECES</span>
                <span v-if="item.occasion" class="text-[9px] px-2 py-0.5 bg-brand-gold/15 text-brand-cocoa-dark rounded-full uppercase font-medium tracking-wide">
                  {{ item.occasion }}
                </span>
              </div>
              <h3 class="font-serif text-base text-brand-cocoa-dark font-bold line-clamp-1 group-hover:text-brand-gold transition-colors duration-300">{{ item.name }}</h3>
              <p class="text-xs text-brand-text/60 line-clamp-2 leading-relaxed font-sans">{{ item.description }}</p>
            </div>
          </div>

          <div class="pt-6 flex items-center justify-between border-t border-brand-gold/10 mt-6">
            <span class="font-serif font-bold text-brand-cocoa-dark text-sm">{{ formatPrice(item.price) }}</span>
            <button 
              @click="addToCart(item)"
              class="px-4 py-2 rounded-full text-[10px] tracking-wider font-semibold btn-luxury-gold uppercase"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Ingredients Apple-Style Editorial Layout -->
    <section id="ingredients" class="bg-brand-cream border-y border-brand-gold/10 py-16 md:py-24 relative z-10">
      <div class="max-w-7xl mx-auto px-4 md:px-6 2xl:px-8 space-y-16 md:space-y-24">
        
        <div class="text-center space-y-3 max-w-xl mx-auto">
          <span class="text-[10px] tracking-[0.3em] text-brand-gold uppercase font-bold">NO PLACE FOR PLACEHOLDERS</span>
          <h2 class="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-brand-cocoa-dark font-bold leading-snug">Uncompromising Quality</h2>
          <p class="font-sans text-xs text-brand-text/60 leading-relaxed">
            Every element of a Cocora chocolate is selected for its sensory richness. We believe in visual beauty and clean, organic craftsmanship.
          </p>
        </div>

        <!-- Ingredient Row 1: Pistachios -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-5 space-y-6 text-left order-2 lg:order-1">
            <span class="text-xs font-sans tracking-[0.2em] text-brand-gold uppercase font-semibold">STONE GROUND</span>
            <h3 class="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-cocoa-dark font-bold leading-snug">Premium Emerald Pistachios</h3>
            <p class="font-sans text-xs md:text-sm text-brand-text/80 leading-relaxed">
              Harvested at their vibrant green peak and stone-ground over 24 hours to create an incredibly silky, intensely flavored praline filling that melts like butter on the tongue.
            </p>
          </div>
          <div class="lg:col-span-7 order-1 lg:order-2 h-80 rounded-2xl overflow-hidden border border-brand-gold/10 shadow-lg">
            <img src="/images/category_pistachio.png" alt="Premium Green Pistachios" class="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-700" loading="lazy" decoding="async" />
          </div>
        </div>

        <!-- Ingredient Row 2: Cacao -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7 h-80 rounded-2xl overflow-hidden border border-brand-gold/10 shadow-lg">
            <img src="/images/category_almond.png" alt="Belgian Cocoa Bean" class="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-700" loading="lazy" decoding="async" />
          </div>
          <div class="lg:col-span-5 space-y-6 text-left">
            <span class="text-xs font-sans tracking-[0.2em] text-brand-gold uppercase font-semibold">BELGIAN SOURCING</span>
            <h3 class="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-cocoa-dark font-bold leading-snug">Artisanal Dark Belgian Cocoa</h3>
            <p class="font-sans text-xs md:text-sm text-brand-text/80 leading-relaxed">
              Our dark chocolate is carefully balanced at 72% single-origin cacao solids, resulting in rich roasted notes with subtle fruit and woody undertones.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- Packaging Showcase -->
    <section class="max-w-7xl mx-auto px-6 2xl:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
      <div class="lg:col-span-5 space-y-6 text-left">
        <span class="text-xs font-sans tracking-[0.25em] text-brand-caramel uppercase font-semibold">THE ART OF UNWRAPPING</span>
        <h2 class="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-cocoa-dark font-bold leading-snug">
          Exquisite Packaging Worth Keeping
        </h2>
        <p class="font-sans text-xs md:text-sm text-brand-text/75 leading-relaxed">
          People buy presentation. Every box sleeve is crafted on heavyweight textured cardstock, stamped with custom gold foils, wrapped in hand-tied silk ribbon, and delivered in pristine temperature-insulated carry bags.
        </p>
        <ul class="space-y-3 font-sans text-xs text-brand-cocoa-dark/80">
          <li class="flex items-center space-x-3">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
            <span>Premium gold embossed gift sleeve options</span>
          </li>
          <li class="flex items-center space-x-3">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
            <span>Luxurious hand-tied satin ribbons</span>
          </li>
          <li class="flex items-center space-x-3">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
            <span>Handwritten calligraphy greetings card</span>
          </li>
        </ul>
      </div>

      <div class="lg:col-span-7 relative h-96 w-full rounded-2xl overflow-hidden border border-brand-gold/15 shadow-xl">
        <img src="/images/hero_gift_box.png" alt="Boutique custom wrapping and cards" class="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
    </section>

    <!-- Craftsmanship timeline -->
    <section class="bg-brand-bg py-12 relative z-10">
      <div class="max-w-7xl mx-auto px-6 space-y-12">
        <div class="text-center space-y-3">
          <span class="text-[10px] tracking-[0.3em] text-brand-gold uppercase font-bold">THE TIMELINE</span>
          <h2 class="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-cocoa-dark font-bold leading-snug">Our Craftsmanship Process</h2>
          <div class="w-12 h-px bg-brand-gold mx-auto mt-4"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(proc, index) in craftProcess" :key="index" class="p-6 bg-brand-cream border border-brand-gold/5 rounded-2xl space-y-4">
            <span class="font-serif text-2xl text-brand-gold/45 block">Step 0{{ index + 1 }}</span>
            <h4 class="font-serif text-sm font-semibold text-brand-cocoa-dark">{{ proc.title }}</h4>
            <p class="text-[11px] text-brand-text/60 leading-relaxed font-sans">{{ proc.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dedicated Corporate Gifting Segment -->
    <section id="corporate" class="max-w-7xl mx-auto px-6 scroll-mt-24 relative z-10">
      <div class="bg-brand-cocoa-dark border border-brand-gold/20 rounded-3xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-brand-cream">
        <div class="lg:col-span-5 relative h-72 md:h-80 w-full rounded-2xl overflow-hidden border border-brand-gold/15 shadow-xl order-2 lg:order-1">
          <img src="/images/hero_gift_box.png" alt="Corporate Gifting Custom Packaging" class="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>

        <div class="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
          <span class="text-xs font-sans tracking-[0.25em] text-brand-gold uppercase font-bold">BESPOKE SERVICES</span>
          <h2 class="font-serif text-2xl sm:text-3xl md:text-5xl text-brand-cream leading-snug font-bold">
            Corporate Gifting & Custom Milestones
          </h2>
          <p class="font-sans text-xs md:text-sm text-brand-cream/70 leading-relaxed">
            Represent your company with the ultimate gesture of appreciation. We design customized box sleeves displaying your logo, coordinates custom cards, and arranges multi-city temperature courier distribution. Ideal for corporate Eid gifts, client thanks, weddings, and high-end VIP packages.
          </p>
          <div class="pt-2 flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/923000000000?text=Greetings%20Cocora%20Concierge!%20I%20would%20like%20to%20inquire%20about%20corporate%20gifting%20options."
              target="_blank" 
              class="px-8 py-3.5 rounded-full text-xs tracking-widest font-semibold bg-brand-success text-brand-cream hover:bg-brand-success/90 uppercase text-center flex items-center justify-center shadow"
            >
              Discuss with Concierge
            </a>
            <a href="mailto:corporate@cocora.com" class="px-8 py-3.5 rounded-full text-xs tracking-widest font-semibold btn-luxury-gold uppercase text-center">
              Request Brochure
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials with Customer Gift Photos representation -->
    <section class="bg-brand-cream border-y border-brand-gold/10 py-20 px-6 relative z-10">
      <div class="max-w-7xl mx-auto space-y-12">
        <div class="text-center space-y-3">
          <span class="text-[10px] tracking-[0.3em] text-brand-gold uppercase font-bold">CLIENT HEARTS</span>
          <h2 class="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-cocoa-dark font-bold leading-snug">Endorsements</h2>
          <div class="w-12 h-px bg-brand-gold mx-auto mt-4"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="t in testimonials" :key="t.author" class="card-luxury p-8 flex flex-col justify-between space-y-6 border border-brand-gold/5 bg-brand-bg">
            <p class="font-accent text-base md:text-lg italic text-brand-cocoa-dark/90 leading-relaxed">
              "{{ t.text }}"
            </p>
            <div class="flex items-center space-x-3 pt-4 border-t border-brand-gold/10">
              <span class="w-8 h-8 rounded-full bg-brand-gold/30 text-brand-cocoa-dark flex items-center justify-center font-bold text-xs uppercase">{{ t.author[0] }}</span>
              <div>
                <h4 class="font-serif text-xs font-bold text-brand-cocoa-dark uppercase tracking-wider">{{ t.author }}</h4>
                <p class="text-[10px] text-brand-text/50 font-sans tracking-wide">{{ t.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section id="faq" class="max-w-3xl mx-auto px-6 space-y-12 scroll-mt-24 relative z-10">
      <div class="text-center space-y-3">
        <span class="text-[10px] tracking-[0.3em] text-brand-gold uppercase font-bold">FREQUENT INQUIRIES</span>
        <h2 class="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-cocoa-dark font-bold leading-snug">Frequently Asked Questions</h2>
        <div class="w-12 h-px bg-brand-gold mx-auto mt-4"></div>
      </div>

      <div class="space-y-4">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="border-b border-brand-gold/20 pb-4"
        >
          <button 
            @click="activeFaqIndex = activeFaqIndex === index ? null : index"
            class="w-full flex justify-between items-center text-left py-2 font-serif text-brand-cocoa-dark font-semibold text-sm md:text-base hover:text-brand-gold transition-colors duration-300"
          >
            <span>{{ faq.q }}</span>
            <span class="text-brand-gold ml-4 font-normal text-lg">{{ activeFaqIndex === index ? '−' : '+' }}</span>
          </button>
          
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-40"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 max-h-40"
            leave-to-class="opacity-0 max-h-0"
          >
            <div 
              v-if="activeFaqIndex === index" 
              class="mt-2 text-xs md:text-sm text-brand-text/80 leading-relaxed font-sans pr-6 overflow-hidden"
            >
              {{ faq.a }}
            </div>
          </transition>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>

// SEO Title and Meta description
useHead({
  title: 'Cocora Delights | Luxury Handcrafted Chocolate Gifting Brand',
  meta: [
    { name: 'description', content: 'Design world-class luxury custom chocolate gift boxes for Eid, Ramadan, weddings, and anniversaries. Handcrafted with Belgian cocoa, organic dates, and roasted pistachios.' }
  ]
});

// Shared state references
const cart = useState('cocora-cart');
const isCartOpen = useState('cocora-cart-open');

// UI Local states
const activeFaqIndex = ref(null);
const signatureCollectionsFromAPI = ref([]);

// Fetch signature collections from D1 backend
onMounted(async () => {
  try {
    const baseUrl = useApiBase();
    const res = await fetch(baseUrl + '/api/signature-collections');
    const json = await res.json();
    if (json.success && json.data.length > 0) {
      signatureCollectionsFromAPI.value = json.data;
    }
  } catch (err) {
    console.warn('API down, using fallback collections.', err);
  }
});

// Fallback collections with premium branding names
const fallbackCollections = [
  { id: 1, name: 'Celebration No. 8', slug: 'celebration-no-8', description: 'A regal 16-piece collection packaged in a warm ivory embossed box with a deep forest green velvet ribbon.', price: 4500, imageUrl: '/images/hero_gift_box.png', pieces: 16, occasion: 'EID' },
  { id: 2, name: 'The Royal Gifting Array', slug: 'the-royal-gifting-array', description: 'An opulent 25-piece assortment presented in a multi-tiered cream lacquer box with champagne gold foiling.', price: 8500, imageUrl: '/images/hero_gift_box.png', pieces: 25, occasion: 'WEDDING' },
  { id: 3, name: 'The Signature Box', slug: 'the-signature-box', description: 'A minimalist 9-piece box crafted for personal moments and sophisticated thank-you gestures.', price: 2800, imageUrl: '/images/chocolate_box.png', pieces: 9, occasion: 'ANNIVERSARY' },
  { id: 4, name: 'Midnight Pistachio Selection', slug: 'midnight-pistachio-selection', description: 'A 16-piece geometric copper-engraved box celebrating local heritage. Highlights dates stuffed with roasted nuts.', price: 4200, imageUrl: '/images/category_pistachio.png', pieces: 16, occasion: 'RAMADAN' }
];

const collectionsList = computed(() => {
  return signatureCollectionsFromAPI.value.length > 0 
    ? signatureCollectionsFromAPI.value 
    : fallbackCollections;
});

// Cart helper methods
const addToCart = (item) => {
  const existingIdx = cart.value.findIndex(c => c.id === `sig-${item.id}`);
  if (existingIdx > -1) {
    cart.value[existingIdx].quantity += 1;
  } else {
    cart.value.push({
      id: `sig-${item.id}`,
      name: item.name,
      price: item.price,
      image: item.imageUrl || '/images/hero_gift_box.png',
      quantity: 1,
      type: 'signature',
      pieces: item.pieces
    });
  }
  isCartOpen.value = true;
};

const addLimitedToCart = () => {
  const existingIdx = cart.value.findIndex(c => c.id === 'limited-pistachio');
  if (existingIdx > -1) {
    cart.value[existingIdx].quantity += 1;
  } else {
    cart.value.push({
      id: 'limited-pistachio',
      name: 'Summer Pistachio Collection (Limited)',
      price: 4800,
      image: '/images/category_pistachio.png',
      quantity: 1,
      type: 'signature',
      pieces: 16
    });
  }
  isCartOpen.value = true;
};

// Pricing formatting
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

// Static Site Redesign Data
const featuredCategories = [
  { name: 'Raspberry Ganache Heart', slug: 'raspberry-heart', desc: 'Velvety raspberry ganache in a heart shape, with rose petals.', image: '/images/dark_heart_chocolate.png' },
  { name: 'Sea Salt Cocoa Cube', slug: 'sea-salt-cube', desc: '80% single-origin cacao cube with sea salt flakes.', image: '/images/dark_cube_chocolate.png' },
  { name: 'Hazelnut Caramel Rectangle', slug: 'hazelnut-rectangle', desc: 'Sleek rectangle with rich hazelnut and gold caramel.', image: '/images/dark_rectangle_chocolate.png' },
  { name: 'Gold Leaf Dark Bar', slug: 'gold-leaf-bar', desc: 'Artfully fractured dark bar shimmering with gold.', image: '/images/dark_fractured_bar.png' },
  { name: 'Yuzu Citrus Jewel', slug: 'yuzu-jewel', desc: 'Faceted chocolate jewel, hiding a yuzu citrus center.', image: '/images/dark_yuzu_jewel.png' }
];

const journeySteps = [
  { title: 'Box Dimensions', desc: 'Select a luxury warm ivory box in sizes of 9, 16, or 25 pieces.' },
  { title: 'Artisanal Shapes', desc: 'Choose between hearts, cubes, mini bars, and letter blocks.' },
  { title: 'Regional Fillings', desc: 'Infuse roasted almond rocher, pistachio praline, or cardamom date.' },
  { title: 'Gold Calligraphy', desc: 'Type initials to emboss in champagne gold ink on chocolate pieces.' },
  { title: 'Greetings Card', desc: 'Add hand-tied silk ribbons and a personalized greetings note.' },
  { title: 'Thermal Courier', desc: 'Delivered in climate-controlled transit straight to their door.' }
];

const occasionsList = [
  { name: 'Eid & Ramadan', desc: 'Stuffed Khalas dates and green cardamom creams wrapped in gold-embossed sleeves.', image: '/images/category_date.png', svgIcon: '<path d="M12 3a9 9 0 1 0 9 9 9.003 9.003 0 0 1-9-9zm0-2a11 11 0 1 1-11 11A11 11 0 0 1 12 1z"/>' }, // Crescent Moon
  { name: 'Weddings & Proposals', desc: 'Elegant multi-tiered white lacquer arrangements with calligraphic congratulations.', image: '/images/hero_gift_box.png', svgIcon: '<path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 4c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>' }, // Ring/Couple
  { name: 'Anniversaries & Love', desc: 'Intimate boxes featuring rose-water praline, velvet ribbon wraps, and dark chocolate hearts.', image: '/images/category_almond.png', svgIcon: '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>' }, // Heart
  { name: 'Corporate & Milestones', desc: 'Sleek custom-sleeved arrangements presenting bespoke brand prestige and coordination.', image: '/images/hero_gift_box.png', svgIcon: '<path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>' } // Briefcase
];

const craftProcess = [
  { title: 'Sourcing Harvests', desc: 'Selecting organic emerald pistachios, whole almonds, and honeyed dates from sustainable local orchards.' },
  { title: 'Hand-Molding Truffles', desc: 'Artisans mold cocoa shells in small batches daily, hand-infusing custom praline pastes.' },
  { title: 'Calligraphy Finishing', desc: 'Carefully embossing champagne gold initials and details onto customized chocolate cubes.' },
  { title: 'Bespoke Packaging', desc: 'Boxes are packed with custom dividers, hand-wrapped in satin ribbon, and added calligraphy greeting cards.' }
];

const testimonials = [
  { text: "We ordered Celebration No. 8 arrangements for our anniversary in Dubai. The cream lacquer box, silk ribbon, and personalized card message made it feel extremely premium. The date praline tasted fresh and luxurious.", author: "Amna Rehman", location: "Dubai, UAE" },
  { text: "My corporate clients in Riyadh were amazed by the customized gold foil box coordinates we ordered. Cocora's temperature-controlled courier delivered them in perfect condition. Exceptional service.", author: "Farhan Malik", location: "Riyadh, Saudi Arabia" },
  { text: "Crafting our own box was such an emotional experience. Spelled out MOM with the gold letter engravings for her birthday. It is not just chocolate; it's a piece of art.", author: "Zainab Yusuf", location: "Karachi, Pakistan" }
];

const faqs = [
  { q: "What makes Cocora packaging unique?", a: "Every Cocora chocolate box is crafted from thick textured paper stock, features gold foil accents, and is tied by hand with luxury satin ribbon. We print greetings cards using elegant calligraphy scripts on premium cardstock." },
  { q: "How is temperature-controlled shipping handled?", a: "We place all gift boxes in insulated thermal bags with cold gel ice bricks. Our courier partners deliver in air-conditioned vehicles, ensuring your chocolates remain perfectly solid and gorgeous upon arrival." },
  { q: "Can I coordinate custom corporate orders?", a: "Yes, absolutely. Under our bespoke corporate program, we can customize box sleeves with your company logo, print bespoke coordinates notes, and ship bulk deliveries to multiple addresses." },
  { q: "How long do the filled truffles last?", a: "Our chocolate truffles are freshly prepared and best enjoyed within 3 weeks of courier arrival. Chocolate-covered organic dates last up to 2 months when kept in dry, air-conditioned environments." }
];
</script>

