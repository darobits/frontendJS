document.addEventListener('DOMContentLoaded', () => {
    const carritoLateral = document.getElementById('cart-sidebar');
    const listaCarrito = document.getElementById('cart-items-list');
    const totalCarrito = document.getElementById('total-carrito');
    const cartIcon = document.getElementById('cart-icon');
    const finalizeBtn = document.getElementById('finalize-btn');

    // Cargar el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};

    // Mostrar u ocultar el carrito lateral
    function toggleCarritoLateral() {
        carritoLateral.style.right = carritoLateral.style.right === '0px' ? '-300px' : '0px';
    }

    // Actualiza el total del carrito
    function actualizarTotal() {
        let total = 0;
        for (const producto of Object.values(carrito)) {
            total += producto.precio * producto.cantidad;
        }
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Renderiza el contenido del carrito
    function renderizarCarrito() {
        listaCarrito.innerHTML = '';
        if (Object.keys(carrito).length === 0) {
            listaCarrito.innerHTML = '<li>No hay productos en el carrito.</li>';
        } else {
            for (const producto of Object.values(carrito)) {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${producto.nombre} 
                    <span>x${producto.cantidad}</span> 
                    <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span>
                    <button class="btn-modificar" data-nombre="${producto.nombre}">+</button>
                    <button class="btn-eliminar" data-nombre="${producto.nombre}">-</button>
                `;
                listaCarrito.appendChild(li);
            }
        }
        actualizarTotal();
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Añadir al carrito
    function agregarAlCarrito(event) {
        event.preventDefault();
        const productoInfo = event.target.closest('.producto-card');
        const nombre = productoInfo.querySelector('h3').textContent;
        const precio = parseFloat(productoInfo.querySelector('.producto-precio').textContent.replace('$', ''));
        const cantidad = parseInt(productoInfo.querySelector('.cantidad-input').value);

        if (carrito[nombre]) {
            carrito[nombre].cantidad += cantidad;
        } else {
            carrito[nombre] = { nombre, precio, cantidad };
        }

        renderizarCarrito();

        // Verifica si el carrito está oculto antes de mostrarlo
        if (carritoLateral.style.right === '-300px' || carritoLateral.style.right === '') {
            toggleCarritoLateral(); // Solo muestra el carrito si está oculto
        }
    }

    // Añadir al carrito (extensión para combos)
       function agregarComboAlCarrito(event) {
          event.preventDefault();
          const comboInfo = event.target.closest('.combo-card');
          const nombre = comboInfo.querySelector('h3').textContent;
          const precio = parseFloat(comboInfo.querySelector('.combo-precio').textContent.replace('$', ''));
          const cantidad = parseInt(comboInfo.querySelector('.cantidad-input').value);

        if (carrito[nombre]) {
        carrito[nombre].cantidad += cantidad;
        } else {
        carrito[nombre] = { nombre, precio, cantidad };
     }

    renderizarCarrito();

    // Verifica si el carrito está oculto antes de mostrarlo
    if (carritoLateral.style.right === '-300px' || carritoLateral.style.right === '') {
        toggleCarritoLateral(); // Solo muestra el carrito si está oculto
    }
}

// Asignar evento a cada botón "Agregar al carrito" de los combos
document.querySelectorAll('.combos-container .btn-agregar').forEach(btn => {
    btn.addEventListener('click', agregarComboAlCarrito);
});

    // Modificar o eliminar productos en el carrito
    function modificarCarrito(event) {
        const productoNombre = event.target.dataset.nombre;
        if (event.target.classList.contains('btn-modificar')) {
            carrito[productoNombre].cantidad++;
        } else if (event.target.classList.contains('btn-eliminar')) {
            carrito[productoNombre].cantidad--;
            if (carrito[productoNombre].cantidad <= 0) {
                delete carrito[productoNombre];
            }
        }
        renderizarCarrito();
    }

    // Finalizar compra
    function finalizarCompra() {
        window.location.href = 'checkout.html';
    }

    // Asignar evento a cada botón "Agregar al carrito"
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
    });

    // Evento para mostrar/ocultar carrito
    cartIcon.addEventListener('click', toggleCarritoLateral);

    // Evento para modificar el carrito
    listaCarrito.addEventListener('click', modificarCarrito);

    // Evento para finalizar compra
    finalizeBtn.addEventListener('click', finalizarCompra);

    // Renderiza el carrito al cargar la página
    renderizarCarrito();
});
