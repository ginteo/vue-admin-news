import type { ISelectProps } from 'element-plus'
import type { OptionsType } from './radio.type'

export interface SelectOptionsProp extends OptionsType {
  disabled?: boolean
}

export interface SelectProps {
  otherSelectProps?: Partial<ISelectProps>
  options: SelectOptionsProp[]
}
