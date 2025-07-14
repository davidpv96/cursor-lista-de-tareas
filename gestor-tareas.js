// ========================================
// GESTOR DE TAREAS PERSONALES
// ========================================
// Aplicación de consola para gestionar tareas pendientes
// Autor: Asistente IA
// Fecha: 2024

// Importar módulo readline para entrada de datos desde consola
const readline = require('readline');

// ========================================
// CLASE PRINCIPAL - GESTOR DE TAREAS
// ========================================
class GestorTareas {
    constructor() {
        // Array para almacenar todas las tareas
        this.tareas = [];
        
        // Configurar interfaz de lectura para consola
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        // Cargar tareas guardadas al iniciar
        this.cargarTareas();
    }

    // ========================================
    // MÉTODOS PRINCIPALES
    // ========================================

    /**
     * Método principal que ejecuta el menú de la aplicación
     */
    async iniciar() {
        console.log('\n🎯 GESTOR DE TAREAS PERSONALES 🎯');
        console.log('=====================================');
        
        while (true) {
            this.mostrarMenu();
            const opcion = await this.obtenerEntrada('Selecciona una opción: ');
            
            switch (opcion) {
                case '1':
                    await this.agregarTarea();
                    break;
                case '2':
                    this.mostrarTareas();
                    break;
                case '3':
                    await this.marcarCompletada();
                    break;
                case '4':
                    await this.eliminarTarea();
                    break;
                case '5':
                    this.mostrarTareasPorPrioridad();
                    break;
                case '6':
                    this.mostrarTareasPorFecha();
                    break;
                case '7':
                    this.mostrarEstadisticas();
                    break;
                case '0':
                    console.log('\n👋 ¡Gracias por usar el Gestor de Tareas!');
                    this.rl.close();
                    return;
                default:
                    console.log('\n❌ Opción no válida. Intenta de nuevo.');
            }
            
            // Pausa para que el usuario vea los resultados
            await this.obtenerEntrada('\nPresiona Enter para continuar...');
        }
    }

    // ========================================
    // MÉTODOS DE GESTIÓN DE TAREAS
    // ========================================

    /**
     * Agrega una nueva tarea al sistema
     */
    async agregarTarea() {
        console.log('\n📝 AGREGAR NUEVA TAREA');
        console.log('======================');
        
        // Obtener descripción de la tarea
        const descripcion = await this.obtenerEntrada('Descripción de la tarea: ');
        
        if (!descripcion.trim()) {
            console.log('❌ La descripción no puede estar vacía.');
            return;
        }
        
        // Obtener fecha límite
        const fechaLimiteStr = await this.obtenerEntrada('Fecha límite (DD/MM/YYYY): ');
        const fechaLimite = this.parsearFecha(fechaLimiteStr);
        
        if (!fechaLimite) {
            console.log('❌ Formato de fecha inválido. Usa DD/MM/YYYY');
            return;
        }
        
        // Obtener prioridad
        const prioridadStr = await this.obtenerEntrada('Prioridad (1-Alta, 2-Mediana, 3-Baja): ');
        const prioridad = parseInt(prioridadStr);
        
        if (![1, 2, 3].includes(prioridad)) {
            console.log('❌ Prioridad inválida. Usando prioridad media por defecto.');
            prioridad = 2;
        }
        
        // Crear nueva tarea
        const nuevaTarea = {
            id: Date.now(), // ID único basado en timestamp
            descripcion: descripcion.trim(),
            fechaLimite: fechaLimite,
            prioridad: prioridad,
            completada: false,
            fechaCreacion: new Date()
        };
        
        // Agregar tarea al array
        this.tareas.push(nuevaTarea);
        
        // Guardar en almacenamiento
        this.guardarTareas();
        
        console.log('\n✅ Tarea agregada exitosamente!');
        console.log(`📋 ID: ${nuevaTarea.id}`);
        console.log(`📝 Descripción: ${nuevaTarea.descripcion}`);
        console.log(`📅 Fecha límite: ${this.formatearFecha(nuevaTarea.fechaLimite)}`);
        console.log(`🎯 Prioridad: ${this.obtenerTextoPrioridad(nuevaTarea.prioridad)}`);
    }

