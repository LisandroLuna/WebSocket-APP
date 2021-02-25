let prodList = [
    {
        id: 0,
        title: "Crested porcupine",
        price: "63.27",
        thumbnail: "http://dummyimage.com/113x117.jpg/dddddd/000000"
    },
    {
        id: 1,
        title: "Civet cat",
        price: "40.17",
        thumbnail: "http://dummyimage.com/113x117.jpg/cc0000/ffffff"
    },
    {
        id: 2,
        title: "Beaver, european",
        price: "18.21",
        thumbnail: "http://dummyimage.com/113x117.png/5fa2dd/ffffff"
    },
    {
        id: 3,
        title: "Red-capped cardinal",
        price: "51.36",
        thumbnail: "http://dummyimage.com/113x117.jpg/dddddd/000000"
    },
    {
        id: 4,
        title: "Bleu, red-cheeked cordon",
        price: "42.59",
        thumbnail: "http://dummyimage.com/113x117.bmp/cc0000/ffffff"
    }
]

function addProd(newProd){
    let id = 0
    prodList.forEach(prod => {
        prod.id >= id ? id++ : ''
    })
    newProd.id = id
    prodList = [...prodList, newProd]
}

function putProd(id, data){
    prodList = prodList.map(prod => {
        prod.id == id ? (data.id = id, prod = data  ) : ''
        return prod
    })
}

function delProd(data){
    prodList.forEach((prod, i) => {
        prod.id == data ? (delete prodList[i]) : ''
    })
}

export {prodList, addProd, putProd, delProd}