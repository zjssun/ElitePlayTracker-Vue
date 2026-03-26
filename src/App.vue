<script setup lang="ts">
import type Lenis from 'lenis'
import type { LenisOptions } from 'lenis'
import { VueLenis } from 'lenis/vue'
import { nextTick, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type LenisRootRef = {
  lenis?: Lenis
}

const route = useRoute()
const lenisRef = ref<LenisRootRef | null>(null)
const lenisOptions: LenisOptions = {
  duration: 1,
  smoothWheel: true,
  syncTouch: true,
  gestureOrientation: 'vertical',
  wheelMultiplier: 0.95,
  touchMultiplier: 1,
}

gsap.registerPlugin(ScrollTrigger)

watch(
  () => lenisRef.value?.lenis,
  (lenis, _previousLenis, onCleanup) => {
    if (!lenis) return

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    const updateScrollTrigger = () => {
      ScrollTrigger.update()
    }

    const unsubscribeScroll = lenis.on('scroll', updateScrollTrigger)

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    requestAnimationFrame(() => {
      lenis.resize()
      ScrollTrigger.refresh()
    })

    onCleanup(() => {
      unsubscribeScroll()
      gsap.ticker.remove(updateLenis)
    })
  },
  { immediate: true }
)

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    lenisRef.value?.lenis?.resize()
    ScrollTrigger.refresh()
  }
)
</script>

<template>
  <VueLenis ref="lenisRef" root :auto-raf="false" :options="lenisOptions">
    <RouterView />
  </VueLenis>
</template>
