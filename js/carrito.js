let addButton = document.getElementById ('add-button')

addButton.addEventListener('click', addCarrito)

function addCarrito(){

    let itemText = productoEntryBox.value
    newProductoAdd(itemText)    
}

let productoEntryBox = document.getElementById ('producto-entry-box')

let carritoCompra = document.getElementById ('carrito-compra')

function newProductoAdd(text){

    let ProductoAdd = document.createElement ('ul')
    ProductoAdd.innerText = text

    carritoCompra.append(ProductoAdd)
}




let emptyButton = document.getElementById("empty-button")

emptyButton.addEventListener("click", emptyList)

function emptyList(){

    carritoCompra.innerHTML=""
    
}