import type {
  RowProps,
  ColProps,
  FormProps,
  FormItemProps,
  InputProps,
  TimePickerDefaultProps
} from 'element-plus'
import type { RadioProps } from './radio.type'
import type { SelectProps } from './select.type'

export interface OtherFormProps extends Partial<FormProps> {
  validationSchema?: Record<string, any>
}

export interface FormRenderItemType {
  type: 'input' | 'radio' | 'select' | 'date-picker'
  field: string // FormItemProps的prop属性
  label: string // FormItemProps的label属性
  inputProps?: Partial<InputProps>
  radioProps?: RadioProps
  selectProps?: SelectProps
  datePickerProps?: Partial<TimePickerDefaultProps>
  otherFormItemProps?: Partial<FormItemProps>
}

export interface FormRenderConfigType {
  formData: FormRenderItemType[]
  rowProps?: Partial<RowProps> // el-row属性
  colProps?: Partial<ColProps> // el-col属性
  otherFormProps?: OtherFormProps
}
