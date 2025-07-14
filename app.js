// ========================================
// APLICACIÓN WEB - GESTOR DE TAREAS PERSONALES
// ========================================
// Lógica principal para la interfaz gráfica

class GestorTareasWeb {
    constructor() {
        // Array para almacenar todas las tareas
        this.tareas = [];
        
        // Configurar fecha mínima para el input de fecha
        this.configurarFechaMinima();
        
        // Cargar tareas guardadas al iniciar
        this.cargarTareas();
        
        // Inicializar la aplicación
        this.inicializar();
    }

    // ========================================
    // INICIALIZACIÓN
    // ========================================

    /**
     * Inicializa todos los event listeners y componentes
     */
    inicializar() {
        this.configurarEventListeners();
        this.actualizarEstadisticas();
        this.mostrarTareas();
    }

    /**
     * Configura la fecha mínima para el input de fecha (hoy)
     */
    configurarFechaMinima() {
        const hoy = new Date().toISOString().split('T')[0];
        document.getElementById('fechaLimite').min = hoy;
    }

    /**
     * Configura todos los event listeners de la aplicación
     */
    configurarEventListeners() {
        // Formulario para agregar tarea
        document.getElementById('tarea-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.agregarTarea();
        });

        // Filtros
        document.getElementById('filtro-estado').addEventListener('change', () => {
            this.mostrarTareas();
        });

        document.getElementById('ordenar-por').addEventListener('change', () => {
            this.mostrarTareas();
        });

        // Botón de estadísticas
        document.getElementById('btn-estadisticas').addEventListener('click', () => {
            this.mostrarEstadisticasDetalladas();
        });

