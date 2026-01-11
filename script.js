// Simulación de actualización dinámica cada 5 segundos
function actualizarDatos() {
  document.getElementById("waterLevel").textContent = `${Math.floor(Math.random() * 21) + 70}%`;
  document.getElementById("temperature").textContent = `${Math.floor(Math.random() * 6) + 20}°C`;
  document.getElementById("nutrients").textContent = `${Math.floor(Math.random() * 21) + 60}%`;
  document.getElementById("light").textContent = `${Math.floor(Math.random() * 16) + 80}%`;
  document.getElementById("ph").textContent = (5.8 + Math.random() * 1.2).toFixed(1);
}

setInterval(actualizarDatos, 5000);
actualizarDatos();