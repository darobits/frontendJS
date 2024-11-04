// ../js/script.js

// Función que muestra el mensaje de producto añadido
function mostrarMensaje() {
    // Crear el elemento de mensaje
    const mensaje = document.createElement("div");
    mensaje.className = "mensaje-carrito";

    // Agregar el icono de exclamación y el texto al mensaje
    mensaje.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> Producto añadido correctamente!`;

    // Agregar el mensaje al cuerpo del documento
    document.body.appendChild(mensaje);

    // Eliminar el mensaje después de 2 segundos
    setTimeout(() => {
        mensaje.remove();
    }, 2000);
}

// Asignar el evento a los botones de agregar al carrito
document.querySelectorAll('.btn-agregar').forEach(boton => {
    boton.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar que se recargue la página
        mostrarMensaje();
    });
});
