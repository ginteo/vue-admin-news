<template>
  <div class="login">
    <div class="login-panel">
      <h1 class="title">新闻后台管理系统</h1>

      <el-card>
        <FormRender v-bind="formConfig" @submit="onSubmit">
          <template #button>
            <div class="login-btn">
              <el-button type="primary" native-type="submit">登录</el-button>
            </div>
          </template>
        </FormRender>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormRender from '@/components/form-render'

import { formConfig } from './config/form.config'
import { useLoginStore } from '@/store'

const loginStore = useLoginStore()

// 发送登录请求
const onSubmit = (values: any) => loginStore.loginAction(values)
</script>

<style lang="scss" scoped>
.login {
  @apply w-full h-full flex justify-center items-center bg-[url('@/assets/images/login-bg.svg')];

  &-panel {
    @apply w-[400px];

    .title {
      @apply text-center font-bold text-2xl mb-2;
    }
  }

  &-btn {
    @apply w-full flex justify-end;
  }
}
</style>
