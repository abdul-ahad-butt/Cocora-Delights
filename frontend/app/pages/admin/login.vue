<template>
  <div class="min-h-screen bg-brand-cocoa-dark flex flex-col items-center justify-center p-6 text-brand-cream selection:bg-brand-gold selection:text-brand-cocoa-dark font-sans relative overflow-hidden">
    
    <!-- Background Accents -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-caramel/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="w-full max-w-md space-y-8 relative z-10">
      
      <!-- Logo Header -->
      <div class="text-center space-y-2">
        <NuxtLink to="/" class="inline-block hover:scale-105 transition-transform duration-300">
          <div class="w-16 h-16 border border-brand-gold/30 rotate-45 mx-auto flex items-center justify-center bg-brand-cocoa-dark shadow-2xl">
            <span class="font-serif text-2xl text-brand-gold -rotate-45 block leading-none">C</span>
          </div>
        </NuxtLink>
        <h2 class="mt-6 text-2xl font-serif tracking-wide text-brand-cream">Cocora Concierge</h2>
        <p class="text-xs tracking-[0.2em] text-brand-gold uppercase font-bold">Secure Access</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="mt-8 bg-brand-bg/5 backdrop-blur-sm border border-brand-gold/20 rounded-2xl p-8 shadow-2xl space-y-6">
        
        <div class="space-y-4">
          <div class="space-y-1.5">
            <label for="username" class="text-[10px] tracking-widest uppercase text-brand-cream/60 font-semibold block">Username</label>
            <input 
              v-model="username" 
              id="username" 
              type="text" 
              required
              class="w-full bg-brand-cocoa-dark/50 border border-brand-gold/20 rounded-lg p-3 text-sm text-brand-cream focus:outline-none focus:border-brand-gold transition-colors duration-300" 
              placeholder="Enter your administrative ID"
            />
          </div>

          <div class="space-y-1.5">
            <label for="password" class="text-[10px] tracking-widest uppercase text-brand-cream/60 font-semibold block">Password</label>
            <input 
              v-model="password" 
              id="password" 
              type="password" 
              required
              class="w-full bg-brand-cocoa-dark/50 border border-brand-gold/20 rounded-lg p-3 text-sm text-brand-cream focus:outline-none focus:border-brand-gold transition-colors duration-300" 
              placeholder="••••••••••••"
            />
          </div>
        </div>

        <div v-if="error" class="bg-brand-burgundy/10 border border-brand-burgundy/30 text-brand-burgundy text-xs p-3 rounded-lg text-center animate-fade-in font-medium">
          {{ error }}
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-4 rounded-full text-xs tracking-widest font-bold btn-luxury-gold uppercase shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span v-if="loading" class="w-4 h-4 border-2 border-brand-cocoa-dark/30 border-t-brand-cocoa-dark rounded-full animate-spin"></span>
          <span>{{ loading ? 'Authenticating...' : 'Enter Dashboard' }}</span>
        </button>
        
      </form>

      <!-- Footer minimal -->
      <p class="text-center text-[10px] text-brand-cream/30 uppercase tracking-widest">
        &copy; {{ new Date().getFullYear() }} Cocora Delights. Authorized Personnel Only.
      </p>
    </div>
  </div>
</template>

<script setup>
// Use specific layout or disable it to drop the public header/footer
definePageMeta({
  layout: false, // Don't use default layout
});

useHead({
  title: 'Cocora | Concierge Access',
});

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBase.startsWith('http') ? config.public.apiBase : `https://${config.public.apiBase}`;
    
    const res = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    const data = await res.json();

    if (data.success && data.token) {
      // Set the token securely in a cookie
      const tokenCookie = useCookie('admin_token', { 
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      });
      tokenCookie.value = data.token;

      // Redirect to the dashboard
      navigateTo('/admin/dashboard');
    } else {
      error.value = data.error || 'Authentication failed. Please check your credentials.';
    }
  } catch (err) {
    error.value = 'A network error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
