import {createI18n} from 'vue-i18n'

import en from './en.json'
import zh from './zh.json'

export type MessageSchema = typeof zh;

const i18n = createI18n<[MessageSchema],'zh'|'en'>({
   legacy: false,
   locale: 'zh',
   fallbackLocale: 'en',
   messages: {
      en,
      zh
   }
})

export default i18n;