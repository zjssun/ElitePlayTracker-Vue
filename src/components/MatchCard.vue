<script setup lang="ts">
import { Clock } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import type { Matchinfo } from '@/utils/modleType'
import { RenderName, GetMapImg } from '@/utils/ToolBox'
import { GetTime } from '@/utils/GetTime'

const props = defineProps<{ match: Matchinfo }>()
const { t } = useI18n()

const openRoom = () => {
  window.open(props.match.roomUrl, '_blank')
}
</script>

<template>
  <div class="matchCardContainer" @click="openRoom">
    <div class="matchCard-firstRow">
      <p>{{ RenderName(match.nickName) }}</p>
    </div>
    <div class="matchCard-firstRow avgelo">
      <p v-if="match.effectiveRanking !== '0'">
        <span style="margin-right: 4px">{{ t('avgRanks') }}</span>
        <span style="margin-right: 1.5px">{{ match.effectiveRanking }}</span>
        <span style="font-size: var(--small-size)">ELO</span>
      </p>
      <p v-else>{{ t('training') }}</p>
    </div>
    <div class="matchCard-firstRow matchCard-time">
      <Clock class="clock" />
      <p>{{ GetTime(match.timestamp, 'YYYY-MM-DD HH:mm:ss') }}</p>
    </div>
    <div class="matchCard-secondRow">
      <img class="matchCard-map" :src="GetMapImg(match.matchMap)" alt="" />
      <span :class="match.matchResult === 'win' ? 'matchResult-win' : 'matchResult-loss'">
        {{ t(match.matchResult) }}
      </span>
      <span class="matchCard-score">{{ match.matchScore.replace('/', ':') }}</span>
    </div>
    <div class="matchCard-secondRow matchCard-rating">
      <p :class="parseFloat(match.rating) >= 1 ? 'above1' : 'below1'">
        {{ match.rating }}
      </p>
      <p class="matchCard-kd-des">K/D Ratio</p>
    </div>
    <div class="matchCard-secondRow matchCard-kd">
      <p class="total-kd">{{ match.totalKills }}-{{ match.totalDeaths }}</p>
      <p class="total-kd-des">K-D</p>
      <p v-if="match.totalKills === 'unstats'" class="matchCard-stats">{{ t('NotStatistics') }}</p>
      <p v-else class="adr">{{ match.adr }}</p>
      <p class="adr-des">ADR</p>
    </div>
    <div class="matchCard-thirdRow">
      <p><span>{{ t('TripleKills') }}:</span>{{ match.tripleKill }}</p>
      <p><span>{{ t('QuadroKills') }}:</span>{{ match.quadroKill }}</p>
      <p><span>{{ t('PentaKills') }}:</span>{{ match.pentaKill }}</p>
      <p><span>{{ t('Assists') }}:</span>{{ match.totalAssistsl }}</p>
    </div>
  </div>
</template>
