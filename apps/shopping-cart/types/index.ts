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
    Goods: {
      B: boolean
      /** цена в долларах(USD) */
      C: number
      CV: null
      /** id группы */
      G: number
      /** сколько единиц товара осталось */
      P: number
      Pl: null
      /** id товара */
      T: number
    }[]
  }
}
