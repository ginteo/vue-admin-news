import { usePageListStore } from '@/store'

import type FormRender from '@/components/form-render'

export const useSearchForm = (pageName: string) => {
  const searchFormRef = ref<InstanceType<typeof FormRender>>()
  const queryInfo = reactive({
    offset: 1, // 当前第几页
    limit: 10 // 每页显示多少条数据
  })
  const searchWords = ref<any>({})

  // 按查询条件模糊搜索
  const handleSearch = async (values: any) => {
    searchWords.value = values
    await usePageListStore().getPageListAction(pageName, {
      ...queryInfo,
      ...values
    })
  }

  // 点击重置搜索条件
  const onReset = async () => {
    searchFormRef.value?.handleReset()
    searchWords.value = {}
    await usePageListStore().getPageListAction(pageName, { ...queryInfo })
  }

  return { searchFormRef, queryInfo, searchWords, handleSearch, onReset }
}
