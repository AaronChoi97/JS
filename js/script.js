
let precioTotal = 0

function Producto(nombre, precio, stock) {
    this.nombre=nombre
    this.precio=precio
    this.stock=stock

}

const productoA= new Producto ('Vino', 250, 15)
const productoB = new Producto ('Cerveza', 180, 35)

let listaProductos = [productoA, productoB]


let nombre1 = prompt("Ingrese su nombre:")

alert("Bienvenido " + nombre1)

let edad = parseInt(prompt("Ingrese su edad"));


let nombreProductos= listaProductos.map ((producto) => producto.nombre)

/*function listarProdcutos() {
    for(const producto of listaProductos){
        nombreProductos.push(producto.nombre)
    }
    
}

listarProdcutos()*/

function calculo(cantidad,precio,stock) {
    while(cantidad>stock){
                
        alert('Lo sentimos no tenemos stock'); 

        cantidad = parseInt(prompt('Cuantas quiere llevar?'))
    };
    if (cantidad<=stock){

        precioTotal+=cantidad*precio

        alert('Esta llevando $'+(cantidad*precio))
    } 
}

if (edad>=18){

    let carrito = prompt ('Que producto quiere comprar? \n' + nombreProductos.join('\n')+ '\nAmbos').toLocaleLowerCase() 

    switch (carrito){

        case 'vino':
            
            let cantidadA = parseInt(prompt('Cuantas botellas quiere llevar?'));

            calculo(cantidadA,productoA.precio,productoA.stock)

            break;

        case 'cerveza':
        
            let cantidadB = parseInt(prompt('Cuantas botellas quiere llevar?'));

            calculo(cantidadB,productoB.precio,productoB.stock)    

            break;
        
        case 'ambos':
    
            let cantidadAA = parseInt(prompt('Cuantas botellas de vino quiere llevar?'));

            calculo(cantidadAA,productoA.precio,productoA.stock)

            let cantidadBB = parseInt(prompt('Cuantas latas de cerveza quiere llevar?'));

            calculo(cantidadBB,productoB.precio,productoB.stock)

            alert('El precio total de la compra es: $'+precioTotal);

            break;   
    }


    alert('Gracias por su compra')
}
else{
    alert('No puede realizar la compra por ser menor de edad')
}


for(const producto of listaProductos){

    if(producto.stock){
    
        let cuenta = document.createElement('p')

        let divProducto = document.getElementById ('productos')

        cuenta.innerHTML= `<h3>${producto.nombre}</h3>
                            <p>$ ${producto.precio}</p>
                            <p>Unidades restantes: ${producto.stock}</p>`

        divProducto.appendChild(cuenta)

    }

}