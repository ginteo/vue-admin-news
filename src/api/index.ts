import { http } from '@/plugins/axios'
import type { LoginDto, ResponseLogin } from './types'

export * from './types'

export function login(data: LoginDto) {
  return http.request<ResponseLogin>({ url: 'login', method: 'post', data })
}
