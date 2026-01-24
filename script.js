function toggleDark() {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark");
  const btn = document.getElementById("dark-mode-btn");
  
  // Cambiar el icono según el modo
  if (isDark) {
    btn.textContent = "light_mode";
  } else {
    btn.textContent = "dark_mode";
  }
  
  // Guardar preferencia en localStorage
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}

// Cargar preferencia guardada al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("darkMode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedMode === "enabled" || (!savedMode && prefersDark)) {
    document.documentElement.classList.add("dark");
    const btn = document.getElementById("dark-mode-btn");
    if (btn) btn.textContent = "light_mode";
  }
});

// Lista de productos iniciales con imágenes
const products = [
  {
    name: "Lechuga Mantecosa",
    price: "$2.50",
    cultivationCost: "$0.80",
    description: "Hojas suaves, sabor mantecoso, ideal para ensaladas.",
    tier: "Nivel 1 • Botella PET #04",
    growth: 65,
    stage: "Vegetativa",
    moisture: 72,
    water: "120ml / día",
    icon: "eco",
    image: "./assets/img/img1.jpeg"
  },
  {
    name: "Albahaca Italiana",
    price: "$1.80",
    cultivationCost: "$0.60",
    description: "Aroma intenso, perfecta para pesto y salsas.",
    tier: "Nivel 2 • Botella PET #08",
    growth: 25,
    stage: "Plántula",
    moisture: 68,
    water: "85ml / día",
    icon: "local_florist",
    image: "./assets/img/img2.jpeg"
  },
  {
    name: "Espinaca Baby",
    price: "$3.00",
    cultivationCost: "$1.20",
    description: "Hojas tiernas, alto contenido de hierro.",
    tier: "Nivel 3 • Botella PET #12",
    growth: 95,
    stage: "Madura",
    moisture: 70,
    water: "140ml / día",
    icon: "nutrition",
    image: "./assets/img/img3.jpeg"
  }
];

const cropList = document.getElementById("crop-list");
const addPlantBtn = document.getElementById("add-plant-btn");

function renderPlant(plant) {
  const li = document.createElement("li");
  li.className = "p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4";
  li.innerHTML = `
    <div class="flex items-center gap-4 min-w-[240px]">
      ${plant.image ? 
        `<img src="${plant.image}" alt="${plant.name}" class="w-16 h-16 rounded-full object-cover border-2 border-green-200 dark:border-green-800 shadow-sm" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
         <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-700 dark:text-green-300" style="display:none;">
           <span class="material-symbols-outlined text-3xl">${plant.icon}</span>
         </div>` :
        `<div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-700 dark:text-green-300">
           <span class="material-symbols-outlined text-3xl">${plant.icon}</span>
         </div>`
      }
      <div>
        <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100">${plant.name}</h4>
        <p class="text-sm text-slate-500 dark:text-slate-400">${plant.tier}</p>
        ${plant.price ? `<p class="text-sm text-green-600 font-semibold mt-1">Venta: ${plant.price}</p>` : ''}
        ${plant.cultivationCost ? `<p class="text-sm text-orange-500 font-semibold">Cultivo: ${plant.cultivationCost}</p>` : ''}
        ${plant.description ? `<p class="text-sm text-slate-600 dark:text-slate-400 mt-1">${plant.description}</p>` : ''}
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
      <div>
        <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Etapa</p>
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold dark:text-slate-200">${plant.stage}</span>
          <div class="w-20 h-2 bg-gray-100 dark:bg-slate-700 rounded-full">
            <div class="h-full bg-green-500 rounded-full" style="width: ${plant.growth}%;"></div>
          </div>
        </div>
      </div>
      <div>
        <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Humedad</p>
        <div class="flex items-center gap-1">
          <span class="material-symbols-outlined text-blue-400 dark:text-blue-300 text-sm">water_drop</span>
          <span class="text-sm font-bold dark:text-slate-200">${plant.moisture}%</span>
        </div>
      </div>
      <div class="hidden md:block">
        <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Consumo</p>
        <p class="text-sm font-bold dark:text-slate-200">${plant.water}</p>
      </div>
    </div>
  `;
  cropList.appendChild(li);
}

products.forEach(renderPlant);

addPlantBtn.addEventListener("click", () => {
  const newPlant = {
    name: "Nueva Planta",
    tier: "Nivel X • Botella PET #XX",
    growth: 10,
    stage: "Plántula",
    moisture: 60,
    water: "90ml / día",
    icon: "spa"
  };
  renderPlant(newPlant);
});

