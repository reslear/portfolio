import { readJson } from 'fs-extra'
import { IGoodsData, INamesData } from '~/types'
import { getRandomNumber } from '../utils'

export const getGoods = async (rand?: boolean) => {
  let result = (await readJson('./tor/data.json', {
    throws: false,
  })) as IGoodsData

  if (rand && result?.Value.Goods) {
    result.Value.Goods = result?.Value.Goods.map(item => {
      item.C = getRandomNumber(0, 35)
      item.P = getRandomNumber(0, 10)

      return item
    })
  }

  return result
}

export const getNames = async (): Promise<INamesData | null> =>
  await readJson('./tor/names.json', { throws: false })

// export const catalog = async () => {
//   const names = await getNames()
//   const goods = await getGoods()
// }
