import type { Transaction, Category, MonthData, CategoryBreakdown } from '../types'

export const TRANSACTIONS: Transaction[] = [
  { icon: '🍜', bg: '#FFF4EE', name: '午餐', meta: '12:30 · 餐饮', type: 'exp', amt: 38 },
  { icon: '☕', bg: '#FFF4EE', name: '咖啡', meta: '09:20 · 餐饮', type: 'exp', amt: 32 },
  { icon: '🚇', bg: '#EEF2FF', name: '地铁', meta: '08:40 · 交通', type: 'exp', amt: 4 },
  { icon: '💰', bg: '#EDFAF4', name: '工资收入', meta: '08:00 · 收入', type: 'inc', amt: 8000 },
  { icon: '🛍️', bg: '#FFF0F8', name: '超市购物', meta: '昨天 · 购物', type: 'exp', amt: 245 },
]

export const CATEGORIES_EXP: Category[] = [
  { e: '🍜', l: '餐饮' },
  { e: '🚇', l: '交通' },
  { e: '🛍️', l: '购物' },
  { e: '🎮', l: '娱乐' },
  { e: '💊', l: '医疗' },
  { e: '📚', l: '学习' },
  { e: '🏠', l: '居家' },
  { e: '📝', l: '其他' },
]

export const CATEGORIES_INC: Category[] = [
  { e: '💰', l: '工资' },
  { e: '📈', l: '投资' },
  { e: '🎁', l: '礼金' },
  { e: '💼', l: '兼职' },
  { e: '🏦', l: '理财' },
  { e: '🔄', l: '转账' },
  { e: '🎯', l: '奖金' },
  { e: '📝', l: '其他' },
]

export const MONTH_DATA: MonthData[] = [
  { m: '1月', e: 3200, i: 8000 },
  { m: '2月', e: 2800, i: 8000 },
  { m: '3月', e: 3600, i: 8000 },
  { m: '4月', e: 2900, i: 9500 },
  { m: '5月', e: 4100, i: 8000 },
  { m: '6月', e: 3400, i: 8000 },
]

export const CAT_BREAKDOWN: CategoryBreakdown[] = [
  { name: '餐饮', amt: 1240, pct: 36, color: '#FF6B6B' },
  { name: '购物', amt: 890, pct: 26, color: '#FF9F43' },
  { name: '交通', amt: 560, pct: 17, color: '#3ECFB2' },
  { name: '娱乐', amt: 420, pct: 12, color: '#845EF7' },
  { name: '其他', amt: 290, pct: 9, color: '#74C0FC' },
]

export const MONTHS = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
]
