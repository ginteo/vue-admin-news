import { ElMessageBox } from 'element-plus'

import type DialogRender from '@/components/dialog-render'
import { usePageListStore, type PageListStateType } from '@/store'
import { deleteList } from '@/api'

export const useTableContent = (
  pageName: string,
  queryInfo: any,
  searchWords: any
) => {
  const initialValues = ref<any>({})
  const addDialogRef = ref<InstanceType<typeof DialogRender>>()
  const editDialogRef = ref<InstanceType<typeof DialogRender>>()

  usePageListStore().getPageListAction(pageName, {
    ...queryInfo,
    ...searchWords.value
  })

  const tableData = computed(
    () => usePageListStore()[`${pageName}List` as keyof PageListStateType]
  )
  const total = computed(
    () => usePageListStore()[`${pageName}Total` as keyof PageListStateType]
  )

  const showAddDialog = () => {
    if (addDialogRef.value) {
      addDialogRef.value.isShow = true
    }
  }

  const showEditDialog = (row: any) => {
    if (editDialogRef.value) {
      editDialogRef.value.isShow = true
    }
    initialValues.value = row
  }

  const onDelete = async (row: any) => {
    ElMessageBox.confirm('确认删除吗？', 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const { code } = await deleteList(pageName, row.id)

        if (code === 200) {
          ElMessage.success('删除成功')
          // 删除后重新请求列表数据
          await usePageListStore().getPageListAction(pageName, {
            ...queryInfo,
            ...searchWords.value
          })
        }
      })
      .catch(() => {
        ElMessage.info('已取消')
      })
  }

  const handleSizeChange = async (val: number) => {
    queryInfo.limit = val
    await usePageListStore().getPageListAction(pageName, {
      ...queryInfo,
      ...searchWords.value
    })
  }

  const handleCurrentChange = async (val: number) => {
    queryInfo.offset = val
    await usePageListStore().getPageListAction(pageName, {
      ...queryInfo,
      ...searchWords.value
    })
  }

  return {
    initialValues,
    addDialogRef,
    editDialogRef,
    tableData,
    total,
    showAddDialog,
    showEditDialog,
    onDelete,
    handleSizeChange,
    handleCurrentChange
  }
}
