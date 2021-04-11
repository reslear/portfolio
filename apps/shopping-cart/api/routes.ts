import express from 'express'
import { getGoods, getNames } from './modules/catalog'

const routes = express.Router()

routes.get('/catalog', async (req, res) => {
  res.send({ names: await getNames(), goods: await getGoods() })
})

export { routes }