// Mostrar resumen del sistema
function exportarDatos() {
  const agua = document.getElementById("nivel-agua")?.textContent || "N/A";
  const humedad = document.getElementById("humedad")?.textContent || "N/A";
  const temperatura = document.getElementById("temperatura")?.textContent || "N/A";
  const riego = document.getElementById("estado-riego")?.textContent || "N/A";

  const plantas = Array.from(document.querySelectorAll("#crop-list li")).map(li => {
    const nombre = li.querySelector("h4")?.textContent || "Planta";
    const nivel = li.querySelector("div[style]")?.style.width || "0%";
    return `${nombre} (${nivel} crecimiento)`;
  });

  const resumen = `
🔍 Estado actual del sistema EcoGrow:

💧 Agua: ${agua}
🌫️ Humedad: ${humedad}
🌡️ Temperatura: ${temperatura}
🚿 Riego: ${riego}

🌱 Plantas activas:
- ${plantas.join("\n- ")}

✔️ Datos obtenidos correctamente.
  `;

  alert(resumen);
}

// ====== VALIDACIONES DEL FORMULARIO ======

const form = document.getElementById("registration-form");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const edad = document.getElementById("edad");
const submitBtn = document.getElementById("submit-btn");

// Expresión regular para validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Expresión regular para validar contraseña (8+ caracteres, 1 número, 1 carácter especial)
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

function validateNombre() {
  if (nombre.value === "") return true;
  const isValid = nombre.value.length >= 3;
  toggleError("error-nombre", !isValid);
  toggleFieldStyle(nombre, isValid);
  return isValid;
}

function validateEmail() {
  if (email.value === "") return true;
  const isValid = emailRegex.test(email.value);
  toggleError("error-email", !isValid);
  toggleFieldStyle(email, isValid);
  return isValid;
}

function validatePassword() {
  if (password.value === "") return true;
  const isValid = passwordRegex.test(password.value);
  toggleError("error-password", !isValid);
  toggleFieldStyle(password, isValid);
  return isValid;
}

function validateConfirmPassword() {
  if (confirmPassword.value === "") return true;
  const isValid = password.value === confirmPassword.value && confirmPassword.value !== "";
  toggleError("error-confirm-password", !isValid);
  toggleFieldStyle(confirmPassword, isValid);
  return isValid;
}

function validateEdad() {
  if (edad.value === "") return true;
  const isValid = edad.value >= 18;
  toggleError("error-edad", !isValid);
  toggleFieldStyle(edad, isValid);
  return isValid;
}

function toggleError(errorId, show) {
  const errorElement = document.getElementById(errorId);
  if (show) {
    errorElement.classList.remove("hidden");
  } else {
    errorElement.classList.add("hidden");
  }
}

function toggleFieldStyle(field, isValid) {
  if (field.value === "") {
    field.classList.remove("valid", "invalid");
  } else if (isValid) {
    field.classList.remove("invalid");
    field.classList.add("valid");
  } else {
    field.classList.remove("valid");
    field.classList.add("invalid");
  }
}

function checkFormValidity() {
  const allFilled = nombre.value !== "" && email.value !== "" && password.value !== "" && confirmPassword.value !== "" && edad.value !== "";
  const allValid = 
    allFilled &&
    validateNombre() && 
    validateEmail() && 
    validatePassword() && 
    validateConfirmPassword() && 
    validateEdad();
  
  submitBtn.disabled = !allValid;
  return allValid;
}

// Event listeners para validación en tiempo real
nombre.addEventListener("input", checkFormValidity);
email.addEventListener("input", checkFormValidity);
password.addEventListener("input", checkFormValidity);
confirmPassword.addEventListener("input", checkFormValidity);
edad.addEventListener("input", checkFormValidity);

// Manejar envío del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (checkFormValidity()) {
    const mensaje = `
✅ ¡Registro exitoso!

Datos ingresados:
- Nombre: ${nombre.value}
- Email: ${email.value}
- Edad: ${edad.value} años

Gracias por registrarte en EcoGrow.
    `;
    alert(mensaje);
    form.reset();
    submitBtn.disabled = true;
  }
});

// Reiniciar formulario
form.addEventListener("reset", () => {
  setTimeout(() => {
    submitBtn.disabled = true;
    document.querySelectorAll("#registration-form input").forEach(input => {
      input.classList.remove("valid", "invalid");
    });
    document.querySelectorAll("#registration-form p[id^='error-']").forEach(error => {
      error.classList.add("hidden");
    });
  }, 0);
});
