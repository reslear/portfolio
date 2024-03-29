import axios from 'axios'
import {
  IGoodsValueData,
  IOpenRatesData,
  TGoodCatId,
  TGoodId,
  TRates,
} from '~/types'
import { printKey } from '~/utils/localstorage'

export const getCurrency = async (
  base: TRates = 'USD',
  target: TRates = 'RUB'
) => {
  const { data } = await axios.get<IOpenRatesData>(
    `https://api.openrates.io/latest?base=${base}`
  )

  return data?.rates[target] || 0
}

export const formatPrice = (value: number) => {
  return value.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  })
}

export const exchangePrice = (value: number, currency: number) => {
  const price = value * currency
  return price
}
