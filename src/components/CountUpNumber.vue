<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  value: number
  duration?: number
  format?: (value: number) => string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1000,
  format: (v: number) => v.toString(),
})

const displayValue = ref(0)

onMounted(() => {
  animateValue()
})

watch(() => props.value, () => {
  displayValue.value = 0
  animateValue()
})

const animateValue = () => {
  const startTime = Date.now()
  const startValue = displayValue.value
  const endValue = props.value

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    const currentValue = Math.floor(startValue + (endValue - startValue) * progress)
    displayValue.value = currentValue

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  animate()
}
</script>

<template>
  <span class="count-up-number">{{ props.format(displayValue) }}</span>
</template>

<style scoped lang="less">
.count-up-number {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
}
</style>
