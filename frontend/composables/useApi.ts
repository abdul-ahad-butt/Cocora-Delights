import { useFetch } from '#app'

export const useApi = <T>(request: Parameters<typeof useFetch<T>>[0], opts?: Parameters<typeof useFetch<T>>[1]) => {
  const config = useRuntimeConfig()

  return useFetch<T>(request, {
    baseURL: config.public.apiBase as string,
    ...opts
  })
}
