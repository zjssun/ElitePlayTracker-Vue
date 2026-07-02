<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const NOTICE_DISMISSED_STORAGE_KEY = 'notice-domain-change-dismissed'

const createLocalDate = (
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
) => new Date(year, month - 1, day, hour, minute, second)

const NOTICE_START_AT = createLocalDate(2026, 6, 2, 0, 0, 0)
const NOTICE_END_AT = createLocalDate(2026, 8, 15, 23, 59, 59)

const now = ref(Date.now())
const isClosed = ref(false)

let timer: ReturnType<typeof window.setInterval> | null = null

const showNotice = computed(() => {
  const current = now.value
  return !isClosed.value && current >= NOTICE_START_AT.getTime() && current <= NOTICE_END_AT.getTime()
})

const closeNotice = () => {
  isClosed.value = true
  localStorage.setItem(NOTICE_DISMISSED_STORAGE_KEY, 'true')
}

onMounted(() => {
  isClosed.value = localStorage.getItem(NOTICE_DISMISSED_STORAGE_KEY) === 'true'
  timer = window.setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer !== null) {
    window.clearInterval(timer)
  }
})
</script>

<template>
  <div v-if="showNotice" class="notice-container">
    <div class="notice-content">
      <p class="notice-title">🛠️域名即将更改⚒️</p>
      <p>可以访问新域名:</p>
      <p class="notice-link"><a class="notice-link" href="https://eptracker.de">https://eptracker.de</a></p>
      <p>🗑️本域名将在⏱️2026年7月15日下线🔜</p>
      <p>👁️‍🗨️当旧域名到期后,新域名会加上SSL证书。</p>
      <button @click="closeNotice" class="notice-button">知道了</button>
    </div>
  </div>
</template>
