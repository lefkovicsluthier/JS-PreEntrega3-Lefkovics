class nuevoUsuario {
    constructor (nombreCliente, apellido){
        this.nombreCliente = nombreCliente;
        this.apellido = apellido;
    }
}

function mostrarInfo(){
	let nombre = document.getElementById("nombre").value;
	let apellido = document.getElementById("apellido").value;

	let nombreApellido = document.getElementById("nombreApellido");
	nombreApellido.innerHTML = "Bienvenido " + nombre + " " + apellido + ", gracias por preferirnos! <br> Escoja los productos de nuestra cartelera 😁";

	document.getElementById("datos").style.visibility = "hidden";
	document.getElementById("usuario").style.visibility = "visible";
}

let arrayCarnes = [
    {
        id: 1,
        nombre: "Bistec",
        categoria: "Carne_Res",
        precio: 200,
        img: "./Imagenes/Res/Bistec.jpg",
    },
    {
        id: 2,
        nombre: "Carne Molida",
        categoria: "Carne_Res",
        precio: 300,
        img: "./Imagenes/Res/Carne Molida.jpg",
    },
    {
        id: 3,
        nombre: "Costilla",
        categoria: "Carne_Res",
        precio: 250,
        img: "./Imagenes/Res/Costilla.jfif",
    },
    {
        id: 4,
        nombre: "Mano de Piedra",
        categoria: "Carne_Res",
        precio: 350,
        img: "./Imagenes/Res/Mano de Piedra.jfif",
    },
    {
        id: 5,
        nombre: "Carne para Mechar",
        categoria: "Carne_Res",
        precio: 400,
        img: "./Imagenes/Res/Carne para Mechar.jfif",
    },
    {
        id: 6,
        nombre: "Pechuga Deshuesada",
        categoria: "Carne_Pollo",
        precio: 300,
        img: "./Imagenes/Pollo/Pechuga Deshuesada.jfif",
    },
    {
        id: 7,
        nombre: "Filete",
        categoria: "Carne_Pollo",
        precio: 350,
        img: "./Imagenes/Pollo/Filete.jfif",
    },
    {
        id: 8,
        nombre: "Muslo",
        categoria: "Carne_Pollo",
        precio: 400,
        img: "./Imagenes/Pollo/Muslo.jfif",
    },
    {
        id: 9,
        nombre: "Pechuga",
        categoria: "Carne_Pollo",
        precio: 450,
        img: "./Imagenes/Pollo/Pechuga.jfif",
    },
    {
        id: 10,
        nombre: "Alas",
        categoria: "Carne_Pollo",
        precio: 500,
        img: "./Imagenes/Pollo/Alas.jfif",
    },
    ];

    const carnesJSON = JSON.stringify(arrayCarnes);

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: carnesJSON,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

    let cart= [];
    let cartJSON = "";
    let container = document.getElementById("hero");
    let cartRender = document.getElementById("cart-row");
    let modal = document.getElementById("myModal");
    let cartNav = document.getElementById("cart-nav");
    let botoncart= document.getElementById("cart-button");
    let total = document.getElementById("total");
    botoncart.addEventListener("click", mostrar);
    let containercartTotal = document.getElementById("containercartTotal");
    let totalFinal = "";
    let cantidad = "";
    
    renderizar(arrayCarnes);
    comprobar(cart);
    
    let res = document.getElementById("Carne_Res");
    let pollo = document.getElementById("Carne_Pollo");
    
    let inicio = document.getElementById("Inicio");
    let logo = document.getElementById("Logo");
    
    inicio.addEventListener("click", renderizarTodo);
    logo.addEventListener("click", renderizarTodo);
    
    res.addEventListener("click", filtro);
    pollo.addEventListener("click", filtro);

    function comprobar() {
        if (localStorage.getItem("cart")) {
            cart= JSON.parse(localStorage.getItem("cart"));
            mostrarCart(cart);
            totalRender(cart);
        } else {
            totalRenderVacio(cart);
        }
        }
    
    function filtro(e) {
    e.preventDefault();
    console.log(e.target.id);
    let categoriaFiltrado = arrayCarnes.filter(
        (cuadro) => cuadro.categoria == e.target.id
    );
    renderizar(categoriaFiltrado);
    }
    
    function renderizarTodo(e) {
    e.preventDefault();
    renderizar(arrayCarnes);
    }
    
    function renderizar(array) {
        container.innerHTML = "";
        for (const cuadro of array) {
            let tarjetaBody = document.createElement("div");
    
            tarjetaBody.className = "tarjeta-body";
            tarjetaBody.innerHTML = `
                <div class="card">
                    <div class="card-img">
                        <img src="${cuadro.img}" alt="Card image cap">
                    </div>
                    <h5 class="card-title">${cuadro.nombre}</h5>
                    <div class="cardBody">
                        <h6 class= "precio"><strong>Precio: ¢${cuadro.precio.toFixed(
                            2
                        )}</strong></h6>
                        <button id="${
                            cuadro.id
                        }"  class="btn btn-secondary me-md-2">Comprar</button>
                    </div>
                </div>
                `;
            container.append(tarjetaBody);
        }
    
        let comprar = document.getElementsByClassName("btn btn-secondary me-md-2");
    
        for (boton of comprar) {
            boton.addEventListener("click", addcart);
        }
    }
    
    function mostrarCart(array) {
    cartRender.innerHTML = "";
    for (let cuadro of array) {
        let cart = document.createElement("div");
        cart.className = "cart-render";
        cart.innerHTML = `
            <div class="cart-row">
                <div  style="flex:1"><img class="row-image" src="${
                    cuadro.img
                }"></div>
                <div  style="flex:2"><p class="cart-p">${cuadro.nombre}</p></div>
                <div  style="flex:1"><p class="cart-p">$${cuadro.precio.toFixed(
                    2
                )}</p></div>
                <div style="flex:1">
                    <p class="quantity">${cuadro.cantidad}</p>
                    <div class="quantity">
                    <img id="${
                        cuadro.id
                    }" class="subir-cant update-cart " src="./Imagenes/up.png">
                    <img id="${
                        cuadro.id
                    }" class="bajar-cant update-cart" src="./Imagenes/down.png">
                    </div>
                </div>
                <div style="flex:1"><p class="cart-p">$${cuadro.subtotal.toFixed(
                    2
                )}</p></div>
            </div>
            `;
        cartRender.append(cart);
    }
    
    let add = document.getElementsByClassName("subir-cant update-cart");
    for (let a of add) {
        a.addEventListener("click", addcart);
    }
    let remove = document.getElementsByClassName("bajar-cant update-cart");
    for (let b of remove) {
        b.addEventListener("click", removeItem);
    }
    }
    
    function addcart(e) {
        let productoBuscado = arrayCarnes.find((cuadro) => cuadro.id == e.target.id);
        let indexCuadro = cart.findIndex((cuadro) => cuadro.id == productoBuscado.id);
    
        Swal.fire({
            title: "<i>Agregar Producto</i>", 
            html: "Se agregó el producto correctamente.",  
            confirmButtonText: "Aceptar", 
            });
    
        if (indexCuadro != -1) {
            cart[indexCuadro].cantidad++;
            cart[indexCuadro].subtotal =
            cart[indexCuadro].precio * cart[indexCuadro].cantidad;
            cartJSON = JSON.stringify(cart);
            localStorage.setItem("cart", cartJSON);
        } else {
            cart.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            categoria: productoBuscado.categoria,
            precio: productoBuscado.precio,
            img: productoBuscado.img,
            cantidad: 1,
            subtotal: productoBuscado.precio,
            });
            cartJSON = JSON.stringify(cart);
            localStorage.setItem("cart", cartJSON);
        }
        mostrarCart(cart);
        totalRender(cart);
    }
    
    function removeItem(e) {
        Swal
        .fire({
            title: "ELIMINAR",
            text: "¿Desea eliminar el producto?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
                eliminarProducto(e);
            } else {
            }
        });
    }
    
    function eliminarProducto(e)
    {
        let productoBuscado = arrayCarnes.find((cuadro) => cuadro.id == e.target.id);
        let indexCuadro = cart.findIndex((cuadro) => cuadro.id == productoBuscado.id);
    
        if (indexCuadro != -1) {
            if (cart[indexCuadro].cantidad >= 2) {
            cart[indexCuadro].cantidad--;
            cart[indexCuadro].subtotal =
                cart[indexCuadro].subtotal - cart[indexCuadro].precio;
            cartJSON = JSON.stringify(cart);
            localStorage.setItem("cart", cartJSON);
            } else {
            cart.splice(indexCuadro, 1);
            cartJSON = JSON.stringify(cart);
            localStorage.setItem("cart", cartJSON);
            }
        }
        totalFinal = cart.reduce((a, b) => a + b.subtotal, 0);
        cantidad = cart.reduce((a, b) => a + b.cantidad, 0);
        mostrarCart(cart);
        totalRender(cart);
    }
    
    function totalRender(array) {
    totalFinal = cart.reduce((a, b) => a + b.subtotal, 0);
    cantidad = cart.reduce((a, b) => a + b.cantidad, 0);
    total.innerHTML = "";
    let totalResumen = document.createElement("div");
    totalResumen.className = "total";
    totalResumen.innerHTML = `
        <span class="close">&times;</span> 
        <h5 class="totalh5" >Total:<strong> ¢${totalFinal.toFixed(
            2
        )}</strong></h5>
        `;
    total.append(totalResumen);
    
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    };
    
    cartNav.innerHTML = "";
    if (array.lenght != 0) {
        let parrafo = document.createElement("div");
        parrafo.className = "cart-total";
        parrafo.innerHTML = `<p>${cantidad}</p>`;
        cartNav.append(parrafo);
    } else {
        let parrafo = document.createElement("div");
        parrafo.className = "cart-total";
        parrafo.innerHTML = `<p>0</p>`;
        cartNav.append(parrafo);
    }
    }
    
    function totalRenderVacio(arrayCarnes) {
    total.innerHTML = "";
    let totalResumen = document.createElement("div");
    totalResumen.className = "total";
    totalResumen.innerHTML = `
            <span class="close">&times;</span> 
            <h5 class="totalh5">Productos: <strong> 0 </strong></h5>
            <h5 class="totalh5">Total:<strong> ¢0.00 </strong></h5>
            `;
    total.append(totalResumen);
    cartNav.innerHTML = "";
    let parrafo = document.createElement("div");
    parrafo.className = "cart-total";
    parrafo.innerHTML = `<p>0</p>`;
    cartNav.append(parrafo);
    }
    
    function mostrar(e) {
    modal.style.display = "block";
    }