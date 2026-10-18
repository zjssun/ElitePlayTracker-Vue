<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { Settings, Vote } from 'lucide-vue-next'
import { GetPlayerImg } from '@/utils/ToolBox'
import { useAppStore } from '@/stores/themeStore'
import NavManageModal from '@/components/NavManageModal.vue'
import VoteModal from '@/components/VoteModal.vue'

const { t } = useI18n()
const route = useRoute()
const appStore = useAppStore()
const { visiblePlayers } = storeToRefs(appStore)
const showPlayerNav = computed(() => route.path !== '/about')
const getPlayerImg = (player: string) => GetPlayerImg(player)

const showNavManage = ref(false)
const showVote = ref(false)
</script>

<template>
  <div class="matchArea-container">
    <hgroup v-if="showPlayerNav" class="matchArea-hgroup">
      <RouterLink
        v-for="player in visiblePlayers"
        :key="player"
        :to="`/${player}`"
        class="baseNavLink"
        active-class="baseNavLink-active"
        exact-active-class="baseNavLink-active"
      >
        <img v-if="getPlayerImg(player)" class="avatar-img" :src="getPlayerImg(player)" />
        <span>{{ t(player) }}</span>
      </RouterLink>
      <button
        class="nav-tool-btn"
        type="button"
        :title="t('navSettings')"
        @click="showNavManage = true"
      >
        <Settings :size="22" />
      </button>
      <button class="nav-tool-btn" type="button" :title="t('vote')" @click="showVote = true">
        <Vote :size="22" />
      </button>
    </hgroup>
    <RouterView />
    <Transition name="modal-pop">
      <NavManageModal v-if="showNavManage" @close="showNavManage = false" />
    </Transition>
    <Transition name="modal-pop">
      <VoteModal v-if="showVote" @close="showVote = false" />
    </Transition>
  </div>
</template>
