import type { FormRenderConfigType } from '@/components/form-render'
import { yup } from '@/plugins/validate'

export const addDialogConfig = {
  pageName: 'role',
  title: '添加角色',
  formConfig: {
    formData: [
      { type: 'input', label: '角色名称', field: 'name' },
      { type: 'input', label: '角色描述', field: 'remark' }
    ],
    otherFormProps: {
      labelWidth: '80px',
      labelPosition: 'left',
      validationSchema: yup.object({
        name: yup.string().required().label('角色名称'),
        remark: yup.string().optional().nullable()
      })
    }
  } as FormRenderConfigType
}

export const editDialogConfig = {
  pageName: 'role',
  title: '编辑角色',
  formConfig: {
    formData: [
      { type: 'input', label: '角色名称', field: 'name' },
      { type: 'input', label: '角色描述', field: 'remark' }
    ],
    otherFormProps: {
      labelWidth: '80px',
      labelPosition: 'left',
      validationSchema: yup.object({
        name: yup.string().required().label('角色名称'),
        remark: yup.string().optional().nullable()
      })
    }
  } as FormRenderConfigType
}
