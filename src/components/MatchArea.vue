<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { playerList, GetPlayerImg } from '@/utils/ToolBox'

const { t } = useI18n()
const getPlayerImg = (player: string) => GetPlayerImg(player)
</script>

<template>
  <div class="matchArea-container">
    <hgroup class="matchArea-hgroup">
      <RouterLink
        v-for="player in playerList"
        :key="player"
        :to="`/${player}`"
        class="baseNavLink"
        active-class="baseNavLink-active"
        exact-active-class="baseNavLink-active"
      >
        <img v-if="getPlayerImg(player)" class="avatar-img" :src="getPlayerImg(player)" />
        <span>{{ t(player) }}</span>
      </RouterLink>
    </hgroup>
    <RouterView />
  </div>
</template>
