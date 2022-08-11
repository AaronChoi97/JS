const contenedorProductos = document.getElementById('productos')

const contenedorCarrito = document.getElementById('carrito')

const botonVaciar = document.getElementById('boton-vaciar')

const precioTotal = document.getElementById('total')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

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

    const boton = document.getElementById(`agregar${producto.id}`) /*Averigua este simbolo ` */ 

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
});

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
    precioTotal.innerText = carrito.reduce ((acc, prod) => acc + prod.precio, 0)
}

const eliminarDelCarrito = (prodId) => {

    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 

    actualizarCarrito() 
}

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})