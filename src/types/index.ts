export interface Transaction {
  icon: string
  bg: string
  name: string
  meta: string
  type: 'exp' | 'inc'
  amt: number
  date?: string
}

export interface Category {
  e: string
  l: string
}

export interface MonthData {
  m: string
  e: number
  i: number
}

export interface CategoryBreakdown {
  name: string
  amt: number
  pct: number
  color: string
}

export type RecordType = 'expense' | 'income'
