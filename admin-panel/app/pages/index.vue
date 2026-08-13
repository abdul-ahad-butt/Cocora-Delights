<template>
  <div class="space-y-6">
    <div class="flex justify-between items-end border-b border-brand-gold/10 pb-4">
      <div>
        <h2 class="font-serif text-3xl text-brand-cream font-bold">Incoming Submissions</h2>
        <p class="text-xs text-brand-cream/50 mt-2 tracking-wide uppercase">Review custom box configurations and signature orders</p>
      </div>
      <UButton 
        icon="i-heroicons-arrow-path" 
        color="gray" 
        variant="ghost" 
        @click="fetchOrders" 
        :loading="loading"
        class="text-brand-gold hover:bg-brand-gold/10 min-h-[44px] min-w-[44px] flex justify-center items-center"
      >
        Refresh Data
      </UButton>
    </div>

    <!-- Nuxt UI Data Table -->
    <div class="bg-brand-cocoa-dark border border-brand-gold/10 rounded-2xl shadow-2xl overflow-x-auto" style="-webkit-overflow-scrolling: touch;">
      <UTable 
        :rows="orders" 
        :columns="columns" 
        :loading="loading"
        :empty-state="{ icon: 'i-heroicons-circle-stack', label: 'No orders submitted yet.' }"
        class="w-full"
        @select="openOrderDetails"
        :ui="{
          th: { base: 'text-brand-gold uppercase tracking-widest text-[10px] font-bold bg-brand-bg/50', padding: 'px-4 py-4' },
          td: { base: 'text-brand-cream/90 text-sm border-t border-brand-gold/5 cursor-pointer hover:bg-brand-gold/5 transition-colors', padding: 'px-4 py-4' },
          tr: { active: 'bg-brand-gold/10' }
        }"
      >
        <template #id-cell="{ row }">
          <span class="text-[10px] font-mono text-brand-gold">{{ row.original.id }}</span>
        </template>
        
        <template #totalPrice-cell="{ row }">
          <span class="font-semibold text-brand-cream bg-brand-bg px-2 py-1 rounded">{{ formatPrice(row.original.totalPrice) }}</span>
        </template>

        <template #orderType-cell="{ row }">
          <UBadge :color="row.original.orderType === 'custom_box' ? 'amber' : 'gray'" variant="subtle" class="capitalize">
            {{ row.original.orderType.replace('_', ' ') }}
          </UBadge>
        </template>

        <template #createdAt-cell="{ row }">
          <span class="text-xs">{{ new Date(row.original.createdAt).toLocaleDateString() }}</span>
        </template>

        <template #paymentProof-cell="{ row }">
          <div v-if="row.original.paymentProof" class="w-10 h-10 rounded overflow-hidden border border-brand-gold/20 cursor-pointer" @click.stop="openProofModal(row.original.paymentProof)">
            <img :src="row.original.paymentProof" class="w-full h-full object-cover" />
          </div>
          <span v-else class="text-[10px] text-brand-cream/30 italic">None</span>
        </template>
        
        <template #actions-cell="{ row }">
          <UButton color="amber" variant="ghost" icon="i-heroicons-chevron-right" class="min-h-[44px] min-w-[44px] flex justify-center items-center" @click.stop="openOrderDetails(row.original)" />
        </template>
      </UTable>
    </div>

    <!-- Details Slide-over -->
    <USlideover v-model="isModalOpen" side="right" :ui="{ width: 'w-screen max-w-2xl' }">
      <div v-if="selectedOrder" class="p-6 md:p-8 bg-brand-cocoa-dark h-full overflow-y-auto border-l border-brand-gold/20 flex flex-col">
        
        <div class="flex items-center justify-between border-b border-brand-gold/10 pb-6 mb-6">
          <div>
            <h2 class="font-serif text-2xl text-brand-cream font-bold">Order Details</h2>
            <p class="text-[10px] font-mono text-brand-gold mt-1">{{ selectedOrder.id }}</p>
          </div>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" class="min-h-[44px] min-w-[44px] flex justify-center items-center" @click="isModalOpen = false" />
        </div>

        <div class="space-y-8 grow">
          <!-- Client Info -->
          <section class="bg-brand-bg/50 p-6 rounded-xl border border-brand-gold/10">
            <h3 class="text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-4 flex items-center space-x-2">
              <UIcon name="i-heroicons-user" /> <span>Client & Delivery</span>
            </h3>
            <div class="grid grid-cols-2 gap-4 text-sm text-brand-cream/80">
              <div>
                <p class="text-[10px] uppercase text-brand-cream/40 mb-1">Name</p>
                <p class="font-medium text-brand-cream">{{ selectedOrder.customerName }}</p>
              </div>
              <div>
                <p class="text-[10px] uppercase text-brand-cream/40 mb-1">Contact</p>
                <p>{{ selectedOrder.customerEmail }}<br>{{ selectedOrder.customerPhone }}</p>
              </div>
              <div class="col-span-2 mt-2">
                <p class="text-[10px] uppercase text-brand-cream/40 mb-1">Address</p>
                <p>{{ selectedOrder.shippingAddress }}, {{ selectedOrder.shippingCity }}, {{ selectedOrder.shippingCountry }}</p>
              </div>
            </div>
          </section>

          <!-- Greetings Message -->
          <section v-if="parsedCustomBoxDetails?.[0]?.details?.giftMessage" class="bg-brand-cream p-6 rounded-xl shadow-inner relative overflow-hidden">
            <div class="absolute -top-4 -right-4 text-brand-caramel/10 opacity-50">
              <UIcon name="i-heroicons-envelope" class="w-24 h-24" />
            </div>
            <h3 class="text-[10px] tracking-widest text-brand-cocoa-dark/50 uppercase font-bold mb-2">Handwritten Message</h3>
            <p class="font-serif text-brand-cocoa-dark italic text-lg leading-relaxed relative z-10">
              "{{ parsedCustomBoxDetails[0].details.giftMessage }}"
            </p>
          </section>

          <!-- Composition -->
          <section>
            <h3 class="text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-4 border-b border-brand-gold/20 pb-2">Order Composition</h3>
            
            <div v-for="(item, idx) in parsedCustomBoxDetails" :key="idx" class="mb-6">
              <div class="flex justify-between items-center mb-3">
                <h4 class="font-serif text-lg text-brand-cream">{{ item.name }}</h4>
                <p class="text-xs text-brand-gold">Qty: {{ item.quantity }}</p>
              </div>

              <div v-if="item.details" class="bg-brand-bg border border-brand-gold/10 p-5 rounded-2xl">
                <div class="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-brand-cream font-bold mb-4">
                  <span class="bg-brand-cocoa-dark px-3 py-1.5 rounded-full border border-brand-gold/20">Theme: <span class="text-brand-gold">{{ item.details.color }}</span></span>
                  <span class="bg-brand-cocoa-dark px-3 py-1.5 rounded-full border border-brand-gold/20">Ribbon: <span class="text-brand-gold">{{ item.details.ribbon }}</span></span>
                  <span class="bg-brand-cocoa-dark px-3 py-1.5 rounded-full border border-brand-gold/20">Size: <span class="text-brand-gold">{{ item.details.size }}</span></span>
                </div>

                <div v-if="item.details.items" class="mt-4">
                  <div class="grid gap-2 border border-brand-gold/20 p-3 rounded-xl bg-black/40" :class="getGridColsClass(item.details.size)">
                    <div 
                      v-for="(choco, cIdx) in item.details.items" 
                      :key="cIdx"
                      class="aspect-square bg-brand-cocoa-dark border border-brand-gold/10 rounded flex flex-col justify-center items-center relative"
                    >
                      <template v-if="choco">
                        <div class="w-4 h-4 rounded-full border border-black/50 mb-1 shadow-sm" :style="{ backgroundColor: getChocoColor(choco.fillings) }"></div>
                        <span class="text-[7px] text-brand-gold uppercase tracking-widest text-center px-1 font-bold">{{ choco.letter || choco.fillings }}</span>
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
        </div>

        <!-- Footer -->
        <div class="border-t border-brand-gold/10 pt-6 mt-8 flex justify-between items-center text-brand-cream font-serif">
          <span class="text-sm text-brand-cream/50 uppercase tracking-widest">Total Revenue</span>
          <span class="text-2xl font-bold text-brand-gold">{{ formatPrice(selectedOrder.totalPrice) }}</span>
        </div>

      </div>
    </USlideover>

    <!-- Proof Modal -->
    <UModal v-model="isProofModalOpen" :ui="{ width: 'sm:max-w-3xl' }">
      <div class="p-4 bg-brand-cocoa-dark border border-brand-gold/20 rounded-xl relative">
        <div class="flex justify-between items-center mb-4 border-b border-brand-gold/10 pb-2">
          <h3 class="font-serif text-brand-cream text-lg">Transaction Screenshot</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" class="min-h-[44px] min-w-[44px] flex justify-center items-center" @click="isProofModalOpen = false" />
        </div>
        <div class="flex justify-center bg-black/50 rounded-lg p-2">
          <img :src="selectedProofImage" class="max-w-full max-h-[70vh] object-contain rounded" />
        </div>
      </div>
    </UModal>

  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: 'Cocora | Submissions Dashboard',
})

