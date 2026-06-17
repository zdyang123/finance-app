<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ALL_TRANSACTIONS } from '../utils/data'
import { useFormatCurrency } from '../utils/helpers'
import type { Transaction } from '../types'
import MonthPicker from '../components/MonthPicker.vue'

const router = useRouter()
const activeFilter = ref<'all' | 'exp' | 'inc'>('all')

// 默认选最新月份
const latestMonth = ALL_TRANSACTIONS.reduce((acc, tx) => {
  const m = tx.date?.slice(0, 7) ?? ''
  return m > acc ? m : acc
}, '')
const selectedMonth = ref(latestMonth)

const filtered = computed(() => {
  const byMonth = ALL_TRANSACTIONS.filter((tx) => tx.date?.startsWith(selectedMonth.value))
  if (activeFilter.value === 'all') return byMonth
  return byMonth.filter((tx) => tx.type === activeFilter.value)
})

const grouped = computed(() => {
  const map = new Map<string, Transaction[]>()
  for (const tx of filtered.value) {
    const key = tx.date ?? '未知日期'
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(tx)
  }
  return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
})

const formatDateLabel = (dateStr: string) => {
  const today = new Date()
  const d = new Date(dateStr)
  const diff = Math.floor((today.getTime() - d.getTime()) / 86400000)
  if (diff === 0) return '今天'
  if (diff === 1) return '昨天'
  const m = d.getMonth() + 1
  const day = d.getDate()
  return `${m}月${day}日`
}

const dayTotal = (txs: Transaction[]) => {
  const exp = txs.filter((t) => t.type === 'exp').reduce((s, t) => s + t.amt, 0)
  const inc = txs.filter((t) => t.type === 'inc').reduce((s, t) => s + t.amt, 0)
  return { exp, inc }
}
</script>

<template>
  <div class="screen-content">
    <!-- Header区域 -->
    <div class="page-header">
      <div class="ph-top">
        <div class="back-btn" @click="router.back()">
          <span class="back-icon">‹</span>
        </div>
        <div class="ph-title">全部账单</div>
        <div class="ph-placeholder"></div>
      </div>

      <!-- 筛选 Tab -->
      <div class="filter-tabs">
        <div
          class="ftab"
          :class="{ active: activeFilter === 'all' }"
          @click="activeFilter = 'all'"
        >
          全部
        </div>
        <div
          class="ftab"
          :class="{ active: activeFilter === 'exp' }"
          @click="activeFilter = 'exp'"
        >
          支出
        </div>
        <div
          class="ftab"
          :class="{ active: activeFilter === 'inc' }"
          @click="activeFilter = 'inc'"
        >
          收入
        </div>
      </div>
    </div>

    <!-- 按日期分组的交易列表 -->
    <div class="list-body">
      <!-- 月份选择器 -->
      <div class="month-picker-row">
        <MonthPicker v-model="selectedMonth" variant="card" />
      </div>
      <div v-for="([date, txs]) in grouped" :key="date" class="day-group">
        <!-- 日期分隔行 -->
        <div class="day-header">
          <span class="day-label">{{ formatDateLabel(date) }}</span>
          <div class="day-totals">
            <span v-if="dayTotal(txs).inc > 0" class="day-inc">
              +¥{{ useFormatCurrency(dayTotal(txs).inc) }}
            </span>
            <span v-if="dayTotal(txs).exp > 0" class="day-exp">
              -¥{{ useFormatCurrency(dayTotal(txs).exp) }}
            </span>
          </div>
        </div>

        <!-- 当日交易 -->
        <div class="tx-list">
          <div v-for="(tx, i) in txs" :key="i" class="tx-item">
            <div class="tx-icon" :style="{ background: tx.bg }">{{ tx.icon }}</div>
            <div class="tx-info">
              <div class="tx-name">{{ tx.name }}</div>
              <div class="tx-meta">{{ tx.meta }}</div>
            </div>
            <div class="tx-amt" :class="tx.type">
              {{ tx.type === 'exp' ? '-' : '+' }}¥{{ useFormatCurrency(tx.amt) }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="grouped.length === 0" class="empty">
        <div class="empty-icon">📭</div>
        <div class="empty-text">暂无记录</div>
      </div>

      <div class="pb"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.screen-content {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }

  .page-header {
    background: linear-gradient(140deg, #3ecfb2 0%, #28b39a 55%, #1e9e8a 100%);
    padding: 16px 24px 0;
    position: relative;
    flex-shrink: 0;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -40px;
      right: -40px;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
    }

    .ph-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      position: relative;
      z-index: 1;

      .back-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.18s;

        &:active {
          transform: scale(0.88);
        }

        .back-icon {
          font-size: 22px;
          color: #fff;
          line-height: 1;
          margin-top: -2px;
        }
      }

      .ph-title {
        font-size: 17px;
        font-weight: 700;
        color: #fff;
        letter-spacing: 0.3px;
      }

      .ph-placeholder {
        width: 36px;
      }
    }

    .filter-tabs {
      display: flex;
      gap: 8px;
      position: relative;
      z-index: 1;
      margin-bottom: -1px;

      .ftab {
        padding: 8px 20px;
        border-radius: 12px 12px 0 0;
        font-size: 13px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        transition: all 0.2s;
        background: transparent;

        &.active {
          background: #f0f4f8;
          color: var(--primary);
        }

        &:not(.active):active {
          color: #fff;
          background: rgba(255, 255, 255, 0.15);
        }
      }
    }
  }

  .list-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px 18px 0;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .month-picker-row {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }

    .day-group {
      margin-bottom: 18px;

      .day-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4px 8px;

        .day-label {
          font-size: 13px;
          font-weight: 700;
          color: #8b9cb1;
          letter-spacing: 0.3px;
        }

        .day-totals {
          display: flex;
          gap: 10px;

          .day-exp {
            font-size: 12px;
            font-family: 'Space Mono', monospace;
            color: #ff6b6b;
            font-weight: 600;
          }

          .day-inc {
            font-size: 12px;
            font-family: 'Space Mono', monospace;
            color: #4cc97a;
            font-weight: 600;
          }
        }
      }

      .tx-list {
        background: #fff;
        border-radius: var(--r);
        box-shadow: var(--shadow);
        overflow: hidden;

        .tx-item {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px 15px;
          transition: background 0.15s;
          animation: fadeUp 0.35s cubic-bezier(0.4, 0, 0.2, 1) both;

          &:not(:last-child) {
            border-bottom: 1px solid var(--border);
          }

          &:active {
            background: #f8fafc;
          }

          .tx-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 21px;
            flex-shrink: 0;
          }

          .tx-info {
            flex: 1;

            .tx-name {
              font-size: 14px;
              font-weight: 600;
              color: #1c2130;
              margin-bottom: 3px;
            }

            .tx-meta {
              font-size: 11px;
              color: #8b9cb1;
            }
          }

          .tx-amt {
            font-family: 'Space Mono', monospace;
            font-size: 14px;
            font-weight: 700;

            &.exp {
              color: #ff6b6b;
            }

            &.inc {
              color: #4cc97a;
            }
          }
        }
      }
    }

    .empty {
      padding: 60px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      .empty-icon {
        font-size: 48px;
      }

      .empty-text {
        font-size: 14px;
        color: #8b9cb1;
      }
    }

    .pb {
      height: 100px;
    }
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
