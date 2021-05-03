export interface INamesData {
  /** id cat */
  [K: string]: {
    B: {
      /** id item */
      [T: string]: {
        /** item name */
        N: string
        T: number
      }
    }
    /** category name */
    G: string
    С: number
  }
}

export interface IGoodsData {
  Error: string
  Id: number
  Success: boolean
  Value: {
    Goods: IGoodsValueData[]
  }
}

export interface IGoodsValueData {
  B: boolean
  /** цена в долларах(USD) */
  C: number
  CV: null
  /** id группы */
  G: number
  /** Сколько единиц товара осталось */
  P: number
  Pl: null
  /** id товара */
  T: number

  /** старая цена **/
  O?: number
}

export interface ICatalog {
  names: INamesData
  goods: IGoodsData
}

export interface IOpenRatesData {
  base: string
  rates: { [K: string]: number } & { [K in TRates]: number }
  date: string
}

export type TRates = 'EUR' | 'RUB' | 'USD'

export type TGoodId = string
export type TGoodCatId = string

export interface ICartItem {
  id: TGoodId
  cid: TGoodCatId
  amount: number
}
export type TCartItemIds = Pick<ICartItem, 'id' | 'cid'>
export type TCartItems = { [K: string]: number }
export interface ICartMPayload {
  key: string
  amount: number
}
