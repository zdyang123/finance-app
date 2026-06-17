# 财务记账应用 - Vue3 + TypeScript 版本

## 项目概述

这是一个基于 finance-app.html 转换的现代 Vue3 + TypeScript 财务记账应用。使用 Vite 作为构建工具，提供高效的开发体验和优化的生产构建。

## 文件结构

```
src/
├── views/                    # 所有页面组件
│   ├── Home.vue             # 首页 - 账户统计和交易列表
│   ├── Record.vue           # 记账页面 - 支出/收入记录
│   ├── Stats.vue            # 统计页面 - 数据分析和图表
│   ├── Profile.vue          # 个人资料页面 - 用户信息和菜单
│   └── router.ts            # Vue Router 路由配置
│
├── types/
│   └── index.ts             # TypeScript 类型定义
│
├── utils/
│   ├── data.ts              # 静态数据（交易、分类、月度数据）
│   └── helpers.ts           # 工具函数（Toast、格式化）
│
├── components/              # 可复用组件（可选）
├── App.vue                  # 根组件 - 手机UI外壳、导航栏
├── main.ts                  # 应用入口
└── style.css               # 全局样式
```

## 主要特性

### 1. 首页 (Home.vue)
- 显示早安问候和日期
- 今日支出和本月收入统计卡片
- 快速记账按钮（餐饮、交通、购物、娱乐）
- 交易列表展示

### 2. 记账页面 (Record.vue)
- 支出/收入类型切换
- 分类选择网格（8个分类）
- 数字键盘输入
- 备注输入框
- 确认保存功能

### 3. 统计页面 (Stats.vue)
- 月份选择导航
- 月度收支总览
- 甜甜圈图表展示占比
- 月度趋势柱状图
- 支出分类详细数据表

### 4. 个人资料页面 (Profile.vue)
- 用户头像和信息
- 统计数据卡片（记账天数、账单数、分类数）
- 功能菜单（设置、备份、主题等）

### 5. 应用框架 (App.vue)
- iPhone 风格手机外壳 UI
- 状态栏（时间、信号、电量）
- Dynamic Island（刘海屏）
- 底部导航栏（4个标签）
- FAB 浮动按钮（首页显示）
- Toast 通知系统

## 路由配置

```
/ (首页)
/record (记账)
/stats (统计)
/profile (个人资料)
```

### 路由参数
- `/record?category=餐饮` - 从首页快速记账时传递分类参数

## 数据管理

### 静态数据 (utils/data.ts)
- `TRANSACTIONS` - 交易列表
- `CATEGORIES_EXP` - 支出分类
- `CATEGORIES_INC` - 收入分类
- `MONTH_DATA` - 月度数据
- `CAT_BREAKDOWN` - 分类统计

### 状态管理
使用 Vue3 Composition API 的 `ref` 和 `computed` 实现本地状态管理。

## 样式特点

- 使用 CSS 变量定义设计系统（颜色、阴影、圆角等）
- 响应式设计支持移动和桌面
- 流畅的过渡动画和过渡效果
- 按钮点击反馈效果
- 渐变背景和玻璃态设计

## 类型定义

```typescript
interface Transaction
interface Category
interface MonthData
interface CategoryBreakdown
type RecordType = 'expense' | 'income'
```

## 工具函数

### useToast()
- `showToast(message, duration)` - 显示通知

### useFormatCurrency(value)
- 格式化货币值（2位小数）

### useFormatNumber(value)
- 格式化数字（千位分隔符）

## 开发

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 技术栈

- **Vue 3.5.34** - 前端框架
- **TypeScript 6.0** - 类型系统
- **Vue Router 4.4.0** - 路由管理
- **Vite 8.0** - 构建工具
- **Less** - CSS 预处理器

## 浏览器兼容性

- 现代浏览器 (Chrome, Firefox, Safari, Edge)
- 不支持 IE

## 注意事项

1. 数据目前为静态 Mock 数据，实际使用需连接后端 API
2. Toast 组件通过 Composition API 全局管理
3. 路由使用 Hash 模式（可配置为 History 模式）
4. 手机壳 UI 宽度固定为 393px（iPhone 15 规格）

## 后续扩展建议

1. 集成后端 API 进行数据持久化
2. 添加用户认证系统
3. 实现实时数据同步
4. 添加更多图表类型
5. 支持数据导出功能
6. 添加搜索和筛选功能
