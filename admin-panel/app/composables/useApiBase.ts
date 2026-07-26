export const useApiBase = () => {
  const config = useRuntimeConfig();
  const rawBase = (config.public.apiBase || 'https://cocoradelights.jerrystankas087.workers.dev').trim().replace(/\/+$/, '');
  return rawBase.startsWith('http') ? rawBase : `https://${rawBase}`;
};
