<script setup lang="ts">
import { ref } from 'vue'
import { Cell, CellGroup } from '@nutui/nutui'
import CountUpNumber from '@/components/CountUpNumber.vue'

const daysCount = ref(128)
const billsCount = ref(486)
const categoryCount = ref(12)

const menuItems = [
  { icon: '⚙️', bg: '#E6F9F6', text: '系统设置' },
  { icon: '📊', bg: '#FFF4EE', text: '账单管理' },
  { icon: '☁️', bg: '#EEF2FF', text: '数据备份' },
  { icon: '🔔', bg: '#FFF0F8', text: '消息通知' },
  { icon: '🎨', bg: '#F5F0FF', text: '主题皮肤' },
  { icon: '🚪', bg: '#FFF0F0', text: '退出登录', logout: true },
]
</script>

<template>
  <div class="screen-content">
    <div class="prof-hd">
      <div class="prof-av">🙂</div>
      <div class="prof-name">Alex</div>
      <div class="prof-sub">记账达人 · 已使用 128 天</div>
    </div>

    <div class="prof-stats">
      <div class="ps-item">
        <div class="ps-num">
          <CountUpNumber :value="daysCount" />
        </div>
        <div class="ps-label">记账天数</div>
      </div>
      <div class="ps-item">
        <div class="ps-num">
          <CountUpNumber :value="billsCount" />
        </div>
        <div class="ps-label">账单数</div>
      </div>
      <div class="ps-item">
        <div class="ps-num">
          <CountUpNumber :value="categoryCount" />
        </div>
        <div class="ps-label">分类数</div>
      </div>
    </div>

    <CellGroup title="设置与帮助" class="menu-group">
      <Cell
        v-for="(item, index) in menuItems"
        :key="index"
        :title="item.text"
        class="menu-cell"
        :class="{ logout: item.logout }"
      >
        <template #icon>
          <div class="menu-icon" :style="{ background: item.bg }">
            {{ item.icon }}
          </div>
        </template>
      </Cell>
    </CellGroup>
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

  .prof-hd {
    background: linear-gradient(140deg, #3ecfb2 0%, #28b39a 55%, #1e9e8a 100%);
    padding: 18px 24px 62px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .prof-av {
      width: 82px;
      height: 82px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: 3px solid rgba(255, 255, 255, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
      margin-bottom: 12px;
    }

    .prof-name {
      font-size: 19px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 4px;
    }

    .prof-sub {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.72);
    }
  }

  .prof-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #ffffff;
    margin: -32px 18px 0;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.09);
    position: relative;
    z-index: 10;
    overflow: hidden;

    .ps-item {
      padding: 20px 8px;
      text-align: center;

      &:not(:last-child) {
        border-right: 1px solid rgba(0, 0, 0, 0.07);
      }

      .ps-num {
        font-family: 'Space Mono', monospace;
        font-size: 22px;
        font-weight: 700;
        color: #3ecfb2;
        margin-bottom: 4px;
      }

      .ps-label {
        font-size: 11px;
        color: #8b9cb1;
      }
    }
  }

  .menu-group {
    margin: 24px 0;
    padding: 0 18px 100px;

    :deep(.nut-cell) {
      padding: 15px 12px;
      border-radius: 13px;
      margin-bottom: 10px;
      background: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);

      .nut-cell__title {
        color: #1c2130;
      }
    }

    :deep(.nut-cell.logout .nut-cell__title) {
      color: #ff6b6b;
    }

    .menu-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }
  }
}
</style>
