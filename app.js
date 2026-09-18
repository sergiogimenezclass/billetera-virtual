/*
  Este es el único archivo JavaScript de TechPay.

  La aplicación se desarrolla con baby steps: cada funcionalidad se agrega,
  prueba y explica antes de comenzar la siguiente.
*/

/*
  querySelector conecta JavaScript con un elemento del HTML.
  Guardamos cada elemento que vamos a modificar para no repetir la búsqueda.
*/
const balanceTitle = document.querySelector("#balance-title");
const balanceUsd = document.querySelector("#balance-usd");
const toggleBalanceButton = document.querySelector("#toggle-balance");
const privacyIcon = document.querySelector("#privacy-icon");
const copyAliasButton = document.querySelector("#copy-alias");
const toast = document.querySelector("#toast");
const operationModal = document.querySelector("#operation-modal");
const operationForm = document.querySelector("#operation-form");
const modalTitle = document.querySelector("#modal-title");
const modalEyebrow = document.querySelector("#modal-eyebrow");
const operationDetail = document.querySelector("#operation-detail");
const closeModalButton = document.querySelector("#close-modal");

/*
  Esta variable representa un pequeño estado de la interfaz.
  El saldo real no cambia: solamente cambia la forma de mostrarlo.
*/
let balanceIsHidden = false;

/*
  Muestra un mensaje temporal en la interfaz.
  setTimeout ejecuta una función después de una cantidad de milisegundos.
*/
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

/*
  Alternar significa pasar de un estado a otro.
  Si el saldo está visible, mostramos puntos; si está oculto, recuperamos los textos.
*/
function toggleBalanceVisibility() {
  balanceIsHidden = !balanceIsHidden;

  if (balanceIsHidden) {
    balanceTitle.textContent = "$ ••••••••";
    balanceUsd.textContent = "USD ••••••";
    privacyIcon.textContent = "○";
    toggleBalanceButton.setAttribute("aria-label", "Mostrar saldo");
    toggleBalanceButton.setAttribute("aria-pressed", "true");
  } else {
    balanceTitle.textContent = "$ 125.000,50";
    balanceUsd.textContent = "≈ USD 102,46";
    privacyIcon.textContent = "◉";
    toggleBalanceButton.setAttribute("aria-label", "Ocultar saldo");
    toggleBalanceButton.setAttribute("aria-pressed", "false");
  }
}

/*
  Clipboard API permite copiar texto sin que el usuario tenga que seleccionarlo.
  La interfaz avisa cuando la acción terminó correctamente.
*/
async function copyAlias() {
  const alias = copyAliasButton.dataset.copyValue;

  try {
    await navigator.clipboard.writeText(alias);
    showToast("¡Alias copiado!");
  } catch (error) {
    showToast("No se pudo copiar el alias");
  }
}

/*
  Un mismo modal sirve para varias operaciones.
  dataset.operation identifica qué tarjeta abrió la ventana.
*/
function openOperationModal(operation) {
  const operationNames = {
    income: "Ingresar dinero",
    transfer: "Transferir dinero",
    currency: "Comprar dólares"
  };

  modalTitle.textContent = operationNames[operation];
  modalEyebrow.textContent = operation === "transfer" ? "Nueva transferencia" : "Nueva operación";
  operationDetail.placeholder = operation === "transfer" ? "Alias o descripción del destinatario" : "Ej: Dinero recibido";
  operationModal.dataset.operation = operation;
  operationModal.classList.remove("is-hidden");
  document.querySelector("#operation-amount").focus();
}

function closeOperationModal() {
  operationModal.classList.add("is-hidden");
  operationForm.reset();
}

toggleBalanceButton.addEventListener("click", toggleBalanceVisibility);
copyAliasButton.addEventListener("click", copyAlias);
closeModalButton.addEventListener("click", closeOperationModal);

document.querySelectorAll("[data-operation]").forEach((button) => {
  button.addEventListener("click", () => {
    openOperationModal(button.dataset.operation);
  });
});

/* Cerrar al hacer clic fuera del contenido conserva el comportamiento esperado de un modal. */
operationModal.addEventListener("click", (event) => {
  if (event.target === operationModal) {
    closeOperationModal();
  }
});

/* Esta primera etapa todavía no confirma operaciones ni modifica saldos. */
operationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("La operación se incorporará en la próxima etapa");
});
