import type {
  RadioGroupProps,
  RadioProps as RadioPropsType
} from 'element-plus'

export interface OptionsType {
  label: any
  value: any
}

export interface RadioOptionProps extends OptionsType {
  otherRadioProps?: Partial<RadioPropsType>
}

export interface RadioProps {
  radioGroupProps?: Partial<RadioGroupProps>
  radioOptions: RadioOptionProps[]
}
