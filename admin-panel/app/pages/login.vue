<template>
  <div class="min-h-screen bg-brand-cocoa-dark flex flex-col items-center justify-center p-6 text-brand-cream selection:bg-brand-gold selection:text-brand-cocoa-dark font-sans relative overflow-hidden">
    
    <!-- Background Accents -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-caramel/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="w-full max-w-md space-y-8 relative z-10">
      
      <!-- Logo Header -->
      <div class="text-center space-y-2">
        <div class="w-16 h-16 border border-brand-gold/30 rotate-45 mx-auto flex items-center justify-center bg-brand-cocoa-dark shadow-2xl">
          <span class="font-serif text-2xl text-brand-gold -rotate-45 block leading-none">C</span>
        </div>
        <h2 class="mt-6 text-2xl font-serif tracking-wide text-brand-cream">Cocora Concierge</h2>
        <p class="text-xs tracking-[0.2em] text-brand-gold uppercase font-bold">Secure Portal</p>
      </div>

      <!-- Login Form using Nuxt UI Components -->
      <div class="mt-8 bg-brand-bg/50 backdrop-blur-sm border border-brand-gold/20 rounded-2xl p-8 shadow-2xl">
        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <UFormField label="Administrative ID" name="username" class="text-brand-cream font-serif">
            <UInput 
              v-model="username" 
              placeholder="Enter your administrative ID" 
              icon="i-heroicons-user"
              size="lg"
              :ui="{ color: { white: { outline: 'ring-1 ring-brand-gold/30 bg-brand-cocoa-dark/50 text-brand-cream focus:ring-brand-gold' } } }"
              color="white"
            />
          </UFormField>

          <UFormField label="Passcode" name="password" class="text-brand-cream font-serif">
            <UInput 
              v-model="password" 
              type="password" 
              placeholder="••••••••••••" 
              icon="i-heroicons-lock-closed"
              size="lg"
              :ui="{ color: { white: { outline: 'ring-1 ring-brand-gold/30 bg-brand-cocoa-dark/50 text-brand-cream focus:ring-brand-gold' } } }"
              color="white"
            />
          </UFormField>

          <div v-if="error" class="bg-brand-burgundy/20 border border-brand-burgundy/50 text-brand-cream text-xs p-3 rounded-lg text-center font-medium">
            {{ error }}
          </div>

          <UButton 
            type="submit" 
            :loading="loading"
            block
            size="xl"
            color="amber"
            variant="solid"
            class="mt-4 tracking-widest uppercase text-xs font-bold bg-brand-gold hover:bg-brand-caramel text-brand-cocoa-dark transition-colors duration-300 shadow-lg"
          >
            {{ loading ? 'Authenticating...' : 'Enter Dashboard' }}
          </UButton>
          
        </form>
      </div>

      <!-- Footer minimal -->
      <p class="text-center text-[10px] text-brand-cream/30 uppercase tracking-widest">
        &copy; {{ new Date().getFullYear() }} Cocora Delights. Authorized Personnel Only.
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false, // Drop default dashboard layout
})

useHead({
  title: 'Cocora | Concierge Login',
})

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const config = useRuntimeConfig()

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Append /api/admin/login to API base
    const res = await $fetch(`${config.public.apiBase}/api/admin/login`, {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    if (res.success && res.token) {
      const tokenCookie = useCookie('admin_token', { 
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      })
      tokenCookie.value = res.token
      navigateTo('/')
    }
  } catch (err) {
    console.error(err)
    if (err.response && err.response._data && err.response._data.error) {
      error.value = err.response._data.error
    } else {
      error.value = 'Authentication failed. Please check your credentials.'
    }
  } finally {
    loading.value = false
  }
}
</script>
