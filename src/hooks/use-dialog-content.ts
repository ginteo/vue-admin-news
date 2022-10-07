import { usePageListStore } from '@/store'

export const useDialogContent = (
  pageName: string,
  queryInfo: any,
  searchWords: any
) => {
  const handleRequestSucessCloseDialog = async () => {
    await usePageListStore().getPageListAction(pageName, {
      ...queryInfo,
      ...searchWords.value
    })
  }

  return { handleRequestSucessCloseDialog }
}
