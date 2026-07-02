# Finance App - NutUI 集成指南

## 概述

本项目已成功整合 NutUI v3 组件库，提供企业级 UI 组件和更好的用户体验。

## 🔌 集成的 NutUI 组件

### 1. Cell 和 CellGroup (Profile 页)

用于创建设置菜单和列表项。

**使用位置**: `src/views/Profile.vue`

```vue
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
```

**优势**:
- 内置点击反馈
- 自动处理间距和对齐
- 支持图标、标题、描述等插槽
- 一致的设计语言

### 2. Notify (Toast 替代)

用于显示消息通知。

**使用位置**: `src/utils/helpers.ts`

```typescript
import { Notify } from '@nutui/nutui'

export function useToast() {
  const showToast = (msg: string, duration = 2000) => {
    Notify.text(msg, {
      duration,
      position: 'bottom',
    })
  }
  return { showToast }
}
```

**调用示例** (在 Record.vue 中):
```typescript
showToast(`✅ 支出 ¥${value.toFixed(2)} 已记录`)
```

**位置选项**: 'top' | 'bottom' | 'center'

## 📦 自定义组件

### CountUpNumber - 数字动画组件

实现了平滑的数字计数动画效果，用于 Profile 页的统计数据。

**文件**: `src/components/CountUpNumber.vue`

**Props**:
- `value` (number): 目标数值
- `duration` (number, 默认 1000ms): 动画持续时间
- `format` (function): 值的格式化函数

**使用示例**:
```vue
<CountUpNumber :value="daysCount" :duration="1500" />
```

**实现特点**:
- 使用 `requestAnimationFrame` 实现流畅动画
- 自动响应 prop 变化
- TypeScript 完全类型化

## 🎨 样式系统

### Less 预处理器

所有组件样式使用 Less 编写，支持变量和嵌套。

**全局变量** (src/style.css):
```css
--primary: #3ecfb2
--expense: #ff6b6b
--income: #4cc97a
--warning: #ff9500
--success: #07c160
```

**Less 嵌套示例** (src/views/Profile.vue):
```less
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
}
```

## 🚀 开发指南

### 安装依赖

```bash
npm install
```

已包含:
- `@nutui/nutui@^3.3.8` - NutUI 组件库
- `less@^4.6.6` - Less 样式预处理
- `vue@^3.5.34` - Vue 框架
- `typescript@~6.0.2` - TypeScript

### 启动开发服务器

```bash
npm run dev
```

开发服务器将在 `http://localhost:5173` 或 `http://localhost:5174` 启动

### 生产构建

```bash
npm run build
```

输出文件在 `dist/` 目录

**最近构建统计**:
- JS: 401.16 KB (gzip: 126.23 KB)
- CSS: 156.94 KB (gzip: 27.78 KB)
- 编译时间: 847ms

## 📋 项目文件说明

### src/main.ts
应用入口，配置 NutUI 插件:
```typescript
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'

app.use(NutUI)
```

### src/App.vue
根组件，包含:
- 顶部导航栏 (梯度背景)
- 路由出口
- 底部导航菜单
- 浮动操作按钮 (FAB)

### src/views/router.ts
Vue Router 配置，4 个路由:
- `/` - Home (首页)
- `/record` - Record (记录)
- `/stats` - Stats (统计)
- `/profile` - Profile (个人)

### src/utils/data.ts
模拟数据:
- `TRANSACTIONS` - 交易列表
- `CATEGORIES_EXP` / `CATEGORIES_INC` - 分类
- `MONTH_DATA` - 月度数据
- `CAT_BREAKDOWN` - 分类明细

### src/types/index.ts
TypeScript 类型定义:
```typescript
interface Transaction {
  date: string
  category: string
  amount: number
  type: 'expense' | 'income'
  notes?: string
  emoji?: string
}
```

## 🔧 常用操作

### 添加新的 NutUI 组件

1. 在 src/main.ts 中自动导入 NutUI 插件:
```typescript
app.use(NutUI)  // 已配置，可直接使用所有组件
```

2. 在组件中使用:
```vue
<script setup lang="ts">
import { Button } from '@nutui/nutui'
</script>

<template>
  <Button type="primary">点击我</Button>
</template>
```

### 显示消息通知

在任何页面中:
```typescript
import { useToast } from '@/utils/helpers'

const { showToast } = useToast()

// 调用
showToast('操作成功！')
```

### 添加 Less 变量

在需要的组件中定义:
```less
<style scoped lang="less">
.my-component {
  color: var(--primary);
  background: linear-gradient(140deg, var(--primary) 0%, #28b39a 100%);
}
</style>
```

## 📱 支持的功能列表

- ✅ 收支记录输入
- ✅ 分类管理
- ✅ 月度统计
- ✅ 分类分析
- ✅ 用户资料
- ✅ 设置菜单
- ✅ 数据可视化
- ✅ 消息通知
- ✅ 动画效果

## 🐛 调试技巧

### 查看 NutUI 组件

打开浏览器控制台，检查 HTML 结构:
```javascript
document.querySelector('.nut-cell')
```

### TypeScript 检查

运行类型检查:
```bash
npm run type-check  # 如果配置的话
```

或使用:
```bash
vue-tsc -b
```

### 清除缓存

```bash
rm -rf node_modules/.vite
npm run dev
```

## 📚 相关资源

### NutUI 官方文档
- 文档: https://nutui.jd.com/
- GitHub: https://github.com/jd-opensource/nutui

### Vue 3 文档
- 官方文档: https://vuejs.org/
- 中文文档: https://cn.vuejs.org/

### Vite 文档
- 官方文档: https://vitejs.dev/
- 中文文档: https://cn.vitejs.dev/

## ✨ 最佳实践

1. **类型安全**: 所有 props 和数据都有 TypeScript 类型
2. **组件复用**: 创建可重用的组件如 CountUpNumber
3. **样式隔离**: 使用 `scoped` 避免样式污染
4. **性能**: 使用 Vue 3 Composition API 优化性能
5. **易维护**: 模块化代码结构便于维护和扩展

## 🎯 后续改进建议

1. **Pinia 状态管理**: 如果数据变复杂，考虑引入 Pinia
2. **API 集成**: 将模拟数据替换为真实 API 调用
3. **图表库**: 使用 ECharts 或 Chart.js 增强图表功能
4. **国际化**: 使用 vue-i18n 支持多语言
5. **主题切换**: 实现浅色/深色主题切换
6. **离线支持**: 使用 Service Worker 支持离线访问

---

**最后更新**: 2024 年
**NutUI 版本**: 3.3.8
**状态**: ✅ 生产就绪
