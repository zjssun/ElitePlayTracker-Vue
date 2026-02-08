<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import logoDark from '@/assets/img/ept_logo_dark.png'
import logoLight from '@/assets/img/ept_logo_light.png'
import { Sun, Moon, Menu, X } from 'lucide-vue-next'

defineProps<{
  isChecked: boolean
  status: boolean
  changeMode: () => void
  changeLanguage: () => void
}>()

const isMenuOpen = ref(false)
const { t } = useI18n()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <RouterLink class="logo" to="/donk">
      <img :src="isChecked ? logoDark : logoLight" alt="logo" />
      <span>Elite Play Tracker</span>
    </RouterLink>
    <div class="header-actions" :class="{ open: isMenuOpen }" id="header-menu">
      <RouterLink
        class="header-link"
        to="/about"
        active-class="header-link--active"
        @click="closeMenu"
      >
        {{ t('about') }}
      </RouterLink>
      <label class="language">
        <input type="checkbox" :checked="status" @change="changeLanguage" />
      </label>

      <label class="toggle" for="switch">
        <input id="switch" :checked="isChecked" @change="changeMode" type="checkbox" />
        <div class="icon icon--sun">
          <Sun :size="28" />
        </div>
        <div class="icon icon--moon">
          <Moon :size="28" />
        </div>
      </label>
    </div>
    <button
      class="hamburger"
      type="button"
      :aria-expanded="isMenuOpen ? 'true' : 'false'"
      aria-controls="header-menu"
      @click="toggleMenu"
    >
      <Menu v-if="!isMenuOpen" :size="28" />
      <X v-else :size="28" />
    </button>
  </header>
</template>
