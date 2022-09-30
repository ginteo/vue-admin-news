import Http from './http'
import { baseURL, timeout } from './config'

export const http = new Http({ baseURL, timeout })
