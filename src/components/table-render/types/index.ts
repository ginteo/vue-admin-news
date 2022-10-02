import type { TableProps, PaginationProps } from 'element-plus'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export interface TableColumnType extends Partial<TableColumnCtx<any>> {
  label: string
  prop: string
}

export interface TableRenderType {
  tableColumn: TableColumnType[]
  otherTableProps?: Omit<Partial<TableProps<any>>, 'data'>
  otherPaginationProps?: Omit<Partial<PaginationProps>, 'total'>
}
