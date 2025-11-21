import {guardarCarrito, obtenerCarrito, vaciarCarritoStorage} from "./storage.js"
import {actualizarContador, mostrarMensaje} from "./ui.js"


export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito();
    carrito.push(producto);
    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje("Prenda agregada!")
};

export const eliminarProducto = (id) => {
    const carrito = obtenerCarrito();
    carrito.splice(id, 1);
    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje("Prenda eliminada del carrito!")

};

export const vaciarCarrito = () =>{
    vaciarCarritoStorage();
    actualizarContador([]);
    mostrarMensaje("Carrito vaciado!")
};