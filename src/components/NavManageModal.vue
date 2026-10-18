<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { GripVertical, X } from 'lucide-vue-next'
import { useAppStore } from '@/stores/themeStore'
import { GetPlayerImg } from '@/utils/ToolBox'

const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const appStore = useAppStore()
const { navOrder, hiddenPlayers } = storeToRefs(appStore)

const dragIndex = ref(-1)

const onDragStart = (index: number, event: PointerEvent) => {
  dragIndex.value = index
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}
const onDragMove = (event: PointerEvent) => {
  if (dragIndex.value < 0) {
    return
  }
  const target = document
    .elementFromPoint(event.clientX, event.clientY)
    ?.closest('.navmanage-row')
  if (!target) {
    return
  }
  const targetIndex = Number((target as HTMLElement).dataset.index)
  if (Number.isNaN(targetIndex) || targetIndex === dragIndex.value) {
    return
  }
  const order = [...navOrder.value]
  const moved = order.splice(dragIndex.value, 1)[0]
  if (moved === undefined) {
    return
  }
  order.splice(targetIndex, 0, moved)
  dragIndex.value = targetIndex
  appStore.saveNavConfig(order, hiddenPlayers.value)
}
const onDragEnd = () => {
  dragIndex.value = -1
}

const toggleVisible = (player: string) => {
  const hidden = hiddenPlayers.value.includes(player)
    ? hiddenPlayers.value.filter((p) => p !== player)
    : [...hiddenPlayers.value, player]
  appStore.saveNavConfig(navOrder.value, hidden)
}

const reset = () => {
  appStore.resetNavConfig()
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-panel navmanage-panel">
      <div class="modal-header">
        <h3>{{ t('navSettings') }}</h3>
        <button class="modal-close" type="button" @click="emit('close')">
          <X :size="18" />
        </button>
      </div>
      <ul class="navmanage-list" data-lenis-prevent>
        <li
          v-for="(player, index) in navOrder"
          :key="player"
          class="navmanage-row"
          :class="{ dragging: dragIndex === index }"
          :data-index="index"
        >
          <span
            class="drag-handle"
            @pointerdown="onDragStart(index, $event)"
            @pointermove="onDragMove"
            @pointerup="onDragEnd"
            @pointercancel="onDragEnd"
          >
            <GripVertical :size="16" />
          </span>
          <img class="navmanage-avatar" :src="GetPlayerImg(player)" :alt="player" />
          <span class="navmanage-name">{{ t(player) }}</span>
          <label class="navmanage-switch">
            <input
              type="checkbox"
              :checked="!hiddenPlayers.includes(player)"
              @change="toggleVisible(player)"
            />
            <span class="navmanage-slider"></span>
          </label>
        </li>
      </ul>
      <button class="navmanage-reset" type="button" @click="reset">{{ t('reset') }}</button>
    </div>
  </div>
</template>
