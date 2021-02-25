import express from 'express'
import {prodList, addProd, putProd, delProd} from '../data/product.mjs'

let router = express.Router()

router.get('/productos/', (req, res) => {
    let data = prodList
    data.length == 0 ? data = {error : 'no hay productos cargados'} : ''
    res.json(prodList)
})

router.post('/productos/', (req, res) => {
    let newProd = req.body
    addProd(newProd)
    res.writeHead(301, {"Location": "/productos/vista"});
    return res.end();
})

router.get('/productos/:id', (req, res) => {
    let data = {error : 'producto no encontrado'}
    let id = req.params.id
    prodList.forEach(prod => {
        prod.id == id ? data = prod : ''
    })
    res.json(data)
})

router.put('/productos/actualizar/:id', (req, res) => {
    let data = {error : 'producto no encontrado'}
    let id = req.params.id
    let body = req.body
    putProd(id, body)
    res.json({
        result: 'ok',
        id: req.params.id,
        nuevo: req.body
    })
})

router.delete('/productos/borrar/:id', (req, res) => {
    let data = {error : 'producto no encontrado'}
    let id = req.params.id
    delProd(id)
    res.json({
        result: 'ok',
        id: req.params.id
    })
})

export default router