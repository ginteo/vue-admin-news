<template>
  <el-config-provider :locale="zhCn">
    <h1 class="bg-red-500">app</h1>
    <el-button type="primary">button</el-button>
    {{ msg }}
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const msg = ref('hello')
</script>
