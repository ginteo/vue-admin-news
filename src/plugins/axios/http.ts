import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios'
import type { ResponseResult } from 'types/response-result'

export default class Http {
  private readonly instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      response => response,
      error => Promise.reject(error)
    )
  }

  request<T, K = ResponseResult<T>>(config: AxiosRequestConfig): Promise<K> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<K>(config)
        .then(res => resolve(res.data))
        .catch(error => reject(error))
    })
  }
}
