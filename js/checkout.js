/// Recuperar el carrito del localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
const checkoutItemsContainer = document.getElementById('checkout-items');
const totalCarrito = document.getElementById('total-carrito');
const finalizarCompraButton = document.getElementById('finalize-purchase'); // Botón de finalizar compra
const confirmPurchaseButton = document.getElementById('confirmPurchase'); // Botón de confirmar compra
const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal')); // Modal de confirmación
const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal')); // Modal de agradecimiento

// Función para renderizar los productos en el checkout
function renderizarCheckout() {
    checkoutItemsContainer.innerHTML = ''; // Limpio el contenedor
    let total = 0;
    let hayProductos = Object.keys(carrito).length > 0;

    if (!hayProductos) {
        checkoutItemsContainer.innerHTML = '<h4>No hay productos en el carrito.</h4>';
        totalCarrito.textContent = 'Total: $0.00';
    } else {
        for (const producto of Object.values(carrito)) {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-card');
            productoDiv.innerHTML = `
                <div class="producto-info">
                    <h4>Producto: <span>${producto.nombre}</span></h4>
                    <p><strong>Cantidad:</strong> ${producto.cantidad}</p>
                    <p><strong>Precio unitario:</strong> $${producto.precio.toFixed(2)}</p>
                    <p><strong>Total:</strong> $${subtotal.toFixed(2)}</p>
                    <div class="producto-acciones">
                        <button class="btn btn-sm btn-danger" onclick="modificarCantidad('${producto.nombre}', -1)">-</button>
                        <button class="btn btn-sm btn-success" onclick="modificarCantidad('${producto.nombre}', 1)">+</button>
                    </div>
                </div>
            `;
            checkoutItemsContainer.appendChild(productoDiv);
        }

        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Función para actualizar cantidades en el carrito
function modificarCantidad(nombreProducto, cantidad) {
    if (carrito[nombreProducto]) {
        const nuevaCantidad = carrito[nombreProducto].cantidad + cantidad;

        // Asegurarse de que la cantidad no sea negativa
        if (nuevaCantidad >= 1) {
            carrito[nombreProducto].cantidad = nuevaCantidad;

            // Guardar de nuevo en el localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCheckout(); // Re-renderizar el contenido con la nueva cantidad
        }
    }
}

// Función para limpiar el carrito después de finalizar compra
function limpiarCarrito() {
    // Limpiar el carrito en localStorage
    localStorage.removeItem('carrito');
    // Limpiar la interfaz
    renderizarCheckout();
}

// Capturar el clic en "Finalizar Compra"
finalizarCompraButton.addEventListener('click', function (e) {
    e.preventDefault(); // Evitar el envío del formulario

    // Mostrar el modal de confirmación
    confirmModal.show();
});

// Confirmar compra desde el modal
confirmPurchaseButton.addEventListener('click', function () {
    // Limpiar el carrito
    limpiarCarrito();

    // Cerrar el modal de confirmación
    confirmModal.hide();

    // Mostrar el modal de agradecimiento
    thankYouModal.show();
});

// Renderizar los productos en el checkout al cargar la página
window.onload = renderizarCheckout;