<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitDate } from '@/utils/ToolBox'

const props = defineProps<{ time: string }>()
const { t } = useI18n()
const dateRef = ref<HTMLElement | null>(null)
const dateParts = computed(() => {
  const parts = SplitDate(props.time)
  return {
    month: parts[0] ?? '',
    day: parts[1] ?? '',
    year: parts[2] ?? '',
  }
})

let animation: gsap.core.Tween | null = null

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  if (!dateRef.value) return
  animation = gsap.fromTo(
    dateRef.value,
    { 'clip-path': 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0, y: 10 },
    {
      'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: dateRef.value, start: 'top 120%', end: 'bottom 100%', scrub: 1 },
    }
  )
})

onBeforeUnmount(() => {
  if (animation?.scrollTrigger) {
    animation.scrollTrigger.kill()
  }
  animation?.kill()
})
</script>

<template>
  <div class="matchDateContainer" ref="dateRef">
    <p class="matchDateText">
      <span>{{ t(dateParts.month) }}</span>
      <span>{{ dateParts.day }}{{ t('day') }}</span>
      <span>{{ dateParts.year }}</span>
    </p>
  </div>
</template>
