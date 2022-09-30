let baseURL = ''
const timeout = 1000

baseURL = import.meta.env.MODE === 'development' ? '/api/v1/admin' : '/'

export { baseURL, timeout }
