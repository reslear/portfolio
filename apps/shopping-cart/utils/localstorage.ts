import { TCartItems } from '~/types'
import { isNumeric, isPlainObj } from '.'

const LOCAL_STORAGE_KEY = 'cart'
const delimiterKey = '_'

export const parseKey = (key: string) => {
  const [cid, id] = key.split(delimiterKey)
  return { cid, id }
}

export const printKey = (cid: string, id: string) => {
  return cid + delimiterKey + id
}

export const setStore = (items: TCartItems) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
}

export const getStorage = () => {
  if (!process.browser) return {}

  try {
    const context: TCartItems = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || ''
    )

    if (!isPlainObj(context)) {
      return {}
    }

    const result: TCartItems = {}

    for (let [key, amount] of Object.entries(context)) {
      const { cid, id } = parseKey(key)

      if (cid && id && isNumeric(amount) && amount > 0) {
        result[printKey(cid, id)] = amount
      }
    }

    return result
  } catch (e) {
    console.error(e)
  }
  return {}
}
