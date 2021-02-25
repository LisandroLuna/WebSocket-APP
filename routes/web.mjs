import express from 'express'
import {prodList} from '../data/product.mjs'


let viewRouter = express.Router()

viewRouter.get('/productos/vista', (req, res) => {
    res.render('productList', { list: prodList})
})
viewRouter.get('/productos/cargar', (req, res) => {
    res.render('productLoad', { list: prodList})
})

export default viewRouter