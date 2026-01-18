function actualizarDatos() {
  document.getElementById("waterLevel").textContent = `${Math.floor(Math.random() * 21) + 70}%`;
  document.getElementById("temperature").textContent = `${Math.floor(Math.random() * 6) + 20}°C`;
  document.getElementById("nutrients").textContent = `${Math.floor(Math.random() * 21) + 60}%`;
  document.getElementById("light").textContent = `${Math.floor(Math.random() * 16) + 80}%`;
  document.getElementById("ph").textContent = (5.8 + Math.random() * 1.2).toFixed(1);
}

setInterval(actualizarDatos, 5000);
actualizarDatos();

// ----------------------
// Validaciones del Formulario de Registro
// ----------------------
const form = document.getElementById("registroForm");
if (form) {
  const submitBtn = document.getElementById("submitBtn");

  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const edad = document.getElementById("edad");

  function validarFormulario() {
    let valido = true;

    if (nombre.value.length < 3) {
      mostrarError("error-nombre", "El nombre debe tener al menos 3 caracteres");
      valido = false;
    } else {
      limpiarError("error-nombre");
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo.value)) {
      mostrarError("error-correo", "Correo inválido");
      valido = false;
    } else {
      limpiarError("error-correo");
    }

    const regexPass = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!regexPass.test(password.value)) {
      mostrarError("error-password", "Mínimo 8 caracteres, 1 número y 1 especial");
      valido = false;
    } else {
      limpiarError("error-password");
    }

    if (password.value !== confirmPassword.value) {
      mostrarError("error-confirm", "Las contraseñas no coinciden");
      valido = false;
    } else {
      limpiarError("error-confirm");
    }

    if (parseInt(edad.value) < 18 || isNaN(edad.value)) {
      mostrarError("error-edad", "Debes tener al menos 18 años");
      valido = false;
    } else {
      limpiarError("error-edad");
    }

    submitBtn.disabled = !valido;
  }

  function mostrarError(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
  }

  function limpiarError(id) {
    document.getElementById(id).textContent = "";
  }

  form.addEventListener("input", validarFormulario);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Formulario enviado correctamente");
  });
}