import fs from 'fs'

class Archivo{
    constructor(name){
        this.nombre = name
    }
    async leer(){
        try{
            const contenido = await fs.promises.readFile('data/' + this.nombre + '.txt', 'utf-8')
            return JSON.parse(contenido)
        }catch(e){
            console.log(e)
            return []
        }
    }
    async guardar(newData){
        try{
            let data = await this.leer();
            newData.id = data.length + 1
        }catch (e){
            return(e)
        }
        let newSave = await this.leer()
        newSave = [...newSave, newData]
        const actualizacion = await fs.promises.writeFile('data/' + this.nombre + '.txt', JSON.stringify(newSave), e => {
            if(!e){
                return this.leer()
            }else{
                return 'Error: ' + e
            }
        })
    }
    async borrar(){
        const borrado = await fs.unlink('data/' + this.nombre + '.txt', e => {
            if(!e){
                return 'Archivo borrado'
            }else{
                return e;
            }
        })
    }
}

export default Archivo