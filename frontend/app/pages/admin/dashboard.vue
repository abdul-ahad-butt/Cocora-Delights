<template>
  <div class="min-h-screen bg-brand-cocoa-dark p-8 text-brand-cream font-sans animate-fade-in">
    <div class="max-w-7xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-brand-gold/20 pb-6">
        <div>
          <h1 class="font-serif text-4xl font-bold text-brand-cream">Admin Dashboard</h1>
          <p class="text-sm text-brand-gold mt-2 tracking-widest uppercase">Overview of Recent Orders & Submissions</p>
        </div>
        <button 
          @click="fetchOrders" 
          :disabled="loading"
          class="btn-luxury-gold px-6 py-2 rounded-full text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Refreshing...</span>
          <span v-else>Refresh Data</span>
        </button>
      </div>

      <!-- Orders Grid / Table Area -->
      <div class="bg-brand-cocoa-light border border-brand-gold/10 rounded-2xl shadow-2xl overflow-hidden">
        <div class="p-6 border-b border-brand-gold/10 bg-[#2A1A13]">
          <h2 class="font-serif text-2xl text-brand-gold">Recent Orders</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-brand-cocoa-dark text-brand-gold uppercase tracking-widest text-[10px] font-bold">
                <th class="px-6 py-4 border-b border-brand-gold/10">Order ID</th>
                <th class="px-6 py-4 border-b border-brand-gold/10">Customer Name</th>
                <th class="px-6 py-4 border-b border-brand-gold/10">Order Type</th>
                <th class="px-6 py-4 border-b border-brand-gold/10">Date</th>
                <th class="px-6 py-4 border-b border-brand-gold/10 text-right">Total Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" class="animate-pulse">
                <td colspan="5" class="px-6 py-12 text-center text-brand-cream/50 tracking-widest uppercase text-xs">
                  Loading orders...
                </td>
              </tr>
              <tr v-else-if="orders.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-brand-cream/50 tracking-widest uppercase text-xs">
                  No orders found.
                </td>
              </tr>
              <tr 
                v-else
                v-for="order in orders" 
                :key="order.id" 
                class="hover:bg-brand-gold/5 transition-colors group cursor-pointer border-b border-brand-gold/5 last:border-b-0"
              >
                <td class="px-6 py-4 text-xs font-mono text-brand-gold/80">{{ order.id }}</td>
                <td class="px-6 py-4 text-sm font-medium text-brand-cream">{{ order.customerName }}</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-brand-bg/10 border border-brand-gold/20 text-brand-cream text-[10px] rounded uppercase tracking-wider whitespace-nowrap">
                    {{ order.orderType ? order.orderType.replace('_', ' ') : 'N/A' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-xs text-brand-cream/70 whitespace-nowrap">
                  {{ new Date(order.createdAt).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-brand-cream text-right whitespace-nowrap">
                  {{ formatPrice(order.totalPrice) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Nuxt composables
const config = useRuntimeConfig()
const orders = ref([])
const loading = ref(true)
const baseUrl = useApiBase();

const fetchOrders = async () => {
  loading.value = true
  try {
    const token = useCookie('admin_token').value
    const res = await $fetch(`${baseUrl}/api/admin/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (res && res.success) {
      orders.value = res.data || []
    }
  } catch (err) {
    console.error("Failed to fetch orders:", err)
    // Optional: If unauthenticated, redirect to login page
    // if (err.response?.status === 401) {
    //   navigateTo('/admin/login')
    // }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})

const formatPrice = (value) => {
  if (!value) return 'PKR 0'
  return new Intl.NumberFormat('en-PK', {
    style: 'currency', 
    currency: 'PKR', 
    maximumFractionDigits: 0
  }).format(value)
}

useHead({
  title: 'Cocora Admin | Dashboard'
})
</script>
