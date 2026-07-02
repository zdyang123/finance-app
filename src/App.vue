<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()

const currentTime = ref('9:41')

const currentRouteName = computed(() => router.currentRoute.value.name || 'home')
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



const handleFabClick = () => {
  router.push({ name: 'record' })
}

onMounted(() => {
  updateClock()
  // setInterval(updateClock, 10000)
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
    <NavBar />

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
