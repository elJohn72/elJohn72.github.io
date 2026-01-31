document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const alertBtn = document.getElementById('alert-btn');

  // Validación simple
  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(input) {
    let valid = true;
    if (input.id === 'name') {
      valid = input.value.trim().length >= 3;
    } else if (input.id === 'email') {
      valid = isEmailValid(input.value.trim());
    } else if (input.id === 'message') {
      valid = input.value.trim().length > 0;
    }
    if (valid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
    return valid;
  }

  function updateSubmitState() {
    const ok = validateField(nameInput) && validateField(emailInput) && validateField(messageInput);
    submitBtn.disabled = !ok;
  }

  [nameInput, emailInput, messageInput].forEach(inp => {
    inp.addEventListener('input', updateSubmitState);
    inp.addEventListener('blur', () => validateField(inp));
  });

  // Manejo de envío
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateField(nameInput) || !validateField(emailInput) || !validateField(messageInput)) {
      updateSubmitState();
      return;
    }
    // Simular envío exitoso
    showBootstrapAlert('¡Formulario enviado con éxito! Gracias por contactarnos.', 'success');
    form.reset();
    [nameInput, emailInput, messageInput].forEach(i => i.classList.remove('is-valid'));
    submitBtn.disabled = true;
  });

  // Botón de alerta personalizada
  alertBtn.addEventListener('click', () => {
    showBootstrapAlert('Alerta personalizada: recuerda revisar la documentación del proyecto.', 'info');
  });

  // Función para mostrar alertas bootstrap dinámicas
  function showBootstrapAlert(message, type = 'info') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="toast align-items-center text-bg-${type} border-0 show" role="alert" aria-live="assertive" aria-atomic="true">`,
      `<div class="d-flex">`,
      `<div class="toast-body">${message}</div>`,
      `<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>`,
      `</div>`,
      `</div>`
    ].join('');
    document.body.appendChild(wrapper);
    setTimeout(() => {
      wrapper.remove();
    }, 4000);
  }
});
