<script setup lang="ts">
defineProps<{
  onClose: () => void
}>()
</script>

<template>
  <div class="notice-container">
    <div class="notice-content">
      <p class="notice-title">🛠️域名即将更改⚒️</p>
      <p>可以访问新域名:</p>
      <p class="notice-link"><a class="notice-link" href="https://eptracker.xyz">https://eptracker.xyz</a></p>
      <p>🗑️本域名将在⏱️8月4日下线🔜</p>
      <p>👁️‍🗨️当旧域名到期后,新域名会加上SSL证书。</p>
      <button @click="onClose" class="notice-button">知道了</button>
    </div>
  </div>
</template>
