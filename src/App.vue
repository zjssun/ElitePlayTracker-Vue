<script setup lang="ts">
  import { ref } from 'vue';
  import {useThemeStore} from './stores/themeStore'
  import { useI18n } from 'vue-i18n';
  import CustomInput from './components/CustomInput.vue';

  const themeStore = useThemeStore();
  const username = ref<string>('Developer');
  const {t,locale} = useI18n();

  const handleLog=():void=>{
    console.log(`当前用户: ${username.value}, 模式: ${themeStore.isDark}`);
  }

  const toggleLanguage = ()=>{
    locale.value = locale.value === 'zh' ? 'en' : 'zh';
  }
</script>

<template>
  <div :class="{ 'dark-mode': themeStore.isDark }" class="app-container">
    <h1>欢迎回来, {{ username }}</h1>
    
    <CustomInput v-model="username" />

    <div class="controls">
      <p>{{ t('NotFound') }}</p>
      <p>当前状态: {{ themeStore.isDark ? '🌙 夜间' : '☀️ 日间' }}</p>
      <button @click="themeStore.toggleTheme">切换主题</button>
      <button @click="handleLog">打印日志</button>
      <button @click="toggleLanguage">
      {{ locale === 'zh' ? 'Switch to English' : '切换回中文' }}
    </button>
    </div>
  </div>
</template>

<style scoped>
.app-container { padding: 20px; transition: 0.3s; }
.dark-mode { background: #333; color: white; }
</style>
