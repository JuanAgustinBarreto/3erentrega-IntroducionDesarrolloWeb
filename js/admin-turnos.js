let modalTurno = null;

document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('modalTurno');
  if (modalEl) modalTurno = new bootstrap.Modal(modalEl);

  renderTurnos();

  const form = document.getElementById('form-turno');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      guardarTurno();
    });
  }
});

function renderTurnos() {
  const tbody = document.getElementById('tabla-turnos');
  if (!tbody) return;

  const turnos = getStorage(KEY_TURNOS);
  const mascotas = getStorage(KEY_MASCOTAS);
  const vets = getStorage(KEY_VETERINARIOS);

  tbody.innerHTML = '';

  if (turnos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">No hay turnos agendados.</td></tr>`;
    return;
  }

  turnos.forEach(t => {
    const mascota = mascotas.find(m => String(m.idMascota) === String(t.mascota));
    const vet = vets.find(v => String(v.idVeterinario) === String(t.veterinario));

    const fechaFormateada = t.fechaHora 
      ? new Date(t.fechaHora).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      : 'Sin fecha';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${fechaFormateada}</strong></td>
      <td>${mascota ? mascota.nombreMascota : 'Mascota no encontrada'}</td>
      <td>${vet ? vet.nombre : 'Veterinario no asignado'}</td>
      <td>$${vet && vet.valorConsulta ? Number(vet.valorConsulta).toLocaleString('es-AR') : '-'}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-danger" onclick="cancelarTurno('${t.idTurno}')">❌ Cancelar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function abrirModalTurno() {
  const form = document.getElementById('form-turno');
  form.reset();

  const mascotas = getStorage(KEY_MASCOTAS);
  const vets = getStorage(KEY_VETERINARIOS);

  const selectMascota = document.getElementById('turno-mascota');
  const selectVet = document.getElementById('turno-vet');

  selectMascota.innerHTML = '<option value="">Seleccionar mascota...</option>' +
    mascotas.map(m => `<option value="${m.idMascota}">${m.nombreMascota} (${m.nombreDuenio})</option>`).join('');

  selectVet.innerHTML = '<option value="">Seleccionar veterinario...</option>' +
    vets.map(v => `<option value="${v.idVeterinario}">${v.nombre} - ${v.especializacion}</option>`).join('');

  if (modalTurno) modalTurno.show();
}

function guardarTurno() {
  const turnos = getStorage(KEY_TURNOS);

  const nuevoTurno = {
    idTurno: String(Date.now()),
    fechaHora: document.getElementById('turno-fechahora').value,
    mascota: document.getElementById('turno-mascota').value,
    veterinario: document.getElementById('turno-vet').value
  };

  turnos.push(nuevoTurno);
  setStorage(KEY_TURNOS, turnos);

  if (modalTurno) modalTurno.hide();
  renderTurnos();
}

function cancelarTurno(id) {
  if (confirm('¿Estás seguro de que querés cancelar este turno?')) {
    let turnos = getStorage(KEY_TURNOS);
    turnos = turnos.filter(t => String(t.idTurno) !== String(id));
    setStorage(KEY_TURNOS, turnos);
    renderTurnos();
  }
}