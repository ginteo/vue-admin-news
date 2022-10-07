<template>
  <!-- 表格头部 -->
  <div class="table-header mb-4">
    <slot name="header">
      <el-button type="primary" icon="Plus" @click="$emit('add')">
        添加
      </el-button>
    </slot>
  </div>

  <el-table
    :data="data"
    style="width: 100%"
    v-bind="tableConfig.otherTableProps"
  >
    <el-table-column
      v-if="showIndex"
      label="序号"
      type="index"
      :minWidth="indexMinWidth"
      align="center"
      fixed
    />

    <template v-for="item in tableConfig.tableColumn" :key="item.label">
      <el-table-column v-bind="item">
        <template #default="scope">
          <slot :name="item.prop" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>

    <el-table-column
      label="操作"
      prop="operate"
      align="center"
      :minWidth="operateMinWidth"
      fix="right"
    >
      <template #default="scope">
        <slot name="operate">
          <el-button
            type="primary"
            icon="Edit"
            circle
            @click="$emit('edit', scope.row)"
          />

          <el-button
            type="danger"
            icon="Delete"
            circle
            @click="$emit('delete', scope.row)"
          />
        </slot>
      </template>
    </el-table-column>
  </el-table>

  <!-- 表格底部：默认为分页 -->
  <div v-if="showPagination" class="table-footer mt-4">
    <slot name="footer">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :currentPage="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 100, 500]"
        :background="true"
        v-bind="tableConfig.otherPaginationProps"
        @size-change="(pagesize: number) => $emit('changePageSize', pagesize)"
        @current-change="(currentPage: number) => $emit('changeCurrentPage', currentPage)"
      />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { TableRenderType } from '@/components/table-render'

defineProps({
  data: { type: Array, default: () => [] },
  tableConfig: { type: Object as PropType<TableRenderType>, required: true },
  showIndex: { type: Boolean, default: true },
  showPagination: { type: Boolean, default: true },
  currentPage: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  total: { type: Number, default: 0 },
  indexMinWidth: { type: String, default: '80' },
  operateMinWidth: { type: String, default: '180' }
})
defineEmits(['edit', 'delete', 'add', 'changeCurrentPage', 'changePageSize'])
</script>
