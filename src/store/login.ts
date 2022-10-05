import { defineStore } from 'pinia'

import { login, type Admin, type LoginDto } from '@/api'
import router from '@/router'
import { useLocalStorage } from '@/utils'

export const useLoginStore = defineStore('login', {
  state: () => {
    return {
      accessToken: '',
      refreshToken: '',
      admin: {} as Admin
    }
  },
  actions: {
    async loginAction(loginDto: LoginDto) {
      const {
        code,
        data: { tokens, admin }
      } = await login(loginDto)

      if (code === 200) {
        this.accessToken = tokens.accessToken
        this.refreshToken = tokens.refreshToken
        this.admin = admin

        useLocalStorage.set('accessToken', this.accessToken)
        useLocalStorage.set('refreshToken', this.refreshToken)
        useLocalStorage.set('admin', this.admin)

        router.push('/layout')
      }
    }
  }
})
