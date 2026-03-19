import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type AppLanguage = 'zh' | 'en'

const DARK_MODE_KEY = 'DarkMode'
const LANGUAGE_KEY = 'Language'

export const useAppStore = defineStore('app', () => {
  const isDark = ref(false)
  const language = ref<AppLanguage>('zh')
  const isEnglish = computed(() => language.value === 'en')

  const init = () => {
    const localDarkMode = localStorage.getItem(DARK_MODE_KEY)
    if (localDarkMode === null) {
      localStorage.setItem(DARK_MODE_KEY, 'false')
    } else {
      isDark.value = localDarkMode === 'true'
    }

    const localLanguage = localStorage.getItem(LANGUAGE_KEY)
    if (localLanguage === 'zh' || localLanguage === 'en') {
      language.value = localLanguage
    } else {
      localStorage.setItem(LANGUAGE_KEY, language.value)
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem(DARK_MODE_KEY, isDark.value.toString())
  }

  const toggleLanguage = () => {
    language.value = language.value === 'zh' ? 'en' : 'zh'
    localStorage.setItem(LANGUAGE_KEY, language.value)
  }

  return {
    isDark,
    language,
    isEnglish,
    init,
    toggleTheme,
    toggleLanguage,
  }
})

// Keep this alias to avoid breaking old imports.
export const useThemeStore = useAppStore
