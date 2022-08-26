const contenedorProductos = document.getElementById('productos')

const contenedorCarrito = document.getElementById('carrito')

const botonVaciar = document.getElementById('boton-vaciar')

const precioTotal = document.getElementById('total')

let listaPosts = []

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

/*function render(lista){
    for(const producto of lista){
        const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio:  $ ${producto.precio}</p>
    <p>Stock: ${producto.stock}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar</button>`

    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`) 

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
    }
}

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio:  $ ${producto.precio}</p>
    <p>Stock: ${producto.stock}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar</button>`

    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`) /*Averigua este simbolo ` * 

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
});*/

const agregarAlCarrito = (prodId) => {

    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    }else{

    const item = stockProductos.find((prod) => 
        prod.id === prodId)
    carrito.push(item)}

    actualizarCarrito()
}

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""


    carrito.forEach((prod) => {
        const div = document.createElement ('div')
        div.className = ('productoEnCarrito')
        div.innerHTML =  `
        <p>${prod.nombre}</p>
        <p>Precio:  $ ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar">-</button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    precioTotal.innerText = carrito.reduce ((acc, prod) => acc + prod.precio * prod.cantidad, 0)
}

const eliminarDelCarrito = (prodId) => {

    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 

    actualizarCarrito() 
}

botonVaciar.addEventListener('click', () => {
    Swal.fire({
        title: 'Estas seguro de vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar carrito!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Carrito Vaciado!',
            'Se vacio tu carrito.',
            'success'
          )
            carrito.length = 0
            actualizarCarrito()
        }
      })
})

fetch('data.json')
    .then((response)=>response.json)
    .catch((error)=>console.log(error))
    .then((data)=>
        {
            data.forEach((producto) => {
                const div = document.createElement('div')
                div.classList.add('producto')
                div.innerHTML = `
                <img src=${producto.img} alt= "">
                <h3>${producto.nombre}</h3>
                <p class="precioProducto">Precio:  $ ${producto.precio}</p>
                <p>Stock: ${producto.stock}</p>
                <button id="agregar${producto.id}" class="boton-agregar">Agregar</button>`
            
                contenedorProductos.appendChild(div)
            
                const boton = document.getElementById(`agregar${producto.id}`) 
            
                boton.addEventListener('click', () => {
                    agregarAlCarrito(producto.id)
                })
            })
        }
    )