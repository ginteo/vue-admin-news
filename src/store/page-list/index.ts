import {
  getList,
  type PaginationQueryDto,
  type ResponsePagination
} from '@/api'
import { defineStore } from 'pinia'
import type { PageListStateType } from './type'

export const usePageListStore = defineStore('page-list', {
  state: (): PageListStateType => {
    return {
      adminList: [],
      adminTotal: 0,
      roleList: [],
      roleTotal: 0
    }
  },
  actions: {
    async getPageListAction(pageName: string, query: PaginationQueryDto) {
      const { code, data } = await getList<ResponsePagination<any>>(
        pageName,
        query
      )

      if (code === 200) {
        this[`${pageName}List` as keyof PageListStateType] = data.list
        this[`${pageName}Total` as keyof PageListStateType] = data.count
      }
    }
  }
})
