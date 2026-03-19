<script setup lang="ts">
import { computed, ref } from 'vue'

// 2026, 1, 19, 0, 0, 0 表示2026年1月19日0点0分0秒
// 2026, 1, 31, 23, 59, 59 
const NOTICE_START_AT = new Date(2026, 1, 19, 0, 0, 0)
const NOTICE_END_AT = new Date(2026, 1, 31, 23, 59, 59)

const isNoticeInRange = () => {
  const now = Date.now()
  return now >= NOTICE_START_AT.getTime() && now <= NOTICE_END_AT.getTime()
}

const isClosed = ref(false)
const showNotice = computed(() => !isClosed.value && isNoticeInRange())

const closeNotice = () => {
  isClosed.value = true
}
</script>

<template>
  <div v-if="showNotice" class="notice-container">
    <div class="notice-content">
      <p class="notice-title">🛠️域名即将更改⚒️</p>
      <p>可以访问新域名:</p>
      <p class="notice-link"><a class="notice-link" href="https://eptracker.xyz">https://eptracker.xyz</a></p>
      <p>🗑️本域名将在⏱️2025年8月4日下线🔜</p>
      <p>👁️‍🗨️当旧域名到期后,新域名会加上SSL证书。</p>
      <button @click="closeNotice" class="notice-button">知道了</button>
    </div>
  </div>
</template>
