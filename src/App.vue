<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentTime = ref('9:41')

const navItems = [
  { icon: '🏠', label: '首页', name: 'home' },
  { icon: '✏️', label: '记一笔', name: 'record' },
  { icon: '📊', label: '统计', name: 'stats' },
  { icon: '👤', label: '我的', name: 'profile' },
]

const currentRouteName = computed(() => router.currentRoute.value.name || 'home')

const isActiveRoute = (name: string) => currentRouteName.value === name

const showFab = computed(() => currentRouteName.value === 'home')

const navBarBackground = computed(() => {
  if (['home', 'stats', 'profile', 'all'].includes(currentRouteName.value as string)) {
    return 'linear-gradient(140deg,#3ECFB2,#28B39A)'
  }
  return 'transparent'
})

const updateClock = () => {
  const now = new Date()
  const h = now.getHours().toString().padStart(2, '0')
  const m = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${h}:${m}`
}

const navigateTo = (name: string) => {
  router.push({ name })
}

const handleFabClick = () => {
  router.push({ name: 'record' })
}

onMounted(() => {
  updateClock()
  setInterval(updateClock, 10000)
})
</script>

<template>
  <div class="app-wrapper">
    <!-- Header -->
    <div class="header" :style="{ background: navBarBackground }">
      <span class="time">{{ currentTime }}</span>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <RouterView />
    </div>

    <!-- FAB -->
    <div v-if="showFab" class="fab" @click="handleFabClick">+</div>

    <!-- Bottom Navigation -->
    <div class="bottom-nav">
      <div
        v-for="item in navItems"
        :key="item.name"
        class="nav-item"
        :class="{ active: isActiveRoute(item.name) }"
        @click="navigateTo(item.name)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
        <div class="nav-dot"></div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap');

:root {
  --primary: #3ecfb2;
  --primary-dark: #28b39a;
  --primary-light: #e6f9f6;
  --expense: #ff6b6b;
  --income: #4cc97a;
  --bg: #f0f4f8;
  --card: #ffffff;
  --text: #1c2130;
  --muted: #8b9cb1;
  --border: rgba(0, 0, 0, 0.07);
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.09);
  --shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.06);
  --r: 20px;
  --r-sm: 13px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  font-family: 'Noto Sans SC', sans-serif;
  background: radial-gradient(ellipse at 30% 20%, #c8f0ec 0%, #b2dfe7 40%, #a8cfe8 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped lang="less">
.app-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  position: relative;

  .header {
    height: 60px;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    transition: background 0.3s ease;
    background: linear-gradient(140deg, #3ecfb2 0%, #28b39a 55%, #1e9e8a 100%);

    .time {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      letter-spacing: -0.3px;
    }
  }

  .main-content {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .bottom-nav {
    background: var(--card);
    display: flex;
    padding: 8px 0 12px;
    box-shadow: 0 -1px 0 var(--border);
    position: relative;
    z-index: 50;
    flex-shrink: 0;

    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      padding: 4px 0;
      position: relative;

      .nav-icon {
        font-size: 23px;
        transition: transform 0.22s;
      }

      .nav-label {
        font-size: 10px;
        color: var(--muted);
        font-weight: 500;
        transition: color 0.2s;
      }

      .nav-dot {
        position: absolute;
        bottom: -6px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--primary);
        opacity: 0;
        transition: opacity 0.2s;
      }

      &.active {
        .nav-icon {
          transform: translateY(-2px);
        }

        .nav-label {
          color: var(--primary);
          font-weight: 600;
        }

        .nav-dot {
          opacity: 1;
        }
      }
    }
  }

  .fab {
    position: fixed;
    bottom: 80px;
    right: 24px;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3ecfb2, #28b39a);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 22px rgba(62, 207, 178, 0.55);
    cursor: pointer;
    z-index: 30;
    color: #fff;
    font-size: 26px;
    font-weight: 300;
    transition: transform 0.2s, box-shadow 0.2s;

    &:active {
      transform: scale(0.88);
      box-shadow: 0 3px 10px rgba(62, 207, 178, 0.35);
    }
  }
}
</style>
