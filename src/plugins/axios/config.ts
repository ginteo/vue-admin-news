let baseURL = ''
const timeout = 1000

baseURL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_DEV_PREFIX_URL
    : import.meta.env.VITE_PROD_PREFIX_URL

export { baseURL, timeout }
