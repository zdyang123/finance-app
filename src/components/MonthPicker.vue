<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string  // 'YYYY-MM'
  // 控制标签样式：'light' 用于绿色背景(Stats)，'card' 用于白色卡片(AllTransactions)
  variant?: 'light' | 'card'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const visible = ref(false)

const currentDate = computed(() => {
  const [y, m] = props.modelValue.split('-')
  return new Date(parseInt(y), parseInt(m) - 1, 1)
})

const label = computed(() => {
  const [y, m] = props.modelValue.split('-')
  return `${y}年${parseInt(m)}月`
})

const onConfirm = ({ selectedValue }: { selectedValue: (string | number)[] }) => {
  const y = selectedValue[0]
  const m = String(selectedValue[1]).padStart(2, '0')
  emit('update:modelValue', `${y}-${m}`)
  visible.value = false
}
</script>

<template>
  <div class="mp-trigger" :class="variant ?? 'light'" @click="visible = true">
    <span class="mp-label">{{ label }}</span>
    <span class="mp-caret">▾</span>
  </div>

  <nut-datepicker
    v-model="currentDate"
    v-model:visible="visible"
    type="year-month"
    title="选择年月"
    :min-date="new Date(2020, 0, 1)"
    :max-date="new Date(2030, 11, 31)"
    is-show-chinese
    @confirm="onConfirm"
  />
</template>

<style scoped lang="less">
.mp-trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  user-select: none;
  border-radius: 20px;
  padding: 5px 14px 5px 16px;
  transition: opacity 0.15s;

  &:active {
    opacity: 0.72;
  }

  .mp-label {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .mp-caret {
    font-size: 11px;
    margin-top: 1px;
    opacity: 0.7;
  }

  // 用于绿色 header 背景（Stats）
  &.light {
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.28);

    .mp-label,
    .mp-caret {
      color: #fff;
    }
  }

  // 用于白色卡片背景（AllTransactions）
  &.card {
    background: #f0f4f8;
    border: 1.5px solid #e0e8f0;

    .mp-label {
      color: #1c2130;
    }

    .mp-caret {
      color: #8b9cb1;
    }
  }
}
</style>
