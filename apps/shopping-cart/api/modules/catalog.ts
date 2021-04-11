import { readJson } from 'fs-extra'
import { formatGoods, formatNames } from '../utils'

export const getGoods = async () =>
  formatGoods(await readJson('./tor/data.json', { throws: false }))

export const getNames = async () =>
  formatNames(await readJson('./tor/names.json', { throws: false }))

export const catalog = async () => {
  const names = await getNames()
  const goods = await getGoods()

  /* let result = [];

  for (let item of goods) {

  }

  return result; */
}
