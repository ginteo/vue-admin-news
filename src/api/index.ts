import { http } from '@/plugins/axios'
import type { LoginDto, PaginationQueryDto, ResponseLogin } from './types'

export * from './types'

export function login(data: LoginDto) {
  return http.request<ResponseLogin>({ url: 'login', method: 'post', data })
}

export function getList<T>(
  url: string,
  paginationQueryDto: PaginationQueryDto
) {
  return http.request<T>({ url, params: paginationQueryDto })
}

export function updateList(url: string, id: number, data: any) {
  return http.request({ url: `${url}/${id}`, method: 'patch', data })
}

export function deleteList(url: string, id: number) {
  return http.request({ url: `${url}/${id}`, method: 'delete' })
}

export function addList(url: string, data: any) {
  return http.request({ url, method: 'post', data })
}
