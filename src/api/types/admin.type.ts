import type { ResponseCommon } from './common.type'

export interface LoginDto {
  account: string
  password: string
}

export interface Admin extends ResponseCommon {
  account: string
  nickname: string
  tel: string
  status: number
  type: number
}

export interface TokensType {
  accessToken: string
  refreshToken: string
}

export interface ResponseLogin {
  tokens: TokensType
  admin: Admin
}
