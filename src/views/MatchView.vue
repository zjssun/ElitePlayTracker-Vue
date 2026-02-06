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

const loadMatches = async () => {
  loading.value = true
  const player = String(route.params.player ?? '').toLowerCase()
  try {
    const response = await getMatchByName(player)
    responseData.value = response.data.data
  } catch (error) {
    responseData.value = []
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.player,
  () => {
    loadMatches()
  },
  { immediate: true }
)

const timeList = computed(() => GetTimeList(responseData.value) as string[])
const timeListFromMatch = computed(
  () => GetTimeListFromMatch(responseData.value) as Matchinfo[][]
)
</script>

<template>
  <div v-if="loading">Loading...</div>
  <template v-else>
    <div class="static">-{{ t('total') }}{{ responseData.length }}{{ t('totalResult') }}-</div>
    <div class="match-container">
      <template v-for="(time, index) in timeList" :key="time">
        <MatchDate :time="time" />
        <template v-for="(match, matchIndex) in timeListFromMatch[index]" :key="match.matchId || matchIndex">
          <MatchCard :match="match" />
        </template>
      </template>
    </div>
  </template>
</template>
