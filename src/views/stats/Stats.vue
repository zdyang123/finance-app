<script setup lang="ts">
import { ref, computed } from 'vue'
import { MONTH_DATA, MONTHS, CAT_BREAKDOWN } from '@/utils/data'
import { useFormatNumber } from '@/utils/helpers'
import MonthPicker from '@/components/MonthPicker.vue'

const currentMonth = ref(5) // 0-based June

// MonthPicker 使用 'YYYY-MM' 字符串
const selectedMonth = ref('2026-06')

const syncFromPicker = (val: string) => {
  selectedMonth.value = val
  currentMonth.value = parseInt(val.split('-')[1]) - 1
}

const monthLabel = computed(() => `2026年 ${MONTHS[currentMonth.value]}`)

const currentMonthData = computed(() => MONTH_DATA[currentMonth.value])

const maxChartValue = computed(() => {
  return Math.max(...MONTH_DATA.flatMap(d => [d.e, d.i]))
})

const getBarHeight = (value: number) => {
  return Math.max(4, (value / maxChartValue.value) * 70)
}
</script>

<template>
  <div class="screen-content">
    <div class="stats-hd">
      <div class="month-sel">
        <MonthPicker v-model="selectedMonth" variant="light" @update:model-value="syncFromPicker" />
      </div>
      <div class="s-overview">
        <div class="s-nums">
          <div>
            <div class="s-num-label">支出</div>
            <div class="s-num-val">¥{{ useFormatNumber(currentMonthData.e) }}</div>
          </div>
          <div>
            <div class="s-num-label">收入</div>
            <div class="s-num-val">¥{{ useFormatNumber(currentMonthData.i) }}</div>
          </div>
        </div>
        <div class="donut">
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="34" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="12" />
            <circle
              cx="45"
              cy="45"
              r="34"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              stroke-width="12"
              stroke-dasharray="142 72"
              stroke-linecap="round"
            />
            <circle
              cx="45"
              cy="45"
              r="34"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              stroke-width="12"
              stroke-dasharray="72 142"
              stroke-dashoffset="-142"
              stroke-linecap="round"
            />
          </svg>
          <div class="donut-lbl"><strong>66%</strong><span>支出占比</span></div>
        </div>
      </div>
    </div>

    <div class="stats-body">
      <div class="s-card">
        <div class="s-card-title">月度趋势</div>
        <div class="bar-chart">
          <div v-for="month in MONTH_DATA" :key="month.m" class="bar-grp">
            <div class="bar-pair">
              <div class="bar e" :style="{ height: getBarHeight(month.e) + 'px' }"></div>
              <div class="bar i" :style="{ height: getBarHeight(month.i) + 'px' }"></div>
            </div>
            <span class="bar-ml">{{ month.m }}</span>
          </div>
        </div>
        <div class="legend">
          <span class="leg-item"
            ><span class="leg-dot" style="background: #ff6b6b"></span>支出</span
          >
          <span class="leg-item"
            ><span class="leg-dot" style="background: #4cc97a"></span>收入</span
          >
        </div>
      </div>
      <div class="s-card">
        <div class="s-card-title">支出分类</div>
        <div>
          <div v-for="cat in CAT_BREAKDOWN" :key="cat.name" class="cat-row">
            <div class="cr-dot" :style="{ background: cat.color }"></div>
            <span class="cr-name">{{ cat.name }}</span>
            <span class="cr-pct">{{ cat.pct }}%</span>
            <div class="cr-bar">
              <div class="cr-fill" :style="{ width: cat.pct + '%', background: cat.color }"></div>
            </div>
            <span class="cr-amt">¥{{ useFormatNumber(cat.amt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.screen-content {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .stats-hd {
    background: linear-gradient(140deg, #3ecfb2 0%, #28b39a 55%, #1e9e8a 100%);
    padding: 18px 24px 36px;

    .month-sel {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 22px;
    }

    .s-overview {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .s-nums {
        display: flex;
        gap: 36px;

        .s-num-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 4px;
        }

        .s-num-val {
          font-family: 'Space Mono', monospace;
          font-size: 19px;
          font-weight: 700;
          color: #fff;
        }
      }

      .donut {
        width: 90px;
        height: 90px;
        position: relative;

        svg {
          transform: rotate(-90deg);
        }

        .donut-lbl {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: rgba(255, 255, 255, 0.85);
          text-align: center;
          gap: 1px;

          strong {
            font-size: 13px;
            font-weight: 700;
          }
        }
      }
    }
  }

  .stats-body {
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 100px;

    .s-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 18px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);

      .s-card-title {
        font-size: 14px;
        font-weight: 700;
        color: #1c2130;
        margin-bottom: 16px;
      }

      .bar-chart {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        height: 80px;

        .bar-grp {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          flex: 1;

          .bar-pair {
            display: flex;
            gap: 3px;
            align-items: flex-end;

            .bar {
              width: 11px;
              border-radius: 3px 3px 0 0;
              transition: height 0.9s cubic-bezier(0.4, 0, 0.2, 1);

              &.e {
                background: linear-gradient(to top, #ff6b6b, #ff8c8c);
              }

              &.i {
                background: linear-gradient(to top, #4cc97a, #6fd994);
              }
            }
          }

          .bar-ml {
            font-size: 9px;
            color: #8b9cb1;
          }
        }
      }

      .legend {
        display: flex;
        gap: 14px;
        justify-content: center;
        margin-top: 10px;

        .leg-item {
          font-size: 11px;
          color: #8b9cb1;
          display: flex;
          align-items: center;

          .leg-dot {
            width: 8px;
            height: 8px;
            border-radius: 2px;
            display: inline-block;
            margin-right: 4px;
          }
        }
      }

      .cat-row {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.07);

        &:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .cr-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .cr-name {
          flex: 1;
          font-size: 13px;
          color: #1c2130;
        }

        .cr-pct {
          font-size: 12px;
          color: #8b9cb1;
          width: 32px;
          text-align: right;
        }

        .cr-bar {
          width: 72px;
          height: 4px;
          background: #f0f4f8;
          border-radius: 2px;
          overflow: hidden;

          .cr-fill {
            height: 100%;
            border-radius: 2px;
          }
        }

        .cr-amt {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          color: #ff6b6b;
          width: 64px;
          text-align: right;
        }
      }
    }
  }
}
</style>
