import type { FormRenderConfigType } from '@/components/form-render'

export const searchFormConfig: FormRenderConfigType = {
  formData: [
    {
      type: 'input',
      label: '账号',
      field: 'account',
      inputProps: { placeholder: '账号模糊搜索' }
    },
    {
      type: 'input',
      label: '昵称',
      field: 'nickname',
      inputProps: { placeholder: '昵称模糊搜索' }
    },
    {
      type: 'input',
      label: '手机号',
      field: 'tel',
      inputProps: { placeholder: '手机号模糊搜索' }
    },
    {
      type: 'select',
      label: '状态',
      field: 'status',
      selectProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ],
        otherSelectProps: {
          placeholder: '请选择管理员状态搜索'
        }
      }
    },
    {
      type: 'select',
      label: '类型',
      field: 'type',
      selectProps: {
        options: [
          { label: '超级管理员', value: 1 },
          { label: '普通用户', value: 0 }
        ],
        otherSelectProps: {
          placeholder: '请选择管理员类型搜索'
        }
      }
    }
  ],
  colProps: { sm: 12, md: 8, lg: 6, xl: 4 },
  otherFormProps: {
    labelWidth: '60px',
    labelPosition: 'left'
  }
}
