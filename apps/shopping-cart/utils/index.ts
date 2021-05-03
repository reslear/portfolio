export const isNumeric = (n: any) => !isNaN(parseFloat(n)) && isFinite(n)
export const isPlainObj = (o: any) =>
  typeof o == 'object' && o.constructor == Object

export function debounce<T extends any[]>(
  func: (...args: T) => any,
  timeout: number
): (...args: T) => void {
  let timer: NodeJS.Timeout
  return (...args: T) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

export const hasKey = <T extends object>(obj: T, key: string) =>
  Object.keys(obj).includes(key)
