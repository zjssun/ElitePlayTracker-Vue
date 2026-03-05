<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MatchDate from '@/components/MatchDate.vue'
import MatchCard from '@/components/MatchCard.vue'
import { getMatchByName } from '@/utils/api'
import { GetTimeList, GetTimeListFromMatch } from '@/utils/GetTime'
import type { Matchinfo } from '@/utils/modleType'

const route = useRoute()
const { t } = useI18n()

const responseData = ref<Matchinfo[]>([])
const loading = ref(true)
const hasLoadedOnce = ref(false)
const renderKey = ref(0)
let requestId = 0

const loadMatches = async (player: string) => {
  const currentRequestId = ++requestId
  if (!hasLoadedOnce.value) {
    loading.value = true
  }

  try {
    const response = await getMatchByName(player)
    if (currentRequestId !== requestId) {
      return
    }
    responseData.value = response.data.data
    if (hasLoadedOnce.value) {
      renderKey.value += 1
    } else {
      hasLoadedOnce.value = true
    }
  } catch (error) {
    if (currentRequestId !== requestId) {
      return
    }
    responseData.value = []
    if (hasLoadedOnce.value) {
      renderKey.value += 1
    } else {
      hasLoadedOnce.value = true
    }
  } finally {
    if (currentRequestId === requestId) {
      loading.value = false
    }
  }
}

watch(
  () => route.params.player,
  (player) => {
    const normalizedPlayer = String(player ?? '').toLowerCase()
    loadMatches(normalizedPlayer)
  },
  { immediate: true }
)

const timeList = computed(() => GetTimeList(responseData.value) as string[])
const timeListFromMatch = computed(
  () => GetTimeListFromMatch(responseData.value) as Matchinfo[][]
)
</script>

<template>
  <div class="match-view-viewport">
    <div v-if="loading">Loading...</div>
    <Transition v-else name="match-content-slide" mode="out-in">
      <div :key="renderKey" class="match-view-panel">
        <div class="static">-{{ t('total') }}{{ responseData.length }}{{ t('totalResult') }}-</div>
        <div class="match-container">
          <template v-for="(time, index) in timeList" :key="time">
            <MatchDate :time="time" />
            <template
              v-for="(match, matchIndex) in timeListFromMatch[index]"
              :key="match.matchId || matchIndex"
            >
              <MatchCard :match="match" />
            </template>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>
