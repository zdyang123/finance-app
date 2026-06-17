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
