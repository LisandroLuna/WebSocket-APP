import Archivo from "./files.mjs";
import moment from "moment";

let messList = new Archivo('messages')

let messages = await messList.leer()

async function addMess(data){
    let format = "YYYY-MM-DD HH:mm:ss"
    let date = new Date()
    data.time = moment(date).format(format)
    await messList.guardar(data)
    messages = await messList.leer()
    return messages
}

export {messages, addMess}