        // Modales
        this.configurarModales();
    }

    /**
     * Configura los modales de la aplicación
     */
    configurarModales() {
        // Modal de estadísticas
        const modalEstadisticas = document.getElementById('modal-estadisticas');
        const btnEstadisticas = document.getElementById('btn-estadisticas');
        const closeEstadisticas = modalEstadisticas.querySelector('.close');

        btnEstadisticas.onclick = () => modalEstadisticas.style.display = 'block';
        closeEstadisticas.onclick = () => modalEstadisticas.style.display = 'none';

        // Modal de confirmación
        const modalConfirmacion = document.getElementById('modal-confirmacion');
        const closeConfirmacion = modalConfirmacion.querySelector('.close');
        const btnCancelar = document.getElementById('btn-cancelar');

        closeConfirmacion.onclick = () => modalConfirmacion.style.display = 'none';
        btnCancelar.onclick = () => modalConfirmacion.style.display = 'none';

        // Cerrar modales al hacer clic fuera
        window.onclick = (event) => {
            if (event.target === modalEstadisticas) {
                modalEstadisticas.style.display = 'none';
            }
            if (event.target === modalConfirmacion) {
                modalConfirmacion.style.display = 'none';
            }
        };
    }

    // ========================================
    // GESTIÓN DE TAREAS
    // ========================================

    /**
     * Agrega una nueva tarea al sistema
     */
    agregarTarea() {
        const descripcion = document.getElementById('descripcion').value.trim();
        const fechaLimite = document.getElementById('fechaLimite').value;
        const prioridad = parseInt(document.getElementById('prioridad').value);

        // Validaciones
        if (!descripcion) {
            this.mostrarNotificacion('La descripción no puede estar vacía', 'error');
            return;
        }

        if (!fechaLimite) {
            this.mostrarNotificacion('Debes seleccionar una fecha límite', 'error');
            return;
        }

        if (!prioridad || ![1, 2, 3].includes(prioridad)) {
            this.mostrarNotificacion('Debes seleccionar una prioridad válida', 'error');
            return;
        }

        // Crear nueva tarea
        const nuevaTarea = {
            id: Date.now(),
            descripcion: descripcion,
            fechaLimite: new Date(fechaLimite),
            prioridad: prioridad,
            completada: false,
            fechaCreacion: new Date()
        };

        // Agregar tarea al array
        this.tareas.push(nuevaTarea);

        // Guardar y actualizar
        this.guardarTareas();
        this.actualizarEstadisticas();
        this.mostrarTareas();

        // Limpiar formulario
        document.getElementById('tarea-form').reset();
        this.configurarFechaMinima();

        // Mostrar notificación de éxito
        this.mostrarNotificacion('Tarea agregada exitosamente', 'exito');
    }

    /**
     * Marca una tarea como completada
     */
    marcarCompletada(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (!tarea) return;

        tarea.completada = true;
        tarea.fechaCompletado = new Date();

        this.guardarTareas();
        this.actualizarEstadisticas();
        this.mostrarTareas();

        this.mostrarNotificacion('Tarea marcada como completada', 'exito');
    }

    /**
     * Elimina una tarea del sistema
     */
    eliminarTarea(id) {
        this.mostrarConfirmacion(
            '¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.',
            () => {
                const indice = this.tareas.findIndex(t => t.id === id);
                if (indice !== -1) {
                    this.tareas.splice(indice, 1);
                    this.guardarTareas();
                    this.actualizarEstadisticas();
                    this.mostrarTareas();
                    this.mostrarNotificacion('Tarea eliminada exitosamente', 'exito');
                }
            }
        );
    }

    // ========================================
    // VISUALIZACIÓN
    // ========================================

    /**
     * Muestra todas las tareas en la interfaz
     */
    mostrarTareas() {
        const tareasLista = document.getElementById('tareas-lista');
        const filtroEstado = document.getElementById('filtro-estado').value;
        const ordenarPor = document.getElementById('ordenar-por').value;

        // Filtrar tareas
        let tareasFiltradas = [...this.tareas];
        
        if (filtroEstado === 'pendientes') {
            tareasFiltradas = tareasFiltradas.filter(tarea => !tarea.completada);
        } else if (filtroEstado === 'completadas') {
            tareasFiltradas = tareasFiltradas.filter(tarea => tarea.completada);
        }

        // Ordenar tareas
        tareasFiltradas.sort((a, b) => {
            switch (ordenarPor) {
                case 'fecha':
                    return a.fechaLimite - b.fechaLimite;
                case 'prioridad':
                    return a.prioridad - b.prioridad;
                case 'creacion':
                    return a.fechaCreacion - b.fechaCreacion;
                default:
                    return 0;
            }
        });

        // Mostrar tareas o mensaje vacío
        if (tareasFiltradas.length === 0) {
            tareasLista.innerHTML = `
                <div class="tareas-vacias">
                    <i class="fas fa-inbox"></i>
                    <h3>No hay tareas para mostrar</h3>
                    <p>Agrega una nueva tarea para comenzar</p>
                </div>
            `;
            return;
        }

        // Generar HTML de las tareas
        tareasLista.innerHTML = tareasFiltradas.map(tarea => this.generarHTMLTarea(tarea)).join('');
    }

    /**
     * Genera el HTML para una tarea individual
     */
    generarHTMLTarea(tarea) {
        const diasRestantes = this.calcularDiasRestantes(tarea.fechaLimite);
        const estado = this.obtenerEstadoTarea(diasRestantes);
        const claseCompletada = tarea.completada ? 'completada' : '';
        const textoPrioridad = this.obtenerTextoPrioridad(tarea.prioridad);
        const clasePrioridad = `prioridad-${textoPrioridad.toLowerCase()}`;

        return `
            <div class="tarea-item ${claseCompletada}" data-id="${tarea.id}">
                <div class="tarea-header">
                    <div class="tarea-titulo">${tarea.descripcion}</div>
                    <div class="tarea-prioridad ${clasePrioridad}">${textoPrioridad}</div>
                </div>
                
                <div class="tarea-info">
                    <div class="tarea-info-item">
                        <span class="tarea-info-label">Fecha límite</span>
                        <span class="tarea-info-value">${this.formatearFecha(tarea.fechaLimite)}</span>
                    </div>
                    <div class="tarea-info-item">
                        <span class="tarea-info-label">Estado</span>
                        <span class="tarea-estado estado-${estado.toLowerCase().replace(' ', '-')}">${estado}</span>
                    </div>
                    <div class="tarea-info-item">
                        <span class="tarea-info-label">Días restantes</span>
                        <span class="tarea-info-value">${diasRestantes} días</span>
                    </div>
                    ${tarea.completada ? `
                        <div class="tarea-info-item">
                            <span class="tarea-info-label">Completada el</span>
                            <span class="tarea-info-value">${this.formatearFecha(tarea.fechaCompletado)}</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="tarea-acciones">
                    ${!tarea.completada ? `
                        <button class="btn btn-success" onclick="gestor.marcarCompletada(${tarea.id})">
                            <i class="fas fa-check"></i> Completar
                        </button>
                    ` : ''}
                    <button class="btn btn-danger" onclick="gestor.eliminarTarea(${tarea.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Actualiza las estadísticas en el panel superior
     */
    actualizarEstadisticas() {
        const totalTareas = this.tareas.length;
        const tareasCompletadas = this.tareas.filter(tarea => tarea.completada).length;
        const tareasPendientes = totalTareas - tareasCompletadas;
        const progreso = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;

        document.getElementById('total-tareas').textContent = totalTareas;
        document.getElementById('tareas-completadas').textContent = tareasCompletadas;
        document.getElementById('tareas-pendientes').textContent = tareasPendientes;
        document.getElementById('progreso').textContent = progreso + '%';
    }

    /**
     * Muestra estadísticas detalladas en el modal
     */
    mostrarEstadisticasDetalladas() {
        const totalTareas = this.tareas.length;
        const tareasCompletadas = this.tareas.filter(tarea => tarea.completada).length;
        const tareasPendientes = totalTareas - tareasCompletadas;
        const tareasVencidas = this.tareas.filter(tarea => 
            !tarea.completada && this.calcularDiasRestantes(tarea.fechaLimite) < 0
        ).length;

        // Estadísticas por prioridad
        const prioridades = {
            alta: this.tareas.filter(t => !t.completada && t.prioridad === 1).length,
            media: this.tareas.filter(t => !t.completada && t.prioridad === 2).length,
            baja: this.tareas.filter(t => !t.completada && t.prioridad === 3).length
        };

        const estadisticasHTML = `
            <div class="estadisticas-grid">
                <div class="estadistica-item">
                    <h4>📊 Resumen General</h4>
                    <ul>
                        <li><strong>Total de tareas:</strong> ${totalTareas}</li>
                        <li><strong>Tareas completadas:</strong> ${tareasCompletadas}</li>
                        <li><strong>Tareas pendientes:</strong> ${tareasPendientes}</li>
                        <li><strong>Tareas vencidas:</strong> ${tareasVencidas}</li>
                    </ul>
                </div>
                
                <div class="estadistica-item">
                    <h4>🎯 Distribución por Prioridad</h4>
                    <ul>
                        <li><strong>Alta:</strong> ${prioridades.alta} tareas</li>
                        <li><strong>Media:</strong> ${prioridades.media} tareas</li>
                        <li><strong>Baja:</strong> ${prioridades.baja} tareas</li>
                    </ul>
                </div>
                
                <div class="estadistica-item">
                    <h4>📈 Progreso</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0}%"></div>
                    </div>
                    <p><strong>${totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0}%</strong> completado</p>
                </div>
            </div>
        `;

        document.getElementById('estadisticas-detalladas').innerHTML = estadisticasHTML;
    }

    // ========================================
    // MÉTODOS AUXILIARES
    // ========================================

    /**
     * Calcula días restantes hasta la fecha límite
     */
    calcularDiasRestantes(fechaLimite) {
        const hoy = new Date();
        const diferencia = fechaLimite - hoy;
        return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    }

    /**
     * Obtiene texto descriptivo de la prioridad
     */
    obtenerTextoPrioridad(prioridad) {
        switch (prioridad) {
            case 1: return 'Alta';
            case 2: return 'Media';
            case 3: return 'Baja';
            default: return 'Desconocida';
        }
    }

    /**
     * Obtiene estado de la tarea basado en días restantes
     */
    obtenerEstadoTarea(diasRestantes) {
        if (diasRestantes < 0) return 'Vencida';
        if (diasRestantes === 0) return 'Vence hoy';
        if (diasRestantes <= 3) return 'Urgente';
        if (diasRestantes <= 7) return 'Próxima';
        return 'Normal';
    }

    /**
     * Formatea fecha para mostrar
     */
    formatearFecha(fecha) {
        return fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    /**
     * Muestra una notificación
     */
    mostrarNotificacion(mensaje, tipo = 'info') {
        const notificacion = document.getElementById('notificacion');
        notificacion.textContent = mensaje;
        notificacion.className = `notificacion ${tipo} mostrar`;

        setTimeout(() => {
            notificacion.classList.remove('mostrar');
        }, 3000);
    }

    /**
     * Muestra un modal de confirmación
     */
    mostrarConfirmacion(mensaje, callback) {
        document.getElementById('mensaje-confirmacion').textContent = mensaje;
        document.getElementById('modal-confirmacion').style.display = 'block';
        
        document.getElementById('btn-confirmar').onclick = () => {
            document.getElementById('modal-confirmacion').style.display = 'none';
            callback();
        };
    }

    // ========================================
    // PERSISTENCIA DE DATOS
    // ========================================

    /**
     * Guarda las tareas en localStorage
     */
    guardarTareas() {
        try {
            localStorage.setItem('tareas', JSON.stringify(this.tareas));
        } catch (error) {
            console.error('Error al guardar tareas:', error);
            this.mostrarNotificacion('Error al guardar los datos', 'error');
        }
    }

    /**
     * Carga las tareas desde localStorage
     */
    cargarTareas() {
        try {
            const tareasGuardadas = localStorage.getItem('tareas');
            if (tareasGuardadas) {
                this.tareas = JSON.parse(tareasGuardadas).map(tarea => ({
                    ...tarea,
                    fechaLimite: new Date(tarea.fechaLimite),
                    fechaCreacion: new Date(tarea.fechaCreacion),
                    fechaCompletado: tarea.fechaCompletado ? new Date(tarea.fechaCompletado) : null
                }));
            }
        } catch (error) {
            console.error('Error al cargar tareas:', error);
            this.tareas = [];
        }
    }
}

// ========================================
// INICIO DE LA APLICACIÓN
// ========================================

// Crear instancia global para acceso desde HTML
let gestor;

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    gestor = new GestorTareasWeb();
});

// Agregar estilos adicionales para las estadísticas
const estilosAdicionales = `
    <style>
        .estadisticas-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        
        .estadistica-item {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4a90e2;
        }
        
        .estadistica-item h4 {
            margin-bottom: 15px;
            color: #343a40;
        }
        
        .estadistica-item ul {
            list-style: none;
            padding: 0;
        }
        
        .estadistica-item li {
            padding: 5px 0;
            border-bottom: 1px solid #dee2e6;
        }
        
        .estadistica-item li:last-child {
            border-bottom: none;
        }
        
        .progress-bar {
            width: 100%;
            height: 20px;
            background: #e9ecef;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #28a745, #20c997);
            transition: width 0.3s ease;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', estilosAdicionales); 