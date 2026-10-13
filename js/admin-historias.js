let modalHistoria = null;

document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('modalHistoria');
  if (modalEl) modalHistoria = new bootstrap.Modal(modalEl);

  cargarFiltroMascotas();
  renderHistorias();

  const form = document.getElementById('form-historia');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      guardarHistoria();
    });
  }
});

function cargarFiltroMascotas() {
  const selectFiltro = document.getElementById('filtro-mascota');
  if (!selectFiltro) return;

  const mascotas = getStorage(KEY_MASCOTAS);
  selectFiltro.innerHTML = '<option value="todas">Todas las mascotas</option>' +
    mascotas.map(m => `<option value="${m.idMascota}">${m.nombreMascota} (${m.nombreDuenio})</option>`).join('');
}

function renderHistorias() {
  const tbody = document.getElementById('tabla-historias');
  if (!tbody) return;

  const historias = getStorage(KEY_HISTORIAS);
  const mascotas = getStorage(KEY_MASCOTAS);
  const vets = getStorage(KEY_VETERINARIOS);
  const filtroId = document.getElementById('filtro-mascota')?.value;

  tbody.innerHTML = '';

  let filtradas = historias;
  if (filtroId && filtroId !== 'todas') {
    filtradas = historias.filter(h => String(h.mascota) === String(filtroId));
  }

  if (filtradas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">No hay registros clínicos para mostrar.</td></tr>`;
    return;
  }

  filtradas.forEach(h => {
    const mascota = mascotas.find(m => String(m.idMascota) === String(h.mascota));
    const vet = vets.find(v => String(v.idVeterinario) === String(h.veterinario));

    const fechaFormateada = h.fechaHora 
      ? new Date(h.fechaHora).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      : '-';

    const proxControl = h.proxcontrol 
      ? new Date(h.proxcontrol + 'T00:00:00').toLocaleDateString('es-AR') 
      : '-';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${fechaFormateada}</strong></td>
      <td>${mascota ? mascota.nombreMascota : 'Paciente no encontrado'}</td>
      <td>${vet ? vet.nombre : 'Sin profesional'}</td>
      <td>${h.peso ? h.peso + ' kg' : '-'}</td>
      <td>${h.temp ? h.temp + ' °C' : '-'}</td>
      <td>${proxControl}</td>
      <td class="small text-muted">${h.observaciones || ''}</td>
    `;
    tbody.appendChild(tr);
  });
}

function abrirModalHistoria() {
  const form = document.getElementById('form-historia');
  if (form) form.reset();

  const mascotas = getStorage(KEY_MASCOTAS);
  const vets = getStorage(KEY_VETERINARIOS);

  const selectMascota = document.getElementById('hist-mascota');
  const selectVet = document.getElementById('hist-vet');

  if (selectMascota) {
    selectMascota.innerHTML = '<option value="">Seleccionar paciente...</option>' +
      mascotas.map(m => `<option value="${m.idMascota}">${m.nombreMascota} (${m.nombreDuenio})</option>`).join('');
  }

  if (selectVet) {
    selectVet.innerHTML = '<option value="">Seleccionar veterinario...</option>' +
      vets.map(v => `<option value="${v.idVeterinario}">${v.nombre}</option>`).join('');
  }

  if (modalHistoria) modalHistoria.show();
}

function guardarHistoria() {
  const historias = getStorage(KEY_HISTORIAS);

  const nuevaFicha = {
    idHistoriaClinica: String(Date.now()),
    fechaHora: document.getElementById('hist-fechahora').value,
    mascota: document.getElementById('hist-mascota').value,
    veterinario: document.getElementById('hist-vet').value,
    peso: parseFloat(document.getElementById('hist-peso').value),
    temp: parseFloat(document.getElementById('hist-temp').value),
    proxcontrol: document.getElementById('hist-proxcontrol').value,
    observaciones: document.getElementById('hist-obs').value.trim()
  };

  historias.push(nuevaFicha);
  setStorage(KEY_HISTORIAS, historias);

  if (modalHistoria) modalHistoria.hide();
  cargarFiltroMascotas();
  renderHistorias();
}