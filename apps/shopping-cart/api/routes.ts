import express, { query } from 'express'
import { ICatalog } from '~/types'
import { getGoods, getNames } from './modules/catalog'

const routes = express.Router()

routes.get('/catalog', async (req, res) => {
  const isRand = req.query.rand || false

  res.send({
    names: await getNames(),
    goods: await getGoods(!!isRand),
  } as ICatalog)
})

routes.get('/goods', async (req, res) => {
  res.send(await getGoods())
})

export { routes }
