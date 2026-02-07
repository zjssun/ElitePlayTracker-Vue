<script setup lang="ts">
import { ref } from 'vue'
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

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <img :src="isChecked ? logoDark : logoLight" alt="logo" />
      <span>Elite Play Tracker</span>
    </div>
    <div class="header-actions" :class="{ open: isMenuOpen }" id="header-menu">
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
