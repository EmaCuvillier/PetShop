fetch('https://apipetshop.herokuapp.com/api/articulos')
.then(respuesta => respuesta.json())
.then(data => miPrograma(data))
.catch(error => console.log(error))

var productos
function miPrograma(data){
    for(let i = 0; i < data.response.length; i++){
        if(productosFiltrosFarmacia && data.response[i].tipo == 'Medicamento'){
            crearTarjeta(data.response[i].nombre, data.response[i].precio, data.response[i].imagen, data.response[i].descripcion, data.response[i]._id)
        }
        if(productosFiltrosJuguetes && data.response[i].tipo == 'Juguete'){
            crearTarjeta(data.response[i].nombre, data.response[i].precio, data.response[i].imagen, data.response[i].descripcion, data.response[i]._i)
        }
    }
}

var productosFiltrosFarmacia = document.querySelector('.containerProductosFiltros')
var productosFiltrosJuguetes = document.querySelector('.containerProductosFiltrosJuguetes')

var div = document.createElement('div');
div.className = 'contenedorProductos'
if(productosFiltrosFarmacia){
    productosFiltrosFarmacia.appendChild(div)
}
if(productosFiltrosJuguetes){
    productosFiltrosJuguetes.appendChild(div)
}

function crearTarjeta(nombre, precio, imagen, descripcion, id){
    const tarjeta = document.createElement('div')
        tarjeta.className = 'card tarjetaProducto hvr-grow-shadow'
        tarjeta.setAttribute('id', id)
        tarjeta.innerHTML = `
        <div class='font'>
            <img src='${imagen}' class='card-img-top' style="width: 10vw;" alt='${nombre}'>
            <div class="card-body">
               <h6 class="card-title">${nombre}</h6>
               <p class="card-text">$${precio}</p>
               <button id='${id}' class="btn btn-outline-success">Añadir al carrito</button>
            </div>
        </div>
        <div class='back invisible'>
        <p>${descripcion}</p> 
        <button class='sacarDescripcion'>X</button>
        </div>
            `
    div.appendChild(tarjeta)
    const verDescripcion = document.createElement('button')
    verDescripcion.innerText = 'ver descripcion'
    tarjeta.appendChild(verDescripcion)
    verDescripcion.addEventListener('click', function(e){
        if(this.parentElement.children[1].className == 'back invisible'){
            this.parentElement.children[1].className = 'visible'
        }
    })
    document.querySelector('.sacarDescripcion').addEventListener('click', function(e){
        this.parentElement.className = 'back invisible'
    })
}


const arrayCarrito = [{
    descripcion: "Puede usar la bola interactiva de elasticidad para jugar con sus mascotas y fortalecer el vínculo, también ayuda a mejorar la inteligencia de las mascotas. El color brillante es fácil de despertar el interés de las mascotas y matar el tiempo aburrido. Juegue con él, el perro reducirá el daño de sus muebles y se sentirá menos solo cuando no esté en casa.",
    imagen: "https://cdn.shopify.com/s/files/1/0406/8003/0364/products/product-image-1432090831_1024x1024.jpg?v=1592521725",
    nombre: "Pelota interactiva de goma",
    precio: 450,
    stock: 18,
    tipo: "Juguete",
    __v: 0,
    _id: "5f204f86bf2ede0017e48507"
},
{
    descripcion: "Puede usar la bola interactiva de elasticidad para jugar con sus mascotas y fortalecer el vínculo, también ayuda a mejorar la inteligencia de las mascotas. El color brillante es fácil de despertar el interés de las mascotas y matar el tiempo aburrido. Juegue con él, el perro reducirá el daño de sus muebles y se sentirá menos solo cuando no esté en casa.",
    imagen: "https://cdn.shopify.com/s/files/1/0406/8003/0364/products/product-image-1432090831_1024x1024.jpg?v=1592521725",
    nombre: "Pelota interactiva de goma",
    precio: 450,
    stock: 18,
    tipo: "Juguete",
    __v: 0,
    _id: "5f204f86bf2ede0017e48507"
}
]

const cuerpoCarrito = document.getElementById('cuerpoCarrito')

var divCarrito = document.createElement('div');
divCarrito.className = 'contenedorProductosCarrito'
if(cuerpoCarrito){
    cuerpoCarrito.appendChild(divCarrito)
}

function renderCarrito (){
    arrayCarrito.map(producto => {
        const  productosCarrito = document.createElement('div')
        productosCarrito.className = 'productosCarrito'
        productosCarrito.innerHTML = `
        <div class="cadaProductoCarrito">
            <div class="d-flex justify-content-center">
               <h4>${producto.nombre}</h4>
            </div>
            <div class="d-flex justify-content-center">
               <p><button class="unidadesMenos">-</button> 1 <button class="unidadesMas"> +</button></p>
               <p>$${producto.precio}</p>
               <p><button class='closeProducto'>X</button></p>
            </div>
        </div>
        `
        divCarrito.appendChild(productosCarrito)
    })
}

renderCarrito()



const email = document.getElementById("mail");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("¡Se esperaba una dirección de correo electrónico!");
  } else {
    email.setCustomValidity("");
  }
});