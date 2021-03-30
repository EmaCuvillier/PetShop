fetch('https://apipetshop.herokuapp.com/api/articulos')
.then(respuesta => respuesta.json())
.then(data => miPrograma(data))
.catch(error => console.log(error))

var productos
function miPrograma(data){
    for(let i = 0; i < data.response.length; i++){
        if(productosFiltrosFarmacia && data.response[i].tipo == 'Medicamento'){
            crearTarjeta(data.response[i].nombre, data.response[i].precio, data.response[i].imagen, data.response[i].descripcion, data.response[i]._id, data.response[i].stock)
        }
        if(productosFiltrosJuguetes && data.response[i].tipo == 'Juguete'){
            crearTarjeta(data.response[i].nombre, data.response[i].precio, data.response[i].imagen, data.response[i].descripcion, data.response[i]._id, data.response[i].stock)
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

function crearTarjeta(nombre, precio, imagen, descripcion, id, stock){
    const tarjeta = document.createElement('div')
        tarjeta.className = 'card tarjetaProducto hvr-grow-shadow'
        tarjeta.innerHTML = `
        <div class='font'> 
            <img class='card-img-top' src='${imagen}' alt='${nombre}'>
            <div class="card-body">
               <h6 class="card-title">${nombre}</h6>
               <p class="card-text">$${precio}</p>
               <a id='btn1 ${id}' class='verDescripcion'>Ver descripción..</a>
               <button id='${id}' class="btn btn-outline-success anadirCarrito">Añadir al carrito</button>
            </div>
        </div>
        <div class='back invisible'>
        <p>${descripcion}</p> 
        <button id='btn2 ${id}' class='cerrarDescripcion'>X</button>
        </div>
            `
    div.appendChild(tarjeta)
    document.getElementById(`btn1 ${id}`).addEventListener('click', function(e){
        if(this.parentElement.parentElement.parentElement.children[1].className == 'back invisible'){
            this.parentElement.parentElement.parentElement.children[1].className = 'visible'
            ultimasUnidades.style.display = 'none'
        }
    })
    document.getElementById(`btn2 ${id}`).addEventListener('click', function(e){
        this.parentElement.className = 'back invisible'
        ultimasUnidades.style.display = 'block'
    })
    document.getElementById(`${id}`).addEventListener('click', function(e){ 
        arrayCarrito.push({nombre: nombre, precio: precio, id:id, cantidad: 1})
        renderCarrito(arrayCarrito)
        cambiarCantidad(id)
    })
    const ultimasUnidades = document.createElement('p')
    ultimasUnidades.innerText = 'Ultimas Unidades!!'
    ultimasUnidades.className = 'ultimasUnidades'
    if(stock < 5){
        tarjeta.appendChild(ultimasUnidades)
    }
}

const bodyTablaCarrito = document.querySelector('.bodyTablaCarrito')
var arrayCarrito = []
function renderCarrito(array){
    bodyTablaCarrito.innerHTML = ''
    array.map(producto => {
        bodyTablaCarrito.innerHTML += `
            <tr>
                <th scope="col">${producto.nombre}</th>
                <th scope="col"><button id='btnMen ${producto.id}' class='unidadesMenos'>-</button><button id='btnMas ${producto.id}' class='unidadesMas'>+</button></th>
                <th scope="col">${producto.cantidad}</th>
                <th scope="col">${producto.precio}</th>
            </tr>
        `
    })
}

function cambiarCantidad(id){
    document.getElementById(`btnMas ${id}`).addEventListener('click', function(){
        console.log(parseInt(this.parentElement.parentElement.children[2].innerText) + 1)
        renderCarrito(arrayCarrito)
    })
}


//validacion formulario
const email = document.getElementById('mail')
const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const enviarFormulario = document.getElementById('enviarFormulario')

function validarFormulario(){
    enviarFormulario.addEventListener('click', function(e){
        e.preventDefault()
        if(document.getElementById('nombre').value.length == 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes introducir un nombre'
            })
        }else if(document.getElementById('apellido').value == 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes introducir un apellido'
            })
        }else if(!regexEmail.test(email.value)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes ingresar un correo valido'
            })
        }else if(document.getElementById('areaComentario').value.length == 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes introducir un comentario'
            })
        }else{
            Swal.fire({
                icon: 'success',
                title: `Muchas gracias ${document.getElementById('nombre').value}`,
                text: 'Nos pondremos en contacto a la brevedad'
            })
            document.getElementById("form").reset()
        }
        
    })
}
const form = document.getElementById('form')
if(form){
    validarFormulario()
}

