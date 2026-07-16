export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('admin_token')

  if (!token.value) {
    return navigateTo('/login')
  }
})