    /**
     * Muestra todas las tareas en formato de tabla
     */
    mostrarTareas() {
        console.log('\n📋 LISTA DE TAREAS');
        console.log('==================');
        
        if (this.tareas.length === 0) {
            console.log('📭 No hay tareas registradas.');
            return;
        }
        
        // Filtrar solo tareas pendientes
        const tareasPendientes = this.tareas.filter(tarea => !tarea.completada);
        
        if (tareasPendientes.length === 0) {
            console.log('🎉 ¡Todas las tareas están completadas!');
            return;
        }
        
        // Mostrar tabla de tareas
        console.log('┌─────┬─────────────────────────────────────┬──────────────┬──────────┬─────────────┐');
        console.log('│ ID  │ Descripción                        │ Fecha Límite │ Prioridad│ Estado      │');
        console.log('├─────┼─────────────────────────────────────┼──────────────┼──────────┼─────────────┤');
        
        tareasPendientes.forEach(tarea => {
            const diasRestantes = this.calcularDiasRestantes(tarea.fechaLimite);
            const estado = this.obtenerEstadoTarea(diasRestantes);
            
            console.log(`│ ${tarea.id.toString().padEnd(4)} │ ${tarea.descripcion.substring(0, 35).padEnd(35)} │ ${this.formatearFecha(tarea.fechaLimite).padEnd(12)} │ ${this.obtenerTextoPrioridad(tarea.prioridad).padEnd(8)} │ ${estado.padEnd(11)} │`);
        });
        
        console.log('└─────┴─────────────────────────────────────┴──────────────┴──────────┴─────────────┘');
    }

    /**
     * Marca una tarea como completada
     */
    async marcarCompletada() {
        console.log('\n✅ MARCAR TAREA COMO COMPLETADA');
        console.log('===============================');
        
        const tareasPendientes = this.tareas.filter(tarea => !tarea.completada);
        
        if (tareasPendientes.length === 0) {
            console.log('📭 No hay tareas pendientes para completar.');
            return;
        }
        
        // Mostrar tareas pendientes
        console.log('Tareas pendientes:');
        tareasPendientes.forEach(tarea => {
            console.log(`${tarea.id} - ${tarea.descripcion}`);
        });
        
        const idTarea = await this.obtenerEntrada('\nIngresa el ID de la tarea a completar: ');
        const tarea = this.tareas.find(t => t.id.toString() === idTarea);
        
        if (!tarea) {
            console.log('❌ Tarea no encontrada.');
            return;
        }
        
        if (tarea.completada) {
            console.log('❌ Esta tarea ya está completada.');
            return;
        }
        
        tarea.completada = true;
        tarea.fechaCompletado = new Date();
        
        this.guardarTareas();
        
        console.log(`\n🎉 ¡Tarea "${tarea.descripcion}" marcada como completada!`);
    }

    /**
     * Elimina una tarea del sistema
     */
    async eliminarTarea() {
        console.log('\n🗑️ ELIMINAR TAREA');
        console.log('================');
        
        if (this.tareas.length === 0) {
            console.log('📭 No hay tareas para eliminar.');
            return;
        }
        
        // Mostrar todas las tareas
        console.log('Todas las tareas:');
        this.tareas.forEach(tarea => {
            const estado = tarea.completada ? '✅ Completada' : '⏳ Pendiente';
            console.log(`${tarea.id} - ${tarea.descripcion} (${estado})`);
        });
        
        const idTarea = await this.obtenerEntrada('\nIngresa el ID de la tarea a eliminar: ');
        const indiceTarea = this.tareas.findIndex(t => t.id.toString() === idTarea);
        
        if (indiceTarea === -1) {
            console.log('❌ Tarea no encontrada.');
            return;
        }
        
        const tareaEliminada = this.tareas[indiceTarea];
        this.tareas.splice(indiceTarea, 1);
        
        this.guardarTareas();
        
        console.log(`\n🗑️ Tarea "${tareaEliminada.descripcion}" eliminada exitosamente.`);
    }

