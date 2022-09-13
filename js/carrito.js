const contenedorProductos = document.getElementById('productos')

const contenedorCarrito = document.getElementById('carrito')

const botonPedir = document.getElementById("boton-comprar")

const botonVaciar = document.getElementById('boton-vaciar')

const precioTotal = document.getElementById('total')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

async function listaDeProductos() {
    const URLJSON = "/data.json"
    const resp = await fetch("data.json")
    const data = await resp.json()
    listaDeProductos = data;
    renderizarProductos();
}

listaDeProductos()

/* lista de productos*/ 
function renderizarProductos() {
    listaDeProductos.forEach((producto) =>{
        let div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img src=${producto.img} alt= "">
        <h3>${producto.nombre}</h3>
        <p class="precioProducto">Precio:  $ ${producto.precio}</p>
        <p>Stock: ${producto.stock}</p>
        <button id="agregar${producto.id}" class="btn btn-outline-info">Agregar</button>`
    
        contenedorProductos.appendChild(div)
    
        const boton = document.getElementById(`agregar${producto.id}`) /*Averigua este simbolo ` */
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
        })
    });
}

//Boton Agregar
const agregarAlCarrito = (prodId) => {

    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
                localStorage.setItem('carrito', JSON.stringify(carrito))
            }
        })
    }else{

    const item = listaDeProductos.find((prod) => //problema!!!
        prod.id === prodId)
        carrito.push(item)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        alerta();
}

    actualizarCarrito()
}

const alerta = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregado al Carrito!',
        showConfirmButton: true,
        timer: 1000,
        confirmButtonText: "Seguir Comprando"
    })
}
//Carrito
const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""


    carrito.forEach((prod) => {
        const div = document.createElement ('div')
        div.className = ('productoEnCarrito')
        div.innerHTML =  `
        <p>${prod.nombre}</p>
        <p>Precio:  $ ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button id="eliminarDelCarrito${prod.id}" class="btn btn-outline-warning">X</button>
        `
        contenedorCarrito.appendChild(div);
        //Boton
        const boton = document.getElementById(`eliminarDelCarrito${prod.id}`) /*Averigua este simbolo ` */
        boton.addEventListener('click', () => {
            eliminarDelCarrito(prod.id)
        });
    })
    precioTotal.innerText = carrito.reduce ((acc, prod) => acc + prod.precio * prod.cantidad, 0)
}
//Boton Eliminar Item
const eliminarDelCarrito = (prodId) => {

    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 

    actualizarCarrito() 
}
//Boton Realizar Compra
const realizarPedido = ({
    value: email
}) => {
    (async () => {

        const {
            value: email
        } = await Swal.fire({
            title: 'Te enviaremos el Link de pago',
            input: 'email',
            inputLabel: 'Ingresa tu email',
            inputPlaceholder: 'Email'
        })

        if (email) {
            Swal.fire(`Finaliza tu compra ingresando a: ${email}`)
        }
    })()
}
botonPedir.addEventListener("click", realizarPedido);
//Boton Vaciar Carrito
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
            localStorage.removeItem('carrito');
                localStorage.clear();
        }
      })
})

     
   