const columns = [
  { accessorKey: 'id', header: 'Order ID' },
  { accessorKey: 'customerName', header: 'Client Name' },
  { accessorKey: 'orderType', header: 'Order Type' },
  { accessorKey: 'shippingCity', header: 'City' },
  { accessorKey: 'createdAt', header: 'Date' },
  { accessorKey: 'totalPrice', header: 'Total Value' },
  { accessorKey: 'paymentProof', header: 'Payment Proof' },
  { id: 'actions' }
]

const orders = ref([])
const loading = ref(false)
const selectedOrder = ref(null)
const parsedCustomBoxDetails = ref(null)
const isModalOpen = ref(false)
const isProofModalOpen = ref(false)
const selectedProofImage = ref('')
const config = useRuntimeConfig()

const openProofModal = (base64) => {
  selectedProofImage.value = base64
  isProofModalOpen.value = true
}

const fetchOrders = async (silent = false) => {
  if (!silent) loading.value = true
  try {
    const token = useCookie('admin_token').value

    const apiBase = useApiBase()
    const res = await $fetch(`${apiBase}/api/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (res.success) {
      orders.value = res.data
    }
  } catch (err) {
    console.error("Failed to fetch orders:", err)
    if (err.response?.status === 401) {
      const token = useCookie('admin_token')
      token.value = null
      navigateTo('/login')
    }
  } finally {
    if (!silent) loading.value = false
  }
}

let pollInterval;
onMounted(() => {
  fetchOrders()
  pollInterval = setInterval(() => fetchOrders(true), 5000)
})

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval)
})

const openOrderDetails = (order) => {
  selectedOrder.value = order
  if (order.customBoxDetails) {
    try {
      parsedCustomBoxDetails.value = JSON.parse(order.customBoxDetails)
    } catch (e) {
      parsedCustomBoxDetails.value = []
    }
  } else {
    parsedCustomBoxDetails.value = []
  }
  isModalOpen.value = true
}

const formatPrice = (value) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency', currency: 'PKR', maximumFractionDigits: 0
  }).format(value)
}

const getGridColsClass = (size) => {
  if (size === 16) return 'grid-cols-4'
  if (size === 25) return 'grid-cols-5'
  return 'grid-cols-3'
}

const getChocoColor = (filling) => {
  if (filling === 'pistachio') return '#4E5F3B'
  if (filling === 'almond') return '#634433'
  if (filling === 'date') return '#612128'
  return '#2C160F'
}
</script>
