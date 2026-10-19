<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { X } from 'lucide-vue-next'
import { getVoteStats, voteForPlayer } from '@/utils/api'
import type { VoteStat } from '@/utils/modleType'

const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()

const VOTED_KEY = 'VotedNames'

const name = ref('')
const stats = ref<VoteStat[]>([])
const submitting = ref(false)
const errorMsg = ref('')
const votedNames = ref<string[]>(
  (() => {
    try {
      return JSON.parse(localStorage.getItem(VOTED_KEY) || '[]')
    } catch {
      return []
    }
  })()
)

const statsContainer = ref<HTMLElement | null>(null)
const maxVotes = computed(() => Math.max(1, ...stats.value.map((s) => s.votes)))
const NAME_SCROLL_GAP = 12

const updateNameScroll = () => {
  nextTick(() => {
    statsContainer.value
      ?.querySelectorAll<HTMLElement>('.vote-name-text')
      .forEach((el) => {
        const parent = el.parentElement
        if (!parent) {
          return
        }
        const overflow = el.scrollWidth - parent.clientWidth
        if (overflow > 0) {
          el.classList.add('scrolling')
          el.style.setProperty('--scroll-dist', `${-(overflow + NAME_SCROLL_GAP)}px`)
        } else {
          el.classList.remove('scrolling')
          el.style.removeProperty('--scroll-dist')
        }
      })
  })
}

const loadStats = async () => {
  try {
    const response = await getVoteStats()
    stats.value = response.data.data ?? []
    updateNameScroll()
  } catch {
    stats.value = []
  }
}

const submitVote = async () => {
  const trimmed = name.value.trim().replace(/\s+/g, ' ')
  if (!trimmed || submitting.value) {
    return
  }
  const key = trimmed.toLowerCase()
  if (votedNames.value.includes(key)) {
    errorMsg.value = t('voteDuplicate')
    return
  }
  submitting.value = true
  errorMsg.value = ''
  try {
    await voteForPlayer(trimmed)
    votedNames.value = [...votedNames.value, key]
    localStorage.setItem(VOTED_KEY, JSON.stringify(votedNames.value))
    name.value = ''
    await loadStats()
  } catch {
    errorMsg.value = t('voteFailed')
  } finally {
    submitting.value = false
  }
}

onMounted(loadStats)
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-panel vote-panel">
      <div class="modal-header">
        <h3>{{ t('vote') }}</h3>
        <button class="modal-close" type="button" @click="emit('close')">
          <X :size="18" />
        </button>
      </div>

      <div class="vote-input-row">
        <input
          v-model="name"
          class="vote-input"
          type="text"
          maxlength="32"
          :placeholder="t('votePlaceholder')"
          @keyup.enter="submitVote"
        />
        <button class="vote-submit" type="button" :disabled="submitting" @click="submitVote">
          {{ t('voteSubmit') }}
        </button>
      </div>
      <p v-if="errorMsg" class="vote-error">{{ errorMsg }}</p>

      <div ref="statsContainer" class="vote-stats" data-lenis-prevent>
        <p v-if="!stats.length" class="vote-empty">{{ t('voteEmpty') }}</p>
        <div v-for="(stat, index) in stats" :key="stat.nameKey" class="vote-row">
          <span class="vote-name"><span class="vote-name-text">{{ stat.name }}</span></span>
          <div class="vote-bar-wrap">
            <div
              class="vote-bar"
              :style="{
                width: `${(stat.votes / maxVotes) * 100}%`,
                'animation-delay': `${index * 0.05}s`,
              }"
            ></div>
            <span class="vote-count">{{ stat.votes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
