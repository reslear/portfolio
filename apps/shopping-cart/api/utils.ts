import { IGoodsData, INamesData } from '~/types'

export const formatNames = (value: any) => {
  if (!value) return []

  const data: INamesData = value
  let result = []

  for (const [id, value] of Object.entries(data)) {
    let items = []

    for (const [itemId, itemValue] of Object.entries(value.B)) {
      items.push({
        id: itemId,
        name: itemValue.N,
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
