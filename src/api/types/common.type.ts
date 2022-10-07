export interface ResponseCommon {
  id: number
  createAt: string
  updateAt: string
}

export interface PaginationQueryDto extends Record<string, any> {
  offset: number
  limit: number
}

export interface ResponsePagination<T> {
  list: T[]
  count: number
  page_index: number
  page_size: number
}
