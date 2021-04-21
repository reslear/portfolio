import { IGoodsData, INamesData } from '~/types'

export const formatNames = (names: INamesData) => {
  if (!names) return []

  let result = []

  for (const [id, value] of Object.entries(names)) {
    let items = []

    for (const [itemId, item] of Object.entries(value.B)) {
      items.push({
        id: itemId,
        name: item.N,
      })
    }

    result.push({
      id,
      name: value.G,
      items,
    })
  }

  return result
}

/* 

export const formatGoods = (value: any) => {
  let result = []
  let data: IGoodsData = value

  if (!data?.Value?.Goods) {
    return []
  }

  for (const item of data.Value.Goods) {
    result.push({
      id: item.T,
      cid: item.G,
      price: item.C,
      amount: item.P,
    })
  }

  return result
}
 */
