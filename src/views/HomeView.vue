<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from '@/components/Header.vue'
import MatchArea from '@/components/MatchArea.vue'
import Notice from '@/components/Notice.vue'

const checked = ref(false)
const status = ref(false)
const showNotice = ref(false)
const { locale } = useI18n()

const changeMode = () => {
  checked.value = !checked.value
  localStorage.setItem('DarkMode', checked.value.toString())
}

const changeLg = () => {
  const nextStatus = !status.value
  status.value = nextStatus
  if (nextStatus) {
    locale.value = 'en'
    localStorage.setItem('Language', 'en')
  } else {
    locale.value = 'zh'
    localStorage.setItem('Language', 'zh')
  }
}

const handleNoticeClose = () => {
  localStorage.setItem('noticed', 'true')
  showNotice.value = false
}

const initAnalytics = () => {
  const existingScript = document.querySelector(
    'script[src="https://www.googletagmanager.com/gtag/js?id=G-CNLNVT7LF5"]'
  )
  if (!existingScript) {
    const script1 = document.createElement('script')
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-CNLNVT7LF5'
    script1.async = true
    document.head.appendChild(script1)
  }

  const inlineScriptId = 'ga-gtag-inline'
  if (!document.getElementById(inlineScriptId)) {
    const script2 = document.createElement('script')
    script2.id = inlineScriptId
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-CNLNVT7LF5');
    `
    document.head.appendChild(script2)
  }
}

onMounted(() => {
  const noticed = localStorage.getItem('noticed')
  if (!noticed) {
    showNotice.value = true
  }

  initAnalytics()

  const localDarkMode = localStorage.getItem('DarkMode')
  if (localDarkMode !== null) {
    checked.value = localDarkMode === 'true'
  } else {
    localStorage.setItem('DarkMode', 'false')
  }

  const language = localStorage.getItem('Language')
  if (language) {
    if (language === 'zh') {
      locale.value = 'zh'
      status.value = false
    } else {
      locale.value = 'en'
      status.value = true
    }
  } else {
    localStorage.setItem('Language', 'zh')
    locale.value = 'zh'
    status.value = false
  }
})
</script>

<template>
  <div :class="[checked ? 'dark' : 'light', 'Home']">
    <div class="Body">
      <Notice v-if="showNotice" :on-close="handleNoticeClose" />
      <Header
        :is-checked="checked"
        :status="status"
        :change-mode="changeMode"
        :change-language="changeLg"
      />
      <MatchArea />
    </div>
  </div>
</template>
