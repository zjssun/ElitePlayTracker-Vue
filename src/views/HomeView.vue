<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import Header from '@/components/Header.vue'
import MatchArea from '@/components/MatchArea.vue'
import Notice from '@/components/Notice.vue'
import { useAppStore } from '@/stores/themeStore'

const appStore = useAppStore()
const { isDark, language, showNotice } = storeToRefs(appStore)
const { locale } = useI18n()

const handleNoticeClose = () => {
  appStore.dismissNotice()
}

onMounted(() => {
  appStore.init()
})

watch(
  language,
  (value) => {
    locale.value = value
  },
  { immediate: true }
)
</script>

<template>
  <div :class="[isDark ? 'dark' : 'light', 'Home']">
    <div class="Body">
      <Notice v-if="showNotice" :on-close="handleNoticeClose" />
      <Header />
      <MatchArea />
    </div>
  </div>
</template>
