# 🎯 Gestor de Tareas Personales - Versión Web

Una aplicación web moderna y responsive para gestionar tareas personales con una interfaz gráfica intuitiva y atractiva.

## 🌟 Características de la Versión Web

### ✨ Interfaz Moderna

- **Diseño responsive** que se adapta a cualquier dispositivo
- **Interfaz intuitiva** con iconos y colores atractivos
- **Animaciones suaves** para una mejor experiencia de usuario
- **Tema moderno** con gradientes y sombras elegantes

### 📊 Panel de Estadísticas en Tiempo Real

- **Contador de tareas** totales, completadas y pendientes
- **Barra de progreso** visual del avance
- **Estadísticas detalladas** en modal expandible
- **Actualización automática** al realizar cambios

### 🎯 Gestión Completa de Tareas

- ✅ **Agregar tareas** con formulario intuitivo
- 📋 **Ver lista** con filtros y ordenamiento
- ✅ **Marcar como completadas** con un clic
- 🗑️ **Eliminar tareas** con confirmación
- 🎯 **Organizar por prioridad** (Alta, Media, Baja)
- 📅 **Organizar por fecha** límite
- 🔍 **Filtrar por estado** (Todas, Pendientes, Completadas)

### 💾 Persistencia de Datos

- **Almacenamiento local** en el navegador
- **Datos persistentes** entre sesiones
- **Sincronización automática** de cambios

## 🚀 Cómo usar la aplicación web

### Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere instalación de software adicional

### Instalación y ejecución

1. **Descarga los archivos:**

   ```
   index.html
   styles.css
   app.js
   ```

2. **Abre el archivo HTML:**

   - Haz doble clic en `index.html`
   - O arrastra el archivo a tu navegador
   - O abre desde tu editor de código

3. **¡Listo!** La aplicación se cargará automáticamente

## 📖 Guía de uso de la interfaz web

### 1. Panel de Estadísticas

En la parte superior verás cuatro tarjetas con:

- **📋 Total:** Número total de tareas
- **✅ Completadas:** Tareas finalizadas
- **⏳ Pendientes:** Tareas por hacer
- **📈 Progreso:** Porcentaje de avance

### 2. Agregar Nueva Tarea

1. **Descripción:** Escribe qué necesitas hacer
2. **Fecha límite:** Selecciona la fecha en el calendario
3. **Prioridad:** Elige entre Alta, Media o Baja
4. **Clic en "Agregar Tarea"**

### 3. Gestionar Tareas Existentes

Cada tarea muestra:

- **Título y descripción**
- **Fecha límite**
- **Prioridad** (con colores)
- **Estado** (Normal, Próxima, Urgente, Vence hoy, Vencida)
- **Días restantes**
- **Botones de acción**

### 4. Filtros y Ordenamiento

- **Filtrar por estado:** Ver todas, solo pendientes o solo completadas
- **Ordenar por:** Fecha límite, prioridad o fecha de creación

### 5. Estadísticas Detalladas

Clic en "Ver Estadísticas" para ver:

- Resumen general
- Distribución por prioridad
- Barra de progreso visual
- Tareas vencidas

## 🎨 Estados Visuales de las Tareas

### Prioridades (con colores):

- 🔴 **Alta:** Rojo - Tareas críticas
- 🟡 **Media:** Amarillo - Importancia normal
- 🟢 **Baja:** Verde - Menos urgente

### Estados (según fecha):

- **Normal:** Más de 7 días restantes
- **Próxima:** Entre 4-7 días restantes
- **Urgente:** Entre 1-3 días restantes
- **Vence hoy:** 0 días restantes
- **Vencida:** Fecha límite pasada

## 💡 Funcionalidades Avanzadas

### Notificaciones

- **Éxito:** Verde - Acciones completadas
- **Error:** Rojo - Problemas o validaciones
- **Info:** Azul - Información general

### Confirmaciones

- **Eliminación:** Modal de confirmación para evitar pérdida accidental
- **Validaciones:** Mensajes claros para errores de entrada

### Responsive Design

- **Desktop:** Vista completa con todas las opciones
- **Tablet:** Adaptación automática del layout
- **Móvil:** Interfaz optimizada para pantallas pequeñas

## 🔧 Estructura del código web

### Archivos principales:

- **`index.html`:** Estructura HTML de la interfaz
- **`styles.css`:** Estilos CSS con diseño moderno
- **`app.js`:** Lógica JavaScript de la aplicación

### Clase principal: `GestorTareasWeb`

- **Inicialización:** Configuración automática al cargar
- **Gestión de datos:** CRUD completo de tareas
- **Interfaz:** Actualización dinámica del DOM
- **Persistencia:** Almacenamiento en localStorage

## 🎯 Diferencias con la versión de consola

| Característica     | Consola              | Web                      |
| ------------------ | -------------------- | ------------------------ |
| **Interfaz**       | Texto en terminal    | Gráfica moderna          |
| **Entrada**        | Teclado manual       | Formularios interactivos |
| **Visualización**  | Tablas ASCII         | Tarjetas con colores     |
| **Persistencia**   | Memoria temporal     | localStorage             |
| **Responsive**     | No aplica            | Sí, adaptativo           |
| **Notificaciones** | Texto en consola     | Pop-ups animados         |
| **Confirmaciones** | Preguntas en consola | Modales elegantes        |

## 🚀 Ventajas de la versión web

1. **Accesibilidad:** Funciona en cualquier dispositivo con navegador
2. **Interfaz intuitiva:** No requiere conocimientos de terminal
3. **Visualización mejorada:** Colores, iconos y animaciones
4. **Persistencia real:** Los datos se mantienen entre sesiones
5. **Responsive:** Se adapta a diferentes tamaños de pantalla
6. **Sin instalación:** Solo abrir el archivo HTML

## 🐛 Solución de problemas

### La aplicación no carga

- Verifica que todos los archivos estén en la misma carpeta
- Asegúrate de usar un navegador moderno
- Revisa la consola del navegador (F12) para errores

### Los datos no se guardan

- Verifica que localStorage esté habilitado
- Algunos navegadores en modo privado pueden no guardar datos

### La interfaz no se ve bien

- Actualiza tu navegador a la versión más reciente
- Verifica que JavaScript esté habilitado

## 🔮 Próximas mejoras

- **Categorías de tareas**
- **Recordatorios y notificaciones push**
- **Exportar/importar datos**
- **Temas de colores personalizables**
- **Sincronización en la nube**
- **Modo offline**

---

¡Disfruta organizando tus tareas con esta interfaz moderna y elegante! 🎯✨
