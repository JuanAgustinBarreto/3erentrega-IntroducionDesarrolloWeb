# Veterinaria Laika

**Trabajo Final Integrador**  
- **Asignatura:** Introducción al Desarrollo Web  
- **Carrera:** Tecnicatura Universitaria en Desarrollo Web  
- **Institución:** Facultad de Ciencias de la Administración – UNER  
- **Año:** 2026 – 2do cuatrimestre  

## GRUPO 18
## Integrantes
- Barreto, Juan Agustín
- Romiti, Juan Bautista
- Di Braida, Facundo
- Sánchez Zapata, Matías

## Descripción del proyecto
**Veterinaria Laika** es una aplicación web integral desarrollada para una clínica veterinaria con el objetivo de facilitar la gestión administrativa de la atención de pacientes y brindar información institucional y de contacto a sus clientes.

El proyecto fue desarrollado de forma progresiva a lo largo de las tres etapas del Trabajo Final Integrador, incorporando la maquetación HTML/CSS, el diseño responsivo con Bootstrap 5 y la interactividad con JavaScript y LocalStorage.


## Evolución de entregas

### 1ª Entrega — Estructura y Maquetación Inicial
- Construcción de la estructura de páginas web mediante **HTML5** y **CSS3**.
- Definición de la paleta de colores oficial, tipografía y maquetación inicial del sitio público y la zona de administración.

### 2ª Entrega — Diseño Responsivo (RWD) y Bootstrap 5
- Adaptación completa de las vistas a dispositivos móviles, tablets y computadoras utilizando **Bootstrap 5.3**.
- Menú de navegación responsivo colapsable (menú hamburguesa).
- Normalización del diseño, componentes y grillas.

### 3ª Entrega — Panel de Administración (ABML / DOM / LocalStorage)
- **Operaciones BREAD / ABML completas:**
  - **Gestión de Mascotas:** Alta, baja, modificación y listado. Incluye carga de imágenes en Base64, contador dinámico de registros totales y buscador en tiempo real.
  - **Gestión de Veterinarios:** Alta, baja, modificación y listado. Selector de especialidades predefinidas y formato de moneda local (`$`) para los valores de consulta.
  - **Control de Turnos:** Agendamiento de citas vinculando mascotas y profesionales activos.
  - **Historia Clínica:** Registro de atenciones médicas y controles con filtro dinámico por paciente.
- **Manipulación del DOM y Eventos:** Renderizado dinámico de tablas, actualización en tiempo real y captura/validación de formularios HTML5.
- **Persistencia en LocalStorage:** Almacenamiento continuo sin pérdida de datos en claves independientes (`laika_mascotas`, `laika_veterinarios`, `laika_turnos`, `laika_historias`).
- **Generación Automática de ID:** Asignación automática de identificadores únicos por registro (`Date.now()`).
- **Modo Oscuro Global:** Alternancia de tema (Claro / Oscuro) con persistencia en `LocalStorage` aprovechando `data-bs-theme` de Bootstrap 5.
- **Modales e Interfaz:** Modales interactivos de Bootstrap 5 para los formularios de alta/edición y diálogos de confirmación previa para eliminación.

## Estructura del proyecto
TPINTRODUCCIONWEB/
├── admin/                      # Vistas del Panel de Administración
│   ├── dashboard.html          # Métricas y accesos rápidos
│   ├── mascotas.html           # ABM Mascotas + Buscador + Base64
│   ├── veterinarios.html       # ABM Veterinarios + Especialidades
│   ├── turnos.html             # Agendamiento de turnos
│   └── historias.html          # Ficha médica de pacientes
├── assets/                     # Imágenes y recursos estáticos
├── css/
│   ├── base.css                # Estilos globales y variables de tema
│   └── admin.css               # Estilos del panel de administración
├── js/
│   ├── storage.js              # Helpers y estado inicial de LocalStorage
│   ├── main.js                 # Lógica global del Modo Oscuro
│   ├── admin-mascotas.js       # Lógica BREAD Mascotas + Filtros
│   ├── admin-vets.js           # Lógica BREAD Veterinarios
│   ├── admin-turnos.js         # Lógica de Turnos
│   └── admin-historias.js      # Lógica de Historias Clínicas
├── contacto.html               # Página de contacto pública
├── index.html                  # Portada principal
├── institucional.html          # Información institucional
├── package.json
└── README.md


Tecnologías utilizadas
HTML5 (Semántica y formularios)

CSS3 (Variables CSS, Flexbox, Grillas y Media Queries)

JavaScript (ES6+) (Manipulación del DOM, eventos, manipulación de Arrays y FileReader API)

Bootstrap 5.3 (Grid System, Modals, Navbar responsivo, Componentes y Tema Oscuro nativo)

Web Storage API (LocalStorage) (Persistencia de datos en el cliente)

Vite (Entorno de desarrollo local)



## Instalación y ejecución
Para ejecutar el proyecto localmente es necesario tener instalado Node.js.

## Clonar el repositorio:
git clone URL_DEL_REPOSITORIO

## Ingresar a la carpeta del proyecto:
cd veterinaria-la-mary

## Instalar las dependencias:
npm install

## Iniciar el servidor de desarrollo de Vite:
npx vite

## Luego abrir en el navegador la dirección indicada por Vite, normalmente:
http://localhost:5173/


## Navegación
- Sitio Público: Permite navegar fluidamente entre Inicio, Institucional y Contacto, además de incluir el botón ⚙️ Admin en la barra superior para ingresar al panel.

- Panel Administrativo: Permite cambiar entre los distintos módulos (Dashboard, Mascotas, Veterinarios, Turnos e Historia Clínica) e incluye el botón 🌐 Ver Sitio Web para regresar a la página pública.