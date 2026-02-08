<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import avatar from '@/assets/img/sam.jpg'

const { t } = useI18n()

const links = [
  {
    key: 'steam',
    labelKey: 'aboutSteam',
    href: 'https://steamcommunity.com/profiles/76561198359916930/',
    display: 'steamcommunity.com',
  },
  {
    key: 'bilibili',
    labelKey: 'aboutBilibili',
    href: 'https://space.bilibili.com/297554655',
    display: 'space.bilibili.com',
  },
  {
    key: 'github',
    labelKey: 'aboutGithub',
    href: 'https://github.com/zjssun/ElitePlayTracker-Vue',
    display: 'github.com',
  },
]
</script>

<template>
  <div class="about-container">
    <section class="about-card">
      <div class="about-header">
        <img class="about-avatar" :src="avatar" alt="avatar" />
        <div class="about-title">
          <p class="about-kicker">{{ t('about') }}</p>
          <h1>{{ t('aboutName') }}</h1>
          <p class="about-tagline">{{ t('aboutTagline') }}</p>
        </div>
      </div>
      <div class="about-links">
        <a
          v-for="link in links"
          :key="link.key"
          class="about-link"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="about-link-label">{{ t(link.labelKey) }}</span>
          <span class="about-link-url">{{ link.display }}</span>
        </a>
      </div>
    </section>
  </div>
</template>
