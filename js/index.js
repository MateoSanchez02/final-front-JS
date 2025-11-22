import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () =>{
    const contenedor = document.getElementById("contenedor-tarjetas");
    const carrito = obtenerCarrito(); 
    actualizarContador(carrito);
    fetch("/final-front-JS/data/productos.json").then(res => {
        if(!res.ok){
            throw new Error (`Error HTTP status: ${res.status}`)
        }

        return res.json()
    }).then(data => {
       data.forEach(producto => {
        // crear tarjeta 
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto-card");

        // crear img y asignarle clase y alt
        const imagen = document.createElement("img");
        imagen.classList.add("producto-imagen");
        imagen.alt = producto.nombre;
        imagen.src = producto.img;
        tarjeta.appendChild(imagen)

        //crear elemento div para la info
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

        //crear, asignar y agregar el footer de la card
        const footer_card = document.createElement("div");
        footer_card.classList.add("producto-footer");
        info.appendChild(footer_card);

        //crear, asignar y agregar al footer el precio
        const precio = document.createElement("span");
        precio.classList.add("producto-precio");
        precio.innerText = `$ ${producto.precio}`;
        footer_card.appendChild(precio);

        //crear, asignar, dar funcionalidad al boton y agregarlo al footer
        const boton_card = document.createElement("button");
        boton_card.classList.add("producto-boton");
        boton_card.textContent = "Comprar";
        boton_card.addEventListener("click", () => {
            agregarAlCarrito(producto);
        })
        footer_card.appendChild(boton_card); 
        
        //agregar la card (producto) al contenedor
        contenedor.appendChild(tarjeta)



       })
    }).catch(err => console.log(err));
});