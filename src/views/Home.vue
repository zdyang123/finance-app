<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { TRANSACTIONS } from '../utils/data'
import { useFormatCurrency } from '../utils/helpers'

const router = useRouter()
const currentTime = ref('9:41')

const updateClock = () => {
  const now = new Date()
  const h = now.getHours().toString().padStart(2, '0')
  const m = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${h}:${m}`
}

onMounted(() => {
  updateClock()
  setInterval(updateClock, 10000)
})

const quickRec = (category: string) => {
  router.push({
    name: 'record',
    query: { category },
  })
}
</script>

<template>
  <div class="screen-content">
    <div class="home-header">
      <div class="hh-top">
        <div>
          <div class="hh-greeting">早上好，Alex 👋</div>
          <div class="hh-date">6月13日，星期五</div>
        </div>
        <div class="hh-avatar" @click="$router.push({name: 'profile'})">😊</div>
      </div>
      <div class="stats-cards">
        <div class="stat-card">
          <div class="sc-label">今日支出</div>
          <div class="sc-amount"><span class="cny">¥</span>319<small>.00</small></div>
        </div>
        <div class="stat-card">
          <div class="sc-label">本月收入</div>
          <div class="sc-amount"><span class="cny">¥</span>8,000<small>.00</small></div>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="quick-bar">
      <div class="qa-item" @click="quickRec('餐饮')">
        <div class="qa-icon" style="background: #FFF4EE">🍜</div>
        <span class="qa-label">餐饮</span>
      </div>
      <div class="qa-item" @click="quickRec('交通')">
        <div class="qa-icon" style="background: #EEF2FF">🚇</div>
        <span class="qa-label">交通</span>
      </div>
      <div class="qa-item" @click="quickRec('购物')">
        <div class="qa-icon" style="background: #FFF0F8">🛍️</div>
        <span class="qa-label">购物</span>
      </div>
      <div class="qa-item" @click="quickRec('娱乐')">
        <div class="qa-icon" style="background: #F0FBF4">🎮</div>
        <span class="qa-label">娱乐</span>
      </div>
    </div>

    <div class="section-hd">
      <span class="section-title">今日账单</span>
      <span class="section-more" @click="router.push({ name: 'all' })">查看全部 ›</span>
    </div>

    <div class="tx-list">
      <div v-for="(tx, index) in TRANSACTIONS" :key="index" class="tx-item">
        <div class="tx-icon" :style="{ background: tx.bg }">{{ tx.icon }}</div>
        <div class="tx-info">
          <div class="tx-name">{{ tx.name }}</div>
          <div class="tx-meta">{{ tx.meta }}</div>
        </div>
        <div class="tx-amt" :class="{ exp: tx.type === 'exp', inc: tx.type === 'inc' }">
          {{ tx.type === 'exp' ? '-' : '+' }}¥{{ useFormatCurrency(tx.amt) }}
        </div>
      </div>
    </div>
    <div class="pb"></div>
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

  .home-header {
    background: linear-gradient(140deg, #3ecfb2 0%, #28b39a 55%, #1e9e8a 100%);
    padding: 18px 24px 44px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -50px;
      right: -50px;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -70px;
      left: -20px;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
    }

    .hh-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 22px;
      position: relative;
      z-index: 1;

      .hh-greeting {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.75);
        margin-bottom: 3px;
        letter-spacing: 0.5px;
      }

      .hh-date {
        font-size: 19px;
        font-weight: 700;
        color: #fff;
        letter-spacing: -0.3px;
      }

      .hh-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.18);
        border: 2px solid rgba(255, 255, 255, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        cursor: pointer;
        transition: transform 0.2s;

        &:active {
          transform: scale(0.9);
        }
      }
    }

    .stats-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      position: relative;
      z-index: 1;

      .stat-card {
        background: rgba(255, 255, 255, 0.16);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: var(--r-sm);
        padding: 14px 16px;

        .sc-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.75);
          letter-spacing: 0.4px;
          margin-bottom: 8px;
        }

        .sc-amount {
          font-family: 'Space Mono', monospace;
          font-size: 21px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -1px;

          .cny {
            font-size: 13px;
            font-weight: 400;
            opacity: 0.8;
            margin-right: 1px;
          }

          small {
            font-size: 15px;
          }
        }
      }
    }
  }

  .quick-bar {
    background: #ffffff;
    margin: -24px 18px 0;
    border-radius: 20px;
    padding: 16px 6px;
    display: flex;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.09);
    position: relative;
    z-index: 10;

    .qa-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 7px;
      cursor: pointer;

      .qa-icon {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        transition: transform 0.18s;
      }

      .qa-label {
        font-size: 11px;
        color: #8b9cb1;
        font-weight: 500;
      }

      &:active .qa-icon {
        transform: scale(0.88);
      }
    }
  }

  .section-hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 22px 10px;

    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #1c2130;
    }

    .section-more {
      font-size: 12px;
      color: #3ecfb2;
      cursor: pointer;
      transition: opacity 0.15s;

      &:active {
        opacity: 0.6;
      }
    }
  }

  .tx-list {
    padding: 0 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .tx-item {
      background: #ffffff;
      border-radius: 13px;
      padding: 13px 15px;
      display: flex;
      align-items: center;
      gap: 13px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
      transition: transform 0.18s;
      animation: fadeUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;

      &:active {
        transform: scale(0.97);
      }

      &:nth-child(1) {
        animation-delay: 0.04s;
      }
      &:nth-child(2) {
        animation-delay: 0.09s;
      }
      &:nth-child(3) {
        animation-delay: 0.14s;
      }
      &:nth-child(4) {
        animation-delay: 0.19s;
      }
      &:nth-child(5) {
        animation-delay: 0.24s;
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

  .pb {
    height: 100px;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
