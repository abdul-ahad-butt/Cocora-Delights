import { useFetch } from '#app'

export const useApi = <T>(request: Parameters<typeof useFetch<T>>[0], opts?: Parameters<typeof useFetch<T>>[1]) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string || 'https://cocoradelights.jerrystankas087.workers.dev';
  const baseUrl = apiBase.startsWith('http') ? apiBase : `https://${apiBase}`;

  return useFetch<T>(request, {
    baseURL: baseUrl,
    ...opts
  })
}
