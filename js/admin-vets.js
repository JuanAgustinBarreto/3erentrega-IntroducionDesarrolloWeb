let modalVet = null;

document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('modalVet');
  if (modalEl) modalVet = new bootstrap.Modal(modalEl);

  renderVets();

  const form = document.getElementById('form-vet');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      guardarVet();
    });
  }
});

function renderVets() {
  const tbody = document.getElementById('tabla-vets');
  if (!tbody) return;

  const vets = getStorage(KEY_VETERINARIOS);
  tbody.innerHTML = '';

  if (vets.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">No hay veterinarios registrados.</td></tr>`;
    return;
  }

  vets.forEach(v => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${v.matricula}</strong></td>
      <td>${v.nombre}</td>
      <td><span class="badge-especialidad">${v.especializacion}</span></td>
      <td>$${Number(v.valorConsulta).toLocaleString('es-AR')}</td>
      <td class="text-end">
        <div class="acciones-contenedor">
          <button class="btn btn-sm btn-outline-warning" onclick="editarVet('${v.idVeterinario}')">✏️ Editar</button>
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarVet('${v.idVeterinario}')">🗑️ Borrar</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function abrirModalNuevoVet() {
  const form = document.getElementById('form-vet');
  if (form) form.reset();

  document.getElementById('vet-id').value = '';
  document.getElementById('tituloModalVet').textContent = 'Registrar Veterinario';

  if (modalVet) modalVet.show();
}

function guardarVet() {
  const idStr = document.getElementById('vet-id').value;
  const vets = getStorage(KEY_VETERINARIOS);

  const nuevoVet = {
    idVeterinario: idStr ? idStr : String(Date.now()),
    matricula: parseInt(document.getElementById('vet-matricula').value, 10),
    nombre: document.getElementById('vet-nombre').value.trim(),
    especializacion: document.getElementById('vet-especialidad').value.trim(),
    valorConsulta: parseFloat(document.getElementById('vet-valor').value)
  };

  if (idStr) {
    const idx = vets.findIndex(v => String(v.idVeterinario) === String(idStr));
    if (idx !== -1) vets[idx] = nuevoVet;
  } else {
    vets.push(nuevoVet);
  }

  setStorage(KEY_VETERINARIOS, vets);
  if (modalVet) modalVet.hide();
  renderVets();
}

function editarVet(id) {
  const vets = getStorage(KEY_VETERINARIOS);
  const v = vets.find(item => String(item.idVeterinario) === String(id));
  if (!v) return;

  document.getElementById('vet-id').value = v.idVeterinario;
  document.getElementById('vet-matricula').value = v.matricula;
  document.getElementById('vet-nombre').value = v.nombre;
  document.getElementById('vet-especialidad').value = v.especializacion;
  document.getElementById('vet-valor').value = v.valorConsulta;
  document.getElementById('tituloModalVet').textContent = 'Editar Veterinario';

  if (modalVet) modalVet.show();
}

function eliminarVet(id) {
  if (confirm('¿Estás seguro de que querés eliminar a este profesional?')) {
    let vets = getStorage(KEY_VETERINARIOS);
    vets = vets.filter(v => String(v.idVeterinario) !== String(id));
    setStorage(KEY_VETERINARIOS, vets);
    renderVets();
  }
}