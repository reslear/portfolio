import { readJson } from 'fs-extra'
import { IGoodsData, INamesData } from '~/types'

export const getGoods = async (): Promise<IGoodsData | null> =>
  await readJson('./tor/data.json', { throws: false })

export const getNames = async (): Promise<INamesData | null> =>
  await readJson('./tor/names.json', { throws: false })

export const catalog = async () => {
  const names = await getNames()
  const goods = await getGoods()

  /* let result = [];

  for (let item of goods) {

  }

  return result; */
}
