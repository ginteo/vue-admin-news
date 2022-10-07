<template>
  <el-form
    ref="formRef"
    :model="values"
    v-bind="otherFormProps"
    @submit="onSubmit"
  >
    <el-row v-bind="rowProps">
      <el-col v-bind="colProps" v-for="item in formData" :key="item.field">
        <el-form-item
          :label="item.label"
          :prop="item.field"
          :error="errors[`${item.field}`]"
          :class="{ required: isRequiredClassName(item.field) }"
          v-bind="item.otherFormItemProps"
        >
          <!-- input输入框 -->
          <template v-if="item.type === 'input'">
            <el-input
              v-model="values[`${item.field}`]"
              v-bind="item.inputProps"
            />
          </template>

          <!-- radio单选框 -->
          <template v-else-if="item.type === 'radio'">
            <el-radio-group
              v-model="values[`${item.field}`]"
              v-bind="item.radioProps?.radioGroupProps"
            >
              <el-radio
                v-for="val in item.radioProps?.radioOptions"
                :key="val.label"
                :label="val.value"
                v-bind="val.otherRadioProps"
              >
                {{ val.label }}
              </el-radio>
            </el-radio-group>
          </template>

          <!-- select选择器 -->
          <template v-else-if="item.type === 'select'">
            <el-select
              v-model="values[`${item.field}`]"
              v-bind="item.selectProps?.otherSelectProps"
            >
              <el-option
                v-for="val in item.selectProps?.options"
                :key="val.label"
                :label="val.label"
                :value="val.value"
                :disabled="val.disabled"
              />
            </el-select>
          </template>

          <!-- date-picker日期选择器 -->
          <template v-else-if="item.type === 'date-picker'">
            <el-date-picker
              v-model="values[`${item.field}`]"
              v-bind="item.datePickerProps"
            />
          </template>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 提交按钮 -->
    <el-form-item>
      <slot name="button">
        <el-button @click="handleReset()">重置</el-button>
        <el-button type="primary" native-type="submit">提交</el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { RowProps, ColProps } from 'element-plus'
import { useForm, useFileds } from '@/plugins/validate'

import type { FormRenderItemType, OtherFormProps } from '../types'

const props = defineProps({
  formData: {
    type: Array as PropType<FormRenderItemType[]>,
    default: () => []
  },
  initialValues: { type: Object, default: () => {} },
  rowProps: { type: Object as PropType<Partial<RowProps>>, default: () => {} },
  colProps: { type: Object as PropType<Partial<ColProps>>, default: () => {} },
  otherFormProps: {
    type: Object as PropType<OtherFormProps>,
    default: () => {}
  }
})
const emits = defineEmits(['submit'])

const { handleSubmit, handleReset, values, errors } = useForm({
  initialValues: props.initialValues,
  // 表单验证规则
  validationSchema: props.otherFormProps?.validationSchema
})
useFileds(props.formData.map(item => item.field))

// 根据表单验证规则中是否有required属性（如yup.required()或@vee-validation/rules中的required），判断当前字段是否添加required类名
const isRequiredClassName = (field: string) => {
  const validationSchema = props.otherFormProps?.validationSchema || {}
  const veeValidationField = validationSchema[field] || {}
  const yupValidationFields = validationSchema.fields || {}
  const exclusiveTests = yupValidationFields[field]?.exclusiveTests || {}

  return veeValidationField.required || exclusiveTests.required
}

// 表单提交
const onSubmit = handleSubmit(values => emits('submit', values))

defineExpose({ handleReset })
</script>

<style lang="scss" scoped>
.el-form {
  @apply mt-2;

  .el-form-item {
    @apply mx-3;
  }
}

.el-form--label-left {
  :deep(.el-form-item__label) {
    @apply block text-justify after:inline-block after:content-[''] after:pl-[100%];
  }
}

.el-select {
  @apply w-full;
}

.required :deep(.el-form-item__label) {
  @apply before:content-['*'] before:text-red-500 before:mr-[4px];
}
</style>
