// Claves oficiales de almacenamiento
const KEY_MASCOTAS = 'laika_mascotas';
const KEY_VETERINARIOS = 'laika_veterinarios';
const KEY_TURNOS = 'laika_turnos';
const KEY_HISTORIAS = 'laika_historias';

function getStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Inicialización: solo carga datos por defecto si la clave NUNCA existió
(function initStorage() {
  if (!localStorage.getItem(KEY_MASCOTAS)) {
    setStorage(KEY_MASCOTAS, [
      { idMascota: "1", nombreMascota: 'Milo', nombreDuenio: 'Carlos Gómez', color: 'Marrón y blanco', edad: 4, peso: 12.5, imagenMascota: '' },
      { idMascota: "2", nombreMascota: 'Luna', nombreDuenio: 'Ana Martínez', color: 'Negro', edad: 2, peso: 4.1, imagenMascota: '' }
    ]);
  }

  if (!localStorage.getItem(KEY_VETERINARIOS)) {
    setStorage(KEY_VETERINARIOS, [
      { idVeterinario: "101", matricula: 12345, nombre: 'Dr. Juan Pérez', especializacion: 'Clínica general', valorConsulta: 15000 },
      { idVeterinario: "102", matricula: 23456, nombre: 'Dra. María López', especializacion: 'Cirugía veterinaria', valorConsulta: 18000 },
      { idVeterinario: "103", matricula: 34567, nombre: 'Dr. Martín Gómez', especializacion: 'Medicina felina', valorConsulta: 16000 }
    ]);
  }

  if (!localStorage.getItem(KEY_TURNOS)) {
    setStorage(KEY_TURNOS, [
      { idTurno: "1", fechaHora: '2026-10-25T10:00', mascota: "1", veterinario: "101" }
    ]);
  }

  if (!localStorage.getItem(KEY_HISTORIAS)) {
    setStorage(KEY_HISTORIAS, [
      { idHistoriaClinica: "1", fechaHora: '2026-09-15T11:30', mascota: "1", veterinario: "101", peso: 12.5, temp: 38.5, proxcontrol: '2026-10-25', observaciones: 'Vacunación séxtuple al día. Excelente estado general.' }
    ]);
  }
})();