    // ========================================
    // MÉTODOS DE VISUALIZACIÓN
    // ========================================

    /**
     * Muestra las tareas organizadas por prioridad
     */
    mostrarTareasPorPrioridad() {
        console.log('\n🎯 TAREAS POR PRIORIDAD');
        console.log('=======================');
        
        const tareasPendientes = this.tareas.filter(tarea => !tarea.completada);
        
        if (tareasPendientes.length === 0) {
            console.log('📭 No hay tareas pendientes.');
            return;
        }
        
        // Ordenar por prioridad (1 = Alta, 2 = Media, 3 = Baja)
        const tareasOrdenadas = tareasPendientes.sort((a, b) => a.prioridad - b.prioridad);
        
        let prioridadActual = null;
        
        tareasOrdenadas.forEach(tarea => {
            if (tarea.prioridad !== prioridadActual) {
                prioridadActual = tarea.prioridad;
                console.log(`\n${this.obtenerTextoPrioridad(tarea.prioridad).toUpperCase()}:`);
                console.log('─'.repeat(this.obtenerTextoPrioridad(tarea.prioridad).length + 1));
            }
            
            const diasRestantes = this.calcularDiasRestantes(tarea.fechaLimite);
            console.log(`  • ${tarea.descripcion} (ID: ${tarea.id}) - Vence en ${diasRestantes} días`);
        });
    }

    /**
     * Muestra las tareas organizadas por fecha límite
     */
    mostrarTareasPorFecha() {
        console.log('\n📅 TAREAS POR FECHA LÍMITE');
        console.log('==========================');
        
        const tareasPendientes = this.tareas.filter(tarea => !tarea.completada);
        
        if (tareasPendientes.length === 0) {
            console.log('📭 No hay tareas pendientes.');
            return;
        }
        
        // Ordenar por fecha límite (más cercana primero)
        const tareasOrdenadas = tareasPendientes.sort((a, b) => a.fechaLimite - b.fechaLimite);
        
        console.log('Tareas ordenadas por fecha límite (más cercana primero):\n');
        
        tareasOrdenadas.forEach(tarea => {
            const diasRestantes = this.calcularDiasRestantes(tarea.fechaLimite);
            const estado = this.obtenerEstadoTarea(diasRestantes);
            
            console.log(`📅 ${this.formatearFecha(tarea.fechaLimite)} - ${estado}`);
            console.log(`   ${tarea.descripcion} (ID: ${tarea.id}, Prioridad: ${this.obtenerTextoPrioridad(tarea.prioridad)})`);
            console.log('');
        });
    }

