function loadProd(data){
    let content = document.getElementById("data")
    content.innerHTML = `
    <table class="table">
        <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Titulo</th>
            <th scope="col">Precio</th>
            <th scope="col">Imagen</th>
        </tr>
        </thead>
        <tbody id="data-list">
        </tbody>
    </table>`
    let dataList = document.getElementById("data-list")
    data.slice().reverse().forEach((prod) => {
        let tr = document.createElement('tr')
        tr.innerHTML =  `<th scope="row">${prod.id}</th>
                <td>${ prod.title }</td>
                <td>$${ prod.price }</td>
                <td><img src="${ prod.thumbnail }" class="img-fluid"/></td>`
        dataList.appendChild(tr)
    })
}

function loadChat(data){
    let i = 0
    let messageBox = document.getElementById('messages')
    messageBox.innerHTML =  ``
    data.forEach((mess) => {
        let li = document.createElement('li')
        li.classList.add('list-group-item')
        i%2 == 0 ? li.classList.add('list-group-item-primary') : ''
        li.innerHTML =  `<b>${ mess.email } [${ mess.time }]:</b> ${ mess.text }`
        messageBox.appendChild(li)
        i++
    })


}

window.onload = () => {
    const socket = io();
    socket.on('data', data => {
        loadProd(data)
        socket.emit('data', 'ok')
    })
    socket.on('messages', messages => {
        loadChat(messages)
    })
};