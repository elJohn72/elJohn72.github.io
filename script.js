// script.js

// Mensaje simple al enviar el formulario
document.querySelector('form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('¡Gracias por contactarnos!');
  this.reset();
});