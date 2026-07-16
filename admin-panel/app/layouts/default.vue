<template>
  <div class="min-h-screen bg-brand-bg text-brand-cream font-sans flex flex-col md:flex-row">
    
    <!-- Mobile Header & Drawer Trigger -->
    <header class="md:hidden flex items-center justify-between p-4 border-b border-brand-gold/10 bg-brand-cocoa-dark">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 border border-brand-gold/30 rotate-45 flex items-center justify-center bg-brand-bg">
          <span class="font-serif text-sm text-brand-gold -rotate-45 block leading-none">C</span>
        </div>
        <span class="font-serif font-bold tracking-wide">Cocora Admin</span>
      </div>
      <button @click="isDrawerOpen = true" class="text-brand-gold p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </header>

    <!-- Slide-over Drawer for Mobile -->
    <USlideover v-model="isDrawerOpen" side="left" class="md:hidden">
      <div class="p-6 bg-brand-cocoa-dark h-full border-r border-brand-gold/10 flex flex-col">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 border border-brand-gold/30 rotate-45 flex items-center justify-center bg-brand-bg shadow-xl">
              <span class="font-serif text-lg text-brand-gold -rotate-45 block leading-none">C</span>
            </div>
            <div>
              <h1 class="font-serif font-bold text-lg leading-tight">Cocora</h1>
              <p class="text-[9px] uppercase tracking-widest text-brand-gold">Concierge</p>
            </div>
          </div>
          <button @click="isDrawerOpen = false" class="text-brand-cream/50">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>

        <nav class="space-y-2 grow">
          <NuxtLink to="/" class="flex items-center space-x-3 px-4 py-3 rounded-lg bg-brand-gold/10 text-brand-gold border border-brand-gold/20" @click="isDrawerOpen = false">
            <UIcon name="i-heroicons-inbox-stack" class="w-5 h-5" />
            <span class="text-sm font-semibold tracking-wide">Incoming Orders</span>
          </NuxtLink>
          <NuxtLink to="#" class="flex items-center space-x-3 px-4 py-3 rounded-lg text-brand-cream/50 hover:bg-brand-bg/50 transition-colors pointer-events-none opacity-50" @click="isDrawerOpen = false">
            <UIcon name="i-heroicons-users" class="w-5 h-5" />
            <span class="text-sm font-semibold tracking-wide">Clients</span>
          </NuxtLink>
        </nav>

        <button @click="logout" class="mt-auto flex items-center space-x-3 px-4 py-3 text-brand-cream/50 hover:text-brand-cream transition-colors uppercase text-[10px] tracking-widest font-bold border-t border-brand-gold/10 pt-6">
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4" />
          <span>Secure Sign Out</span>
        </button>
      </div>
    </USlideover>

    <!-- Desktop Sidebar -->
    <aside class="hidden md:flex flex-col w-64 border-r border-brand-gold/10 bg-brand-cocoa-dark h-screen sticky top-0 shrink-0">
      <div class="p-8 border-b border-brand-gold/5 flex flex-col items-center text-center">
        <div class="w-12 h-12 border border-brand-gold/30 rotate-45 flex items-center justify-center bg-brand-bg shadow-2xl mb-6">
          <span class="font-serif text-xl text-brand-gold -rotate-45 block leading-none">C</span>
        </div>
        <h1 class="font-serif font-bold text-xl text-brand-cream tracking-wide">Cocora</h1>
        <p class="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold mt-1">Concierge Portal</p>
      </div>

      <nav class="p-4 space-y-2 grow">
        <NuxtLink to="/" class="flex items-center space-x-3 px-4 py-3 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20 shadow-inner">
          <UIcon name="i-heroicons-inbox-stack" class="w-5 h-5" />
          <span class="text-sm font-semibold tracking-wide">Incoming Orders</span>
        </NuxtLink>
        <NuxtLink to="#" class="flex items-center space-x-3 px-4 py-3 rounded-xl text-brand-cream/50 hover:bg-brand-bg hover:text-brand-cream transition-all duration-300 pointer-events-none opacity-50">
          <UIcon name="i-heroicons-users" class="w-5 h-5" />
          <span class="text-sm font-semibold tracking-wide">Clientele Book</span>
        </NuxtLink>
      </nav>

      <div class="p-6 border-t border-brand-gold/5 bg-brand-bg/20">
        <button @click="logout" class="w-full flex justify-center items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-brand-cream/40 hover:text-brand-gold transition-colors duration-300">
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4" />
          <span>Secure Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="grow p-6 md:p-12 overflow-x-hidden">
      <slot />
    </main>
  </div>
</template>

<script setup>
const isDrawerOpen = ref(false)

const logout = () => {
  const token = useCookie('admin_token')
  token.value = null
  navigateTo('/login')
}
</script>
