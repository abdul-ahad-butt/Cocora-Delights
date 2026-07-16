export default defineNuxtRouteMiddleware((to, from) => {
  // Check for the admin authentication token
  const token = useCookie('admin_token');

  // If token is missing, redirect to login
  if (!token.value) {
    return navigateTo('/admin/login');
  }
});
