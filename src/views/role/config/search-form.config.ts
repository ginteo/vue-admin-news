import type { FormRenderConfigType } from '@/components/form-render'

export const searchFormConfig: FormRenderConfigType = {
  formData: [
    {
      type: 'input',
      label: '角色名称',
      field: 'name',
      inputProps: { placeholder: '角色名称模糊搜索' }
    }
  ],
  colProps: { sm: 12, md: 8, lg: 6, xl: 4 },
  otherFormProps: {
    labelWidth: '80px',
    labelPosition: 'left'
  }
}
