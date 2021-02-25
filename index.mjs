import * as http from "http";
import express from 'express'
import {Server} from "socket.io";
import handlebars from 'express-handlebars'
import router from "./routes/api.mjs"
import viewRouter from "./routes/web.mjs"
import path from 'path';
import { fileURLToPath } from 'url';
import {prodList, addProd} from "./data/product.mjs";
import {addMess, messages} from './data/message.mjs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.static('public'));

const port = 8080

app.use('/', viewRouter)
app.use('/api', router)

const server = http.createServer(app)

const io = new Server(server)

server.listen(port, () => {
    console.log('Server listen at port: ' + port)
})
io.on("connection", socket => {
    console.log("Client connected...");
    socket.emit('data', prodList)
    socket.emit('messages', messages);
    socket.on('update', (newData) => {
        addProd(newData)
        socket.broadcast.emit('data', prodList)
    })
    socket.on('addMessages', (newMess) => {
        addMess(newMess).then(() => {
            socket.broadcast.emit('messages', messages)
        })
    })
});

