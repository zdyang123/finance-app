<template>
  <div class="bottom-nav">
    <div v-for="item in navItems" :key="item.name" class="nav-item" :class="{ active: isActiveRoute(item.name) }"
      @click="navigateTo(item.name)">
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
      <div class="nav-dot"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navItems = [
  { icon: '🏠', label: '首页', name: 'home' },
  { icon: '✏️', label: '记一笔', name: 'record' },
  { icon: '📊', label: '统计', name: 'stats' },
  { icon: '👤', label: '我的', name: 'profile' },
]

const currentRouteName = computed(() => router.currentRoute.value.name || 'home')

const isActiveRoute = (name: string) => currentRouteName.value === name
const navigateTo = (name: string) => {
  router.push({ name })
}
</script>

<style scoped lang="less">
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
</style>
