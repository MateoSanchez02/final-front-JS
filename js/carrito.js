import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
    const carrito = obtenerCarrito()
    actualizarContador(carrito)

    const contenedor = document.getElementById("contenedor-carrito")
    const acciones = document.getElementById("acciones-carrito")
    const resumen = document.getElementById("resumen-carrito")
    const total = document.getElementById("total")
    let cantidad = 0

    contenedor.innerHTML = ""
    acciones.innerHTML = ""

    if(!carrito.length){
        const mensaje = document.createElement("p")
        mensaje.classList.add("mensaje-carrito-vacio")
        mensaje.textContent = "El carrito está vacio!"
        contenedor.classList.add("vacio")
        total.innerText = ""
        contenedor.appendChild(mensaje)
        return
    }

    carrito.forEach((producto, indice) => {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto-card");

        // crear img y asignarle clase y alt
        const imagen = document.createElement("img");
        imagen.classList.add("producto-imagen");
        imagen.alt = producto.nombre;
        imagen.src = `${producto.img}`
        tarjeta.appendChild(imagen)

        //crear elemento div para la info y agregarlo a la card
        const info = document.createElement("div");
        info.classList.add("producto-info");
        tarjeta.appendChild(info)

        //crear, asignar y agregar el titulo
        const titulo = document.createElement("h3");
        titulo.innerText = producto.nombre;
        titulo.classList.add("producto-nombre");
        info.appendChild(titulo)

        //crear, asignar y agregar la descripcion
        const descripcion = document.createElement("p");
        descripcion.classList.add("producto-descripcion");
        descripcion.innerText = producto.descripcion;
        info.appendChild(descripcion);

        //crear, asignar y agregar el footer a la card
        const footer_card = document.createElement("div");
        footer_card.classList.add("producto-footer");
        info.appendChild(footer_card);

        //crear, asignar y agregar al footer el precio
        const precio = document.createElement("span");
        precio.classList.add("producto-precio");
        precio.innerText = `$ ${producto.precio}`;
        footer_card.appendChild(precio);

        //crear, asignar, dar funcionalidad al boton y agregarlo al footer
        const boton_eliminar = document.createElement("button");
        boton_eliminar.classList.add("producto-boton");
        boton_eliminar.textContent = "Eliminar";
        boton_eliminar.addEventListener("click", () => {
            eliminarProducto(indice)
            renderizarCarrito()   
        })
        footer_card.appendChild(boton_eliminar); 
        
        //agregar la card (producto) al contenedor

        cantidad += producto.precio
        total.innerText = `Total: $${cantidad}`
        resumen.appendChild(total)
        contenedor.appendChild(tarjeta)

    });

    const boton_vaciar = document.createElement("button")
    boton_vaciar.classList.add("producto-boton")
    boton_vaciar.classList.add("boton-vaciar")
    boton_vaciar.innerText = "Vaciar"

    boton_vaciar.addEventListener("click", () => {
        vaciarCarrito()
        renderizarCarrito()
    })

    acciones.appendChild(boton_vaciar)

}

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito()

})