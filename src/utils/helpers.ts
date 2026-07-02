import { Toast } from '@nutui/nutui'

export function useToast() {
  const showToast = (msg: string, duration = 2000) => {
    Toast.text(msg, {
      duration,
      position: 'bottom',
    })
  }

  return {
    showToast,
  }
}

export function useFormatCurrency(value: number): string {
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function useFormatNumber(value: number): string {
  return value.toLocaleString('zh-CN')
}

export const formatDateLabel = (dateStr: string) => {
  const today = new Date()
  const d = new Date(dateStr)
  const diff = Math.floor((today.getTime() - d.getTime()) / 86400000)
  if (diff === 0) return '今天'
  if (diff === 1) return '昨天'
  const m = d.getMonth() + 1
  const day = d.getDate()
  return `${m}月${day}日`
}
