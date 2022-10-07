<template>
  <el-drawer v-model="isShow" :title="title" direction="rtl" destroy-on-close>
    <FormRender
      v-bind="formConfig"
      :initial-values="initialValues"
      @submit="onSubmit"
    >
    </FormRender>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ElMessage } from 'element-plus'

import FormRender, { type FormRenderConfigType } from '@/components/form-render'

import { addList, updateList } from '@/api'

const props = defineProps({
  pageName: { type: String, required: true },
  title: { type: String, default: '' },
  formConfig: {
    type: Object as PropType<FormRenderConfigType>,
    default: () => {}
  },
  initialValues: { type: Object, default: () => {} }
})
const emits = defineEmits(['requestSuccessCloseDialog'])

// 控制el-drawer的显示与隐藏
const isShow = ref(false)

const onSubmit = async (values: any) => {
  // 根据initialValues的key长度判断当前是添加还是编辑
  const length = Object.keys(props.initialValues || {}).length

  if (length > 0) {
    // 编辑
    const { code } = await updateList(
      props.pageName,
      props.initialValues.id,
      values
    )
    if (code == 200) {
      isShow.value = false
      ElMessage.success('修改成功')
      emits('requestSuccessCloseDialog')
    }
  } else {
    // 添加
    const { code } = await addList(props.pageName, values)
    if (code === 201) {
      isShow.value = false
      ElMessage.success('添加成功')
      emits('requestSuccessCloseDialog')
    }
  }
}

defineExpose({ isShow })
</script>
