<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CATEGORIES_EXP, CATEGORIES_INC } from '../utils/data'
import { useToast } from '../utils/helpers'
import type { RecordType, Category } from '../types'

const router = useRouter()
const route = useRoute()
const { showToast } = useToast()

const recordType = ref<RecordType>('expense')
const amountStr = ref('')
const selectedCategory = ref('')
const note = ref('')

const categories = computed<Category[]>(() =>
  recordType.value === 'expense' ? CATEGORIES_EXP : CATEGORIES_INC
)

onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = String(route.query.category)
  } else {
    selectedCategory.value = categories.value[0]?.l || ''
  }
})

const formattedAmount = computed(() => {
  return amountStr.value || '0.00'
})

const handleNumberClick = (value: string) => {
  if (value === '.' && amountStr.value.includes('.')) return
  if (amountStr.value.length >= 9) return
  if (value === '.' && amountStr.value === '') {
    amountStr.value = '0'
  }

  // Max 2 decimal places
  if (amountStr.value.includes('.')) {
    const [, decimal] = amountStr.value.split('.')
    if (decimal.length >= 2) return
  }

  amountStr.value += value
}

const handleDelete = () => {
  if (amountStr.value.length > 0) {
    amountStr.value = amountStr.value.slice(0, -1)
  }
}

const handleConfirm = () => {
  const value = parseFloat(amountStr.value)
  if (!amountStr.value || isNaN(value) || value === 0) return

  const typeText = recordType.value === 'expense' ? '支出' : '收入'
  showToast(`✅ ${typeText} ¥${value.toFixed(2)} 已记录`)

  amountStr.value = ''
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 400)
}

const setType = (type: RecordType) => {
  recordType.value = type
  selectedCategory.value = categories.value[0]?.l || ''
}

const selectCategory = (catName: string) => {
  selectedCategory.value = catName
}
</script>

<template>
  <div class="screen-content">
    <div class="rec-type-bar">
      <div class="type-tabs">
        <div
          class="type-tab"
          :class="{ active: recordType === 'income' }"
          @click="setType('income')"
        >
          收入
        </div>
        <div
          class="type-tab"
          :class="{ active: recordType === 'expense' }"
          @click="setType('expense')"
        >
          支出
        </div>
      </div>
    </div>

    <div class="amount-zone">
      <span class="az-prefix">¥</span>
      <span class="az-number">{{ formattedAmount }}</span>
    </div>

    <div class="cat-grid">
      <div
        v-for="cat in categories"
        :key="cat.l"
        class="cat-btn"
        :class="{ sel: selectedCategory === cat.l }"
        @click="selectCategory(cat.l)"
      >
        <span class="cat-emoji">{{ cat.e }}</span>
        <span class="cat-text">{{ cat.l }}</span>
      </div>
    </div>

    <div class="note-row">
      <input
        v-model="note"
        class="note-inp"
        type="text"
        placeholder="💬 添加备注（选填）"
      />
    </div>

    <div style="flex: 1"></div>

    <div class="numpad">
      <div class="np-btn np-d" @click="handleNumberClick('7')">7</div>
      <div class="np-btn np-d" @click="handleNumberClick('8')">8</div>
      <div class="np-btn np-d" @click="handleNumberClick('9')">9</div>
      <div class="np-btn np-ok" @click="handleConfirm">确认</div>

      <div class="np-btn np-d" @click="handleNumberClick('4')">4</div>
      <div class="np-btn np-d" @click="handleNumberClick('5')">5</div>
      <div class="np-btn np-d" @click="handleNumberClick('6')">6</div>

      <div class="np-btn np-d" @click="handleNumberClick('1')">1</div>
      <div class="np-btn np-d" @click="handleNumberClick('2')">2</div>
      <div class="np-btn np-d" @click="handleNumberClick('3')">3</div>

      <div class="np-btn np-sp" @click="handleNumberClick('.')">.</div>
      <div class="np-btn np-d" style="grid-column: span 2" @click="handleNumberClick('0')">0</div>
      <div class="np-btn np-sp" @click="handleDelete">⌫</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.screen-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  .rec-type-bar {
    background: #ffffff;
    padding: 16px 20px;

    .type-tabs {
      display: flex;
      background: #f0f4f8;
      border-radius: 10px;
      padding: 4px;

      .type-tab {
        flex: 1;
        text-align: center;
        padding: 9px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #8b9cb1;
        cursor: pointer;
        transition: all 0.22s;

        &.active {
          background: #3ecfb2;
          color: #fff;
          box-shadow: 0 2px 8px rgba(62, 207, 178, 0.4);
        }
      }
    }
  }

  .amount-zone {
    padding: 26px 24px 16px;
    text-align: center;

    .az-prefix {
      font-size: 22px;
      color: #8b9cb1;
    }

    .az-number {
      font-family: 'Space Mono', monospace;
      font-size: 50px;
      font-weight: 700;
      color: #1c2130;
      letter-spacing: -2px;
    }
  }

  .cat-grid {
    padding: 0 14px 14px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 9px;

    .cat-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 12px 6px;
      border-radius: 14px;
      background: #ffffff;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid transparent;

      .cat-emoji {
        font-size: 22px;
      }

      .cat-text {
        font-size: 11px;
        color: #8b9cb1;
        font-weight: 500;
      }

      &.sel {
        border-color: #3ecfb2;
        background: #e6f9f6;

        .cat-text {
          color: #28b39a;
        }
      }
    }
  }

  .note-row {
    padding: 0 18px 14px;

    .note-inp {
      width: 100%;
      padding: 12px 16px;
      border-radius: 13px;
      border: none;
      background: #ffffff;
      font-family: 'Noto Sans SC', sans-serif;
      font-size: 14px;
      color: #1c2130;
      outline: none;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);

      &::placeholder {
        color: #8b9cb1;
      }
    }
  }

  .numpad {
    background: #ffffff;
    padding: 10px 14px 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;

    .np-btn {
      padding: 18px 0;
      text-align: center;
      border-radius: 13px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
      user-select: none;
      transition: transform 0.1s, opacity 0.1s;
      border: none;
      font-family: 'Noto Sans SC', sans-serif;

      &:active {
        transform: scale(0.9);
        opacity: 0.75;
      }

      &.np-d {
        background: #f0f4f8;
        color: #1c2130;
      }

      &.np-sp {
        background: #eef1f5;
        color: #8b9cb1;
        font-size: 15px;
      }

      &.np-ok {
        background: linear-gradient(135deg, #3ecfb2, #28b39a);
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        grid-row: span 2;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 13px;
        box-shadow: 0 4px 16px rgba(62, 207, 178, 0.4);
      }
    }
  }
}
</style>
