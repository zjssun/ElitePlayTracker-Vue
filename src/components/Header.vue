<script setup lang="ts">
import logoDark from '@/assets/img/ept_logo_dark.png'
import logoLight from '@/assets/img/ept_logo_light.png'
import { Github, Sun, Moon } from 'lucide-vue-next'

defineProps<{
  isChecked: boolean
  status: boolean
  changeMode: () => void
  changeLanguage: () => void
}>()
</script>

<template>
  <header class="header">
    <div class="logo">
      <img :src="isChecked ? logoDark : logoLight" alt="logo" />
      <span>Elite Play Tracker</span>
    </div>
    <div class="spacer"></div>
    <label class="language">
      <input type="checkbox" :checked="status" @change="changeLanguage" class="" />
    </label>

    <a href="https://github.com/zjssun/ElitePlayTracker-React" target="_blank" class="header-github">
      <Github :size="36" />
    </a>

    <label class="toggle" for="switch">
      <input id="switch" :checked="isChecked" @change="changeMode" type="checkbox" />
      <div class="icon icon--sun">
        <Sun :size="28" />
      </div>
      <div class="icon icon--moon">
        <Moon :size="28" />
      </div>
    </label>
  </header>
</template>
