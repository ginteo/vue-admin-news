import type { FormRenderConfigType } from '@/components/form-render'
import { yup } from '@/plugins/validate'

export const addDialogConfig = {
  pageName: 'admin',
  title: '添加管理员',
  formConfig: {
    formData: [
      { type: 'input', label: '账号', field: 'account' },
      {
        type: 'input',
        label: '密码',
        field: 'password',
        inputProps: { showPassword: true }
      },
      {
        type: 'input',
        label: '确认密码',
        field: 'password_confirm',
        inputProps: { showPassword: true }
      }
    ],
    otherFormProps: {
      labelWidth: '80px',
      labelPosition: 'left',
      validationSchema: yup.object({
        account: yup.string().required().email().label('账号'),
        password: yup.string().required().min(4).label('密码'),
        password_confirm: yup
          .string()
          .required()
          .oneOf([yup.ref('password')], '两次密码输入不一致')
      })
    }
  } as FormRenderConfigType
}

export const editDialogConfig = {
  pageName: 'admin',
  title: '编辑管理员',
  formConfig: {
    formData: [
      {
        type: 'input',
        label: '账号',
        field: 'account',
        inputProps: { disabled: true }
      },
      { type: 'input', label: '昵称', field: 'nickname' },
      { type: 'input', label: '手机号', field: 'tel' },
      {
        type: 'radio',
        label: '状态',
        field: 'status',
        radioProps: {
          radioOptions: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        }
      }
    ],
    otherFormProps: {
      labelWidth: '80px',
      labelPosition: 'left',
      validationSchema: yup.object({
        tel: yup
          .string()
          .optional()
          .nullable()
          .matches(
            /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            { message: '必须是合法手机号' }
          )
      })
    }
  } as FormRenderConfigType
}
