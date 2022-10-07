<template>
  <!-- 搜索区域 -->
  <el-card>
    <FormRender
      ref="searchFormRef"
      v-bind="searchFormConfig"
      @submit="handleSearch"
    >
      <template #button>
        <div class="btns">
          <el-button @click="onReset">重置</el-button>
          <el-button type="primary" native-type="submit">搜索</el-button>
        </div>
      </template>
    </FormRender>
  </el-card>

  <el-card class="table-content">
    <!-- 表格渲染 -->
    <TableRender
      :table-config="tableConfig"
      :data="tableData"
      :total="total"
      :current-page="queryInfo.offset"
      :page-size="queryInfo.limit"
      @add="showAddDialog"
      @edit="showEditDialog"
      @delete="onDelete"
      @change-current-page="handleCurrentChange"
      @change-page-size="handleSizeChange"
    >
      <template #status="scope">
        <el-tag type="success" v-if="scope.row.status === 1">启用</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>

      <template #type="scope">
        <el-tag>{{ scope.row.type === 1 ? '超级管理员' : '普通用户' }}</el-tag>
      </template>
    </TableRender>
  </el-card>

  <!-- 添加对话框 -->
  <DialogRender
    ref="addDialogRef"
    v-bind="addDialogConfig"
    @request-success-close-dialog="handleRequestSucessCloseDialog"
  ></DialogRender>

  <!-- 编辑对话框 -->
  <DialogRender
    ref="editDialogRef"
    v-bind="editDialogConfig"
    :initial-values="initialValues"
    @request-success-close-dialog="handleRequestSucessCloseDialog"
  >
  </DialogRender>
</template>

<script lang="ts" setup>
import FormRender from '@/components/form-render'
import TableRender from '@/components/table-render'
import DialogRender from '@/components/dialog-render'

import {
  searchFormConfig,
  tableConfig,
  addDialogConfig,
  editDialogConfig
} from './config'
import { useSearchForm, useTableContent, useDialogContent } from '@/hooks'

const pageName = 'role'

// hooks
const { searchFormRef, queryInfo, searchWords, handleSearch, onReset } =
  useSearchForm(pageName)

const {
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
} = useTableContent(pageName, queryInfo, searchWords)

const { handleRequestSucessCloseDialog } = useDialogContent(
  pageName,
  queryInfo,
  searchWords
)
</script>

<style lang="scss" scoped>
.btns {
  @apply w-full flex justify-end;
}

.table-content {
  @apply mt-2;
}
</style>
