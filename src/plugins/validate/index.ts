import * as veeValidate from 'vee-validate'
import rules from '@vee-validate/rules'
import { loadLocaleFromURL, localize } from '@vee-validate/i18n'
import yup from './yup'

// 配置中文
loadLocaleFromURL(
  'https://unpkg.com/@vee-validate/i18n@4.6.9/dist/locale/zh_CN.json'
)
veeValidate.configure({
  generateMessage: localize('zh_CN')
})

Object.keys(rules).forEach(rule => {
  veeValidate.defineRule(rule, rules[rule])
})

const useFileds = (fields: string[]) => {
  fields.forEach(field => {
    veeValidate.useField(field)
  })
}

export * from 'vee-validate'
export { yup, useFileds }
