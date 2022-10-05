import type { FormRenderConfigType } from '@/components/form-render'
import { yup } from '@/plugins/validate'

export const formConfig: FormRenderConfigType = {
  formData: [
    {
      type: 'input',
      label: '账号',
      field: 'account'
    },
    {
      type: 'input',
      label: '密码',
      field: 'password',
      inputProps: {
        showPassword: true
      }
    }
  ],
  otherFormProps: {
    labelWidth: '60px',
    labelPosition: 'left',
    validationSchema: yup.object({
      account: yup.string().required().label('账号'),
      password: yup.string().required().label('密码')
    })
  }
}