    /**
     * Muestra estadísticas generales de las tareas
     */
    mostrarEstadisticas() {
        console.log('\n📊 ESTADÍSTICAS DE TAREAS');
        console.log('==========================');
        
        const totalTareas = this.tareas.length;
        const tareasCompletadas = this.tareas.filter(tarea => tarea.completada).length;
        const tareasPendientes = totalTareas - tareasCompletadas;
        
        console.log(`📋 Total de tareas: ${totalTareas}`);
        console.log(`✅ Tareas completadas: ${tareasCompletadas}`);
        console.log(`⏳ Tareas pendientes: ${tareasPendientes}`);
        
        if (totalTareas > 0) {
            const porcentajeCompletado = ((tareasCompletadas / totalTareas) * 100).toFixed(1);
            console.log(`📈 Progreso: ${porcentajeCompletado}%`);
        }
        
        // Estadísticas por prioridad
        if (tareasPendientes > 0) {
            console.log('\n🎯 Tareas pendientes por prioridad:');
            const prioridades = [1, 2, 3];
            prioridades.forEach(prioridad => {
                const cantidad = this.tareas.filter(tarea => !tarea.completada && tarea.prioridad === prioridad).length;
                console.log(`   ${this.obtenerTextoPrioridad(prioridad)}: ${cantidad}`);
            });
        }
        
        // Tareas vencidas
        const tareasVencidas = this.tareas.filter(tarea => 
            !tarea.completada && this.calcularDiasRestantes(tarea.fechaLimite) < 0
        );
        
        if (tareasVencidas.length > 0) {
            console.log(`\n⚠️ Tareas vencidas: ${tareasVencidas.length}`);
            tareasVencidas.forEach(tarea => {
                const diasVencida = Math.abs(this.calcularDiasRestantes(tarea.fechaLimite));
                console.log(`   • ${tarea.descripcion} (vencida hace ${diasVencida} días)`);
            });
        }
    }

    // ========================================
    // MÉTODOS AUXILIARES
    // ========================================

    /**
     * Muestra el menú principal de opciones
     */
    mostrarMenu() {
        console.log('\n' + '='.repeat(50));
        console.log('           MENÚ PRINCIPAL');
        console.log('='.repeat(50));
        console.log('1. 📝 Agregar nueva tarea');
        console.log('2. 📋 Mostrar tareas pendientes');
        console.log('3. ✅ Marcar tarea como completada');
        console.log('4. 🗑️ Eliminar tarea');
        console.log('5. 🎯 Ver tareas por prioridad');
        console.log('6. 📅 Ver tareas por fecha');
        console.log('7. 📊 Ver estadísticas');
        console.log('0. 🚪 Salir');
        console.log('='.repeat(50));
    }

    /**
     * Obtiene entrada del usuario de forma asíncrona
     */
    obtenerEntrada(pregunta) {
        return new Promise((resolve) => {
            this.rl.question(pregunta, (respuesta) => {
                resolve(respuesta);
            });
        });
    }

    /**
     * Convierte string de fecha a objeto Date
     */
    parsearFecha(fechaStr) {
        const partes = fechaStr.split('/');
        if (partes.length !== 3) return null;
        
        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1; // Meses van de 0-11
        const año = parseInt(partes[2]);
        
        const fecha = new Date(año, mes, dia);
        
        // Verificar que la fecha sea válida
        if (fecha.getDate() !== dia || fecha.getMonth() !== mes || fecha.getFullYear() !== año) {
            return null;
        }
        
        return fecha;
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

    // ========================================
    // PERSISTENCIA DE DATOS
    // ========================================

    /**
     * Guarda las tareas en localStorage (simulado para consola)
     */
    guardarTareas() {
        try {
            // En un entorno real, aquí guardarías en archivo o base de datos
            // Por ahora, solo mantenemos en memoria
            console.log('💾 Datos guardados en memoria');
        } catch (error) {
            console.log('❌ Error al guardar datos:', error.message);
        }
    }

    /**
     * Carga las tareas desde almacenamiento
     */
    cargarTareas() {
        try {
            // En un entorno real, aquí cargarías desde archivo o base de datos
            // Por ahora, empezamos con array vacío
            console.log('📂 Cargando datos...');
        } catch (error) {
            console.log('❌ Error al cargar datos:', error.message);
            this.tareas = [];
        }
    }
}

// ========================================
// INICIO DE LA APLICACIÓN
// ========================================

/**
 * Función principal que inicia la aplicación
 */
async function main() {
    try {
        const gestor = new GestorTareas();
        await gestor.iniciar();
    } catch (error) {
        console.error('❌ Error en la aplicación:', error.message);
        process.exit(1);
    }
}

// Ejecutar la aplicación
if (require.main === module) {
    main();
}

// Exportar la clase para uso en otros módulos
module.exports = GestorTareas; 