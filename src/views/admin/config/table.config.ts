import type { TableRenderType } from '@/components/table-render'

export const tableConfig: TableRenderType = {
  tableColumn: [
    { label: '账号', prop: 'account', minWidth: '180', align: 'center' },
    { label: '昵称', prop: 'nickname', width: '180', align: 'center' },
    { label: '手机号', prop: 'tel', minWidth: '180', align: 'center' },
    { label: '状态', prop: 'status', width: '180', align: 'center' },
    { label: '类型', prop: 'type', width: '180', align: 'center' }
  ]
}
