# 🎯 Gestor de Tareas Personales

Una aplicación de consola desarrollada en JavaScript puro para gestionar tareas personales de forma sencilla e interactiva.

## 📋 Características

- ✅ **Agregar tareas** con descripción, fecha límite y prioridad
- 📋 **Ver lista de tareas** organizadas y con estado visual
- ✅ **Marcar tareas como completadas**
- 🗑️ **Eliminar tareas** no necesarias
- 🎯 **Organizar por prioridad** (Alta, Media, Baja)
- 📅 **Organizar por fecha límite** (más cercana primero)
- 📊 **Estadísticas** de progreso y tareas vencidas
- 💾 **Persistencia de datos** (en memoria durante la sesión)

## 🚀 Cómo usar

### Requisitos

- Node.js instalado en tu sistema
- Terminal o línea de comandos

### Instalación y ejecución

1. **Descarga el archivo:**

   ```bash
   # El archivo gestor-tareas.js debe estar en tu directorio
   ```

2. **Ejecuta la aplicación:**

   ```bash
   node gestor-tareas.js
   ```

3. **¡Listo!** La aplicación se iniciará y mostrará el menú principal.

## 📖 Guía de uso

### Menú Principal

```
==================================================
           MENÚ PRINCIPAL
==================================================
1. 📝 Agregar nueva tarea
2. 📋 Mostrar tareas pendientes
3. ✅ Marcar tarea como completada
4. 🗑️ Eliminar tarea
5. 🎯 Ver tareas por prioridad
6. 📅 Ver tareas por fecha
7. 📊 Ver estadísticas
0. 🚪 Salir
==================================================
```

### 1. Agregar Nueva Tarea

- **Descripción:** Texto descriptivo de la tarea
- **Fecha límite:** Formato DD/MM/YYYY (ej: 25/12/2024)
- **Prioridad:**
  - 1 = Alta (más importante)
  - 2 = Media (importancia normal)
  - 3 = Baja (menos urgente)

### 2. Ver Tareas Pendientes

Muestra una tabla con:

- ID único de la tarea
- Descripción
- Fecha límite
- Prioridad
- Estado (Normal, Próxima, Urgente, Vence hoy, Vencida)

### 3. Marcar como Completada

- Selecciona el ID de la tarea a completar
- La tarea se marcará como completada y se registrará la fecha

### 4. Eliminar Tarea

- Selecciona el ID de la tarea a eliminar
- La tarea se eliminará permanentemente del sistema

### 5. Ver por Prioridad

Organiza las tareas por nivel de prioridad:

- **Alta:** Tareas más importantes
- **Media:** Tareas de importancia normal
- **Baja:** Tareas menos urgentes

### 6. Ver por Fecha

Organiza las tareas por fecha límite:

- Las más cercanas aparecen primero
- Muestra días restantes para cada tarea

### 7. Estadísticas

Muestra información general:

- Total de tareas
- Tareas completadas vs pendientes
- Progreso en porcentaje
- Distribución por prioridad
- Tareas vencidas

## 🎨 Estados de las Tareas

- **Normal:** Más de 7 días restantes
- **Próxima:** Entre 4-7 días restantes
- **Urgente:** Entre 1-3 días restantes
- **Vence hoy:** 0 días restantes
- **Vencida:** Fecha límite pasada

## 💡 Consejos de uso

1. **Usa prioridades sabiamente:**

   - Alta: Tareas críticas que no pueden esperar
   - Media: Tareas importantes pero no urgentes
   - Baja: Tareas que pueden esperar

2. **Revisa regularmente:**

   - Usa la opción 6 para ver tareas por fecha
   - Revisa las estadísticas semanalmente
   - Marca tareas completadas para mantener el progreso

3. **Mantén descripciones claras:**
   - Sé específico en la descripción
   - Incluye detalles importantes
   - Usa un lenguaje claro y directo

## 🔧 Estructura del código

La aplicación está organizada en una clase principal `GestorTareas` con los siguientes componentes:

### Métodos Principales

- `iniciar()`: Ejecuta el menú principal
- `agregarTarea()`: Crea nuevas tareas
- `mostrarTareas()`: Visualiza tareas pendientes
- `marcarCompletada()`: Cambia estado de tarea
- `eliminarTarea()`: Elimina tareas del sistema

### Métodos de Visualización

- `mostrarTareasPorPrioridad()`: Organiza por prioridad
- `mostrarTareasPorFecha()`: Organiza por fecha
- `mostrarEstadisticas()`: Muestra estadísticas

### Métodos Auxiliares

- `parsearFecha()`: Convierte string a fecha
- `calcularDiasRestantes()`: Calcula días hasta límite
- `obtenerEstadoTarea()`: Determina estado visual

## 🐛 Solución de problemas

### Error: "Formato de fecha inválido"

- Asegúrate de usar el formato DD/MM/YYYY
- Ejemplo correcto: 25/12/2024

### Error: "Tarea no encontrada"

- Verifica el ID de la tarea
- Usa la opción 2 para ver todos los IDs disponibles

### Error: "Prioridad inválida"

- Solo usa números: 1, 2, o 3
- Si ingresas otro valor, se usará prioridad media por defecto

## 📝 Notas técnicas

- **Almacenamiento:** Los datos se mantienen en memoria durante la sesión
- **IDs únicos:** Cada tarea tiene un ID basado en timestamp
- **Validación:** Se validan fechas, prioridades y entradas del usuario
- **Interfaz:** Usa readline para entrada interactiva desde consola

## 🤝 Contribuir

Si quieres mejorar la aplicación, puedes:

- Agregar persistencia en archivo
- Implementar categorías de tareas
- Agregar recordatorios
- Mejorar la interfaz visual

---

¡Disfruta organizando tus tareas! 🎯✨
