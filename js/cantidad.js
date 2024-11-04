function incrementarCantidad() {
    const cantidadInput = document.getElementById('cantidad');
    cantidadInput.value = parseInt(cantidadInput.value) + 1; // Incrementa la cantidad
}

function decrementarCantidad() {
    const cantidadInput = document.getElementById('cantidad');
    if (cantidadInput.value > 1) {
        cantidadInput.value = parseInt(cantidadInput.value) - 1; // Baja la cantidad
    }
}
