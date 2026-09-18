# Consignas de TechPay

El proyecto se desarrolla con JavaScript Vanilla y un único archivo llamado `app.js`.

La regla principal es trabajar con baby steps: cada funcionalidad se agrega, se prueba y se entiende antes de continuar.

## Reglas para trabajar con IA

Antes de pedir una modificación, compartir el `index.html`, el `styles.css` y el `app.js` actualizados cuando sean necesarios.

Cada pedido debe indicar:

- Qué elementos existen en la maqueta.
- Qué evento debe escuchar JavaScript.
- Qué resultado debe observarse.
- Qué archivo puede modificarse.
- Qué funcionalidades no deben tocarse.

La IA debe conservar el diseño existente y modificar solamente lo necesario para cumplir la consigna.

## Etapas

### 1. Leer la maqueta

Identificar el encabezado, la tarjeta de saldo, las acciones, los contactos, el historial, los servicios y los modales.

Probar que la página se vea correctamente en una pantalla grande y en una pantalla pequeña.

### 2. Privacidad del saldo

Al presionar el botón del ojo, ocultar o mostrar los importes.

Probar:

- Presionar una vez y comprobar que el saldo se oculte.
- Presionar nuevamente y comprobar que vuelva a mostrarse.
- Verificar que cambien también los atributos de accesibilidad.

### 3. Copiar alias y mostrar notificaciones

Usar `navigator.clipboard.writeText()` para copiar el alias y mostrar un mensaje temporal en `#toast`.

### 4. Abrir operaciones

Las tarjetas de operaciones deben abrir el modal reutilizable correspondiente.

El formulario todavía no debe modificar saldos hasta completar la etapa siguiente.

### 5. Ingresos y transferencias

Crear un estado con el saldo actual.

- Un ingreso aumenta el saldo.
- Una transferencia disminuye el saldo.
- No se permiten importes cero o negativos.
- No se permiten transferencias superiores al saldo.
- Cada operación crea un movimiento.

### 6. Contactos

Agregar contactos mediante el formulario.

- Validar nombre y alias.
- Impedir alias repetidos.
- Mostrar el nuevo contacto en el carrusel.
- Completar el alias al elegir un contacto frecuente.

### 7. Servicios

Pagar un servicio pendiente.

- Validar saldo suficiente.
- Cambiar el servicio a pagado.
- Actualizar el contador.
- Crear un egreso en el historial.

### 8. Persistencia

Guardar y recuperar información utilizando `localStorage`.

Claves utilizadas:

- `techpay_saldo_ars`
- `techpay_transacciones`
- `techpay_contactos`
- `techpay_servicios`

Explicar la diferencia entre `JSON.stringify()` y `JSON.parse()`.

### 9. Filtros y búsqueda

Combinar las pestañas de movimientos con el campo de búsqueda.

La tarjeta debe mostrarse únicamente cuando coincida con el filtro y con el texto buscado.

### 10. Comprobantes

Al seleccionar un movimiento, abrir un modal con:

- Descripción.
- Importe.
- Estado.
- Identificador.

### 11. Cotización del dólar

Consultar la API pública con `fetch` y `async/await`.

- Mostrar un estado de carga.
- Actualizar compra y venta.
- Detectar errores.
- Mantener una cotización de referencia si no hay conexión.

## Pruebas finales

1. Ocultar y mostrar el saldo.
2. Copiar el alias.
3. Abrir y cerrar cada operación.
4. Registrar un ingreso.
5. Transferir un importe válido.
6. Intentar transferir más dinero que el saldo.
7. Agregar un contacto.
8. Intentar repetir un alias.
9. Pagar un servicio.
10. Intentar pagar sin saldo suficiente.
11. Filtrar ingresos y egresos.
12. Buscar un movimiento existente.
13. Abrir un comprobante.
14. Recargar la página y comprobar la persistencia.
15. Probar la aplicación sin conexión y verificar el fallback del dólar.
16. Revisar que no haya errores en la consola.
