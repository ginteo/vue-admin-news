import router from '@/router'
import { useLoginStore } from '@/store'
import { useLocalStorage } from '@/utils'
import axios, {
  type AxiosRequestConfig,
  type AxiosInstance,
  AxiosError
} from 'axios'
import { ElMessage } from 'element-plus'
import type { ResponseResult } from 'types/response-result'

export default class Http {
  private readonly instance: AxiosInstance
  private readonly requestFreshToken: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    // 创建一个新的axios实例对象用于刷新token  这样做的目的就是 不会进入之前的请求拦截和响应 防止进入死循环
    this.requestFreshToken = axios.create(config)

    this.instance.interceptors.request.use(
      config => {
        // 请求头添加token
        const accessToken = useLocalStorage.get('accessToken')
        if (accessToken) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`
          }
        }

        return config
      },
      error => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      response => response,
      async (error: AxiosError<ResponseResult<any>>) => {
        const { response, config } = error

        if (response?.status === 401) {
          // 若无accessToken直接前往login页面
          if (!useLocalStorage.get('accessToken')) {
            ElMessage.error('未授权，请登录')
            return router.push('/login')
          }

          const refreshToken = useLocalStorage.get('refreshToken')
          if (refreshToken) {
            try {
              // 根据 refreshToken  获取新的token
              const data = await this.requestFreshToken({
                url: 'refresh',
                method: 'post',
                headers: { Authorization: `Bearer ${refreshToken}` }
              })
              const { accessToken, refreshToken: newRefreshToken } =
                data.data.data

              if (accessToken) {
                // 重新对pinia中token进行赋值
                useLoginStore().accessToken = accessToken
                useLoginStore().refreshToken = newRefreshToken
                useLocalStorage.set('accessToken', accessToken)
                useLocalStorage.set('refreshToken', newRefreshToken)
                config.headers = {
                  ...config.headers,
                  Authorization: `Bearer ${accessToken}`
                }

                // 重新获取401请求的失败的数据
                return this.instance(config)
              }
            } catch (e) {
              // 异常重新登录
              ElMessage.error('未授权，请登录')
              return router.push('/login')
            }
          }
        }

        ElMessage.error(response?.data.message)

        return Promise.reject(error)
      }
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

  refreshToken() {
    const refreshToken = useLocalStorage.get('refreshToken')

    if (refreshToken) {
      return this.request({
        url: 'refresh',
        method: 'post',
        headers: { Authorization: `Bearer ${refreshToken}` }
      })
    }
  }
}
