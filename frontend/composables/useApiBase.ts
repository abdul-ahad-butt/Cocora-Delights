export const useApiBase = () => {
  const config = useRuntimeConfig();
  const rawBase = (config.public.apiBase || 'http://localhost:8787').trim().replace(/\/+$/, '');
  return rawBase.startsWith('http') ? rawBase : `https://${rawBase}`;
};
