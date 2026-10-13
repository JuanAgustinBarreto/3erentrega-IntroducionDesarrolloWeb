let modalMascota = null;

document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('modalMascota');
  if (modalEl) modalMascota = new bootstrap.Modal(modalEl);

  renderMascotas();

  // Convertir foto seleccionada a Base64
  const fileInput = document.getElementById('mascota-file');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          document.getElementById('mascota-base64').value = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const form = document.getElementById('form-mascota');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      guardarMascota();
    });
  }
});

function renderMascotas() {
  const tbody = document.getElementById('tabla-mascotas');
  if (!tbody) return;

  const mascotas = getStorage(KEY_MASCOTAS);
  
  // Actualizar contador badge de total de registros
  const badgeTotal = document.getElementById('total-mascotas');
  if (badgeTotal) badgeTotal.textContent = mascotas.length;

  tbody.innerHTML = '';

  if (mascotas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">No hay mascotas registradas.</td></tr>`;
    return;
  }

  mascotas.forEach(m => {
    const tr = document.createElement('tr');
    const fotoSrc = m.imagenMascota || '../assets/images/logo1.png';
    tr.innerHTML = `
      <td><img src="${fotoSrc}" alt="${m.nombreMascota}" class="img-mascota-tabla"></td>
      <td><strong>${m.nombreMascota}</strong></td>
      <td>${m.nombreDuenio}</td>
      <td>${m.color}</td>
      <td>${m.edad} ${m.edad === 1 ? 'año' : 'años'}</td>
      <td>${m.peso} kg</td>
      <td class="text-end">
        <div class="acciones-contenedor">
          <button class="btn btn-sm btn-outline-warning" onclick="editarMascota('${m.idMascota}')">✏️️ Editar</button>
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarMascota('${m.idMascota}')">🗑️ Borrar</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Reaplicar filtro activo si hay texto en el buscador
  filtrarTablaMascotas();
}

function filtrarTablaMascotas() {
  const query = document.getElementById('buscar-mascota')?.value.toLowerCase() || '';
  const filas = document.querySelectorAll('#tabla-mascotas tr');

  filas.forEach(fila => {
    const textoFila = fila.innerText.toLowerCase();
    // No ocultar el mensaje de "no hay registros"
    if (fila.querySelector('td[colspan]')) return;
    fila.style.display = textoFila.includes(query) ? '' : 'none';
  });
}

function abrirModalNuevaMascota() {
  const form = document.getElementById('form-mascota');
  if (form) form.reset();

  document.getElementById('mascota-id').value = '';
  document.getElementById('mascota-base64').value = '';
  document.getElementById('tituloModalMascota').textContent = 'Registrar Mascota';

  if (modalMascota) modalMascota.show();
}

function guardarMascota() {
  const idStr = document.getElementById('mascota-id').value;
  const mascotas = getStorage(KEY_MASCOTAS);

  const nuevaMascota = {
    idMascota: idStr ? idStr : String(Date.now()),
    nombreMascota: document.getElementById('mascota-nombre').value.trim(),
    nombreDuenio: document.getElementById('mascota-duenio').value.trim(),
    color: document.getElementById('mascota-color').value.trim(),
    edad: parseInt(document.getElementById('mascota-edad').value, 10),
    peso: parseFloat(document.getElementById('mascota-peso').value),
    imagenMascota: document.getElementById('mascota-base64').value
  };

  if (idStr) {
    const idx = mascotas.findIndex(m => String(m.idMascota) === String(idStr));
    if (idx !== -1) {
      if (!nuevaMascota.imagenMascota) nuevaMascota.imagenMascota = mascotas[idx].imagenMascota;
      mascotas[idx] = nuevaMascota;
    }
  } else {
    mascotas.push(nuevaMascota);
  }

  setStorage(KEY_MASCOTAS, mascotas);
  if (modalMascota) modalMascota.hide();
  renderMascotas();
}

function editarMascota(id) {
  const mascotas = getStorage(KEY_MASCOTAS);
  const m = mascotas.find(item => String(item.idMascota) === String(id));
  if (!m) return;

  document.getElementById('mascota-id').value = m.idMascota;
  document.getElementById('mascota-nombre').value = m.nombreMascota;
  document.getElementById('mascota-duenio').value = m.nombreDuenio;
  document.getElementById('mascota-color').value = m.color;
  document.getElementById('mascota-edad').value = m.edad;
  document.getElementById('mascota-peso').value = m.peso;
  document.getElementById('mascota-base64').value = m.imagenMascota || '';
  document.getElementById('tituloModalMascota').textContent = 'Editar Mascota';

  if (modalMascota) modalMascota.show();
}

function eliminarMascota(id) {
  if (confirm('¿Estás seguro de que querés eliminar esta mascota?')) {
    let mascotas = getStorage(KEY_MASCOTAS);
    mascotas = mascotas.filter(m => String(m.idMascota) !== String(id));
    setStorage(KEY_MASCOTAS, mascotas);
    renderMascotas();
  }
}