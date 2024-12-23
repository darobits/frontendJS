// Asegúrate de que el documento esté listo
$(document).ready(function () {
    const finalizarCompraButton = $('#finalize-purchase');
    const confirmModal = new bootstrap.Modal($('#confirmModal')[0]);
    const confirmPurchaseButton = $('#confirmPurchase');
    const checkoutForm = $('#checkout-form');
    
    // Al hacer clic en "Finalizar Compra", mostrar el modal de confirmación
    finalizarCompraButton.on('click', function () {
        confirmModal.show();
    });

    // Al confirmar la compra
    confirmPurchaseButton.on('click', function () {
        // Cambiar el texto y el estilo del botón a "Enviar Pedido"
        finalizarCompraButton.text('Enviar Pedido')
            .removeClass('btn-primary')
            .addClass('btn-success');

        // Enviar el formulario a Formspree
        checkoutForm.submit();

        // Cerrar el modal de confirmación
        confirmModal.hide();

        // Mostrar el modal de agradecimiento
        $('#thankYouModal').modal('show');
    });
});

function clearForm() {
// Espera un poco para que el formulario se envíe antes de limpiarlo
setTimeout(function() {
// Limpia los campos del formulario
$('#checkout-form')[0].reset();
}, 1000);  // 1 segundo de espera antes de limpiar los campos
}