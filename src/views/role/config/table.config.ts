import type { TableRenderType } from '@/components/table-render'

export const tableConfig: TableRenderType = {
  tableColumn: [
    { label: '角色名称', prop: 'name', minWidth: '180', align: 'center' },
    { label: '角色描述', prop: 'remark', width: '180', align: 'center' }
  ]
}
