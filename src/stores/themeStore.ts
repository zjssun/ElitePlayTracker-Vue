import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { playerList } from '@/utils/ToolBox'

type AppLanguage = 'zh' | 'en'

const DARK_MODE_KEY = 'DarkMode'
const LANGUAGE_KEY = 'Language'
const PLAYER_NAV_KEY = 'PlayerNavConfig'

export const useAppStore = defineStore('app', () => {
  const isDark = ref(false)
  const language = ref<AppLanguage>('zh')
  const isEnglish = computed(() => language.value === 'en')
  const navOrder = ref<string[]>([...playerList])
  const hiddenPlayers = ref<string[]>([])

  const visiblePlayers = computed(() =>
    navOrder.value.filter((player) => !hiddenPlayers.value.includes(player))
  )

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

    try {
      const saved = JSON.parse(localStorage.getItem(PLAYER_NAV_KEY) || 'null')
      const savedOrder: string[] = Array.isArray(saved?.order)
        ? saved.order.filter((p: string) => playerList.includes(p))
        : []
      navOrder.value = [...savedOrder, ...playerList.filter((p) => !savedOrder.includes(p))]
      hiddenPlayers.value = Array.isArray(saved?.hidden)
        ? saved.hidden.filter((p: string) => playerList.includes(p))
        : []
    } catch {
      navOrder.value = [...playerList]
      hiddenPlayers.value = []
    }
  }

  const saveNavConfig = (order: string[], hidden: string[]) => {
    navOrder.value = [...order]
    hiddenPlayers.value = [...hidden]
    localStorage.setItem(
      PLAYER_NAV_KEY,
      JSON.stringify({ order: navOrder.value, hidden: hiddenPlayers.value })
    )
  }

  const resetNavConfig = () => {
    saveNavConfig([...playerList], [])
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
    navOrder,
    hiddenPlayers,
    visiblePlayers,
    init,
    toggleTheme,
    toggleLanguage,
    saveNavConfig,
    resetNavConfig,
  }
})

// Keep this alias to avoid breaking old imports.
export const useThemeStore = useAppStore
