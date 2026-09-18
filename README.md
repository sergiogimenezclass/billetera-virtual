# TechPay: de la maqueta a la billetera virtual

TechPay es una billetera virtual bimonetaria creada como proyecto educativo de Diseño y Desarrollo Web.

La propuesta parte de una maqueta completa realizada con HTML y CSS. Después, JavaScript Vanilla incorpora el comportamiento de la aplicación paso a paso.

## Objetivo

El objetivo no es copiar una aplicación completa, sino aprender a transformar una interfaz estática en una aplicación interactiva mediante:

- Manipulación del DOM.
- Eventos del navegador.
- Objetos y arrays.
- Gestión de estado.
- Validaciones.
- Renderizado dinámico.
- `localStorage`.
- `fetch` y `async/await`.

## Las tres partes del proyecto

```text
HTML (index.html)  -> estructura y contenido
CSS (styles.css)   -> diseño y maquetación
JS (app.js)        -> interactividad y comportamiento
```

El proyecto utiliza un único archivo JavaScript. Ese archivo contiene comentarios pedagógicos para que los alumnos puedan inspeccionar el código y relacionar cada función con la interfaz.

## Reglas de maquetación

- Grid para el layout general.
- Flexbox dentro de los componentes.
- Colores escritos directamente, sin variables CSS.
- Medidas expresadas en `px` y `%`.
- Diseño responsive mediante media queries.
- JavaScript Vanilla, sin librerías.

## Estructura

```text
billetera-virtual/
├── index.html
├── styles.css
├── app.js
├── README.md
├── CONSIGNAS.md
├── .gitignore
└── assets/
    └── images/
```

## Funcionalidades previstas

### Saldo y privacidad

- Mostrar y ocultar el saldo.
- Mostrar saldos en pesos y dólares.
- Copiar el alias o CVU.
- Mostrar una notificación después de copiar.

### Contactos y transferencias

- Seleccionar contactos frecuentes.
- Agregar contactos nuevos.
- Completar automáticamente los datos del destinatario.
- Validar que exista saldo suficiente.
- Registrar transferencias en el historial.

### Ingresos y pagos

- Registrar ingresos de dinero.
- Mostrar servicios pendientes.
- Pagar servicios.
- Actualizar el saldo después de cada operación.

### Historial

- Mostrar movimientos.
- Filtrar por ingresos, egresos y divisas.
- Buscar por descripción.
- Abrir el comprobante de una operación.

### Cotización del dólar

- Consultar una API pública mediante `fetch`.
- Mostrar un estado de carga.
- Calcular conversiones entre ARS y USD.
- Utilizar una cotización alternativa si la API falla.

## Persistencia

Los datos se guardarán en `localStorage` para simular una base de datos local. La información será ficticia y tendrá únicamente fines educativos.

La aplicación no procesa dinero real ni debe utilizarse para guardar información financiera verdadera.

## Metodología de trabajo

No se implementará toda la aplicación de una sola vez. Cada funcionalidad se desarrollará en una etapa pequeña:

1. Leer la maqueta.
2. Identificar los elementos del DOM.
3. Crear o modificar el estado necesario.
4. Escuchar una interacción.
5. Actualizar la interfaz.
6. Probar el resultado.
7. Revisar los errores antes de continuar.

## Commits

El historial del repositorio acompaña el aprendizaje. Cada commit representa una funcionalidad concreta y deja la aplicación en un estado comprobable.

```text
chore: initialize wallet project
docs: add project readme and learning guide
feat: add wallet layout interactions
feat: toggle balance privacy
feat: copy alias to clipboard
feat: add transaction rendering
feat: add income operation
feat: add transfer validation
feat: persist wallet data
feat: add transaction filters
feat: add transaction search
feat: add transaction receipt modal
feat: add contacts management
feat: add services payments
feat: integrate dollar exchange api
```

## Pruebas

Después de cada funcionalidad se comprobará, como mínimo:

- Que la interacción responda.
- Que la información mostrada sea correcta.
- Que los estados inválidos sean rechazados.
- Que no aparezcan errores en la consola.
- Que la interfaz siga funcionando después de recargar, cuando corresponda.
