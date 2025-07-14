// ========================================
// EJEMPLO DE USO - GESTOR DE TAREAS
// ========================================
// Este archivo muestra cómo usar la aplicación con datos de ejemplo

const GestorTareas = require('./gestor-tareas.js');

// Función para crear datos de ejemplo
function crearDatosEjemplo() {
    const gestor = new GestorTareas();
    
    // Agregar algunas tareas de ejemplo
    const tareasEjemplo = [
        {
            descripcion: "Completar proyecto de JavaScript",
            fechaLimite: new Date(2024, 11, 25), // 25/12/2024
            prioridad: 1
        },
        {
            descripcion: "Hacer compras del supermercado",
            fechaLimite: new Date(2024, 11, 20), // 20/12/2024
            prioridad: 2
        },
        {
            descripcion: "Llamar al dentista para cita",
            fechaLimite: new Date(2024, 11, 18), // 18/12/2024
            prioridad: 3
        },
        {
            descripcion: "Revisar correos electrónicos",
            fechaLimite: new Date(2024, 11, 15), // 15/12/2024
            prioridad: 2
        },
        {
            descripcion: "Preparar presentación para el trabajo",
            fechaLimite: new Date(2024, 11, 22), // 22/12/2024
            prioridad: 1
        }
    ];
    
    // Agregar tareas al gestor
    tareasEjemplo.forEach(tarea => {
        const nuevaTarea = {
            id: Date.now() + Math.random(), // ID único
            descripcion: tarea.descripcion,
            fechaLimite: tarea.fechaLimite,
            prioridad: tarea.prioridad,
            completada: false,
            fechaCreacion: new Date()
        };
        
        gestor.tareas.push(nuevaTarea);
    });
    
    return gestor;
}

// Función para demostrar las funcionalidades
async function demostrarFuncionalidades() {
    console.log('🎯 DEMOSTRACIÓN DEL GESTOR DE TAREAS');
    console.log('=====================================');
    
    const gestor = crearDatosEjemplo();
    
    // Mostrar tareas iniciales
    console.log('\n📋 TAREAS INICIALES:');
    gestor.mostrarTareas();
    
    // Mostrar por prioridad
    console.log('\n🎯 ORGANIZACIÓN POR PRIORIDAD:');
    gestor.mostrarTareasPorPrioridad();
    
    // Mostrar por fecha
    console.log('\n📅 ORGANIZACIÓN POR FECHA:');
    gestor.mostrarTareasPorFecha();
    
    // Mostrar estadísticas
    console.log('\n📊 ESTADÍSTICAS:');
    gestor.mostrarEstadisticas();
    
    // Marcar una tarea como completada
    console.log('\n✅ MARCANDO TAREA COMO COMPLETADA:');
    if (gestor.tareas.length > 0) {
        const primeraTarea = gestor.tareas[0];
        primeraTarea.completada = true;
        primeraTarea.fechaCompletado = new Date();
        console.log(`Tarea "${primeraTarea.descripcion}" marcada como completada.`);
    }
    
    // Mostrar estadísticas actualizadas
    console.log('\n📊 ESTADÍSTICAS ACTUALIZADAS:');
    gestor.mostrarEstadisticas();
    
    console.log('\n✨ Demostración completada. ¡Ahora puedes ejecutar la aplicación real!');
    console.log('Para usar la aplicación: node gestor-tareas.js');
}

// Ejecutar demostración si se ejecuta este archivo directamente
if (require.main === module) {
    demostrarFuncionalidades();
}

module.exports = { crearDatosEjemplo, demostrarFuncionalidades }; 