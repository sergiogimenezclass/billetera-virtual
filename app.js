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
const operationAmount = document.querySelector("#operation-amount");
const formError = document.querySelector("#form-error");
const movementList = document.querySelector("#movements-list");
const movementSearch = document.querySelector("#movement-search");
const noMovements = document.querySelector("#no-movements");
const filterButtons = document.querySelectorAll("[data-filter]");

/*
  Esta variable representa un pequeño estado de la interfaz.
  El saldo real no cambia: solamente cambia la forma de mostrarlo.
*/
let balanceIsHidden = false;

/*
  Este objeto reúne los datos que sí pueden cambiar durante el uso de la app.
  Por ahora trabajamos solamente con pesos; los dólares se incorporarán después.
*/
const wallet = {
  balanceARS: 125000.5
};

let selectedMovementFilter = "all";

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
    updateBalance();
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
  formError.textContent = "";
  formError.classList.add("is-hidden");
}

function updateBalance() {
  if (balanceIsHidden) return;

  balanceTitle.textContent = `$ ${wallet.balanceARS.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
}

/*
  Crea un movimiento con elementos del DOM en lugar de concatenar HTML.
  textContent trata la descripción como texto y evita interpretarla como código.
*/
function addMovement({ description, amount, type }) {
  const movement = document.createElement("button");
  movement.className = "movement-item";
  movement.type = "button";
  movement.dataset.type = type;
  movement.dataset.description = description;
  movement.dataset.movementId = Date.now();

  const icon = document.createElement("span");
  icon.className = `movement-icon ${type === "income" ? "movement-income" : "movement-transfer"}`;
  icon.textContent = type === "income" ? "↓" : "↗";

  const copy = document.createElement("span");
  copy.className = "movement-copy";
  const title = document.createElement("strong");
  title.textContent = description;
  const details = document.createElement("small");
  details.textContent = "Ahora · Operación";
  copy.append(title, details);

  const amountElement = document.createElement("span");
  amountElement.className = `movement-amount ${type === "income" ? "amount-income" : "amount-expense"}`;
  const sign = type === "income" ? "+" : "−";
  amountElement.textContent = `${sign} $ ${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

  movement.append(icon, copy, amountElement);
  movementList.prepend(movement);
  filterMovements();
}

/*
  Una tarjeta debe cumplir las dos condiciones para permanecer visible:
  coincidir con la pestaña elegida y con el texto buscado.
*/
function filterMovements() {
  const searchTerm = movementSearch.value.toLowerCase().trim();
  const movements = movementList.querySelectorAll(".movement-item");
  let visibleMovements = 0;

  movements.forEach((movement) => {
    const matchesFilter = selectedMovementFilter === "all" || movement.dataset.type === selectedMovementFilter;
    const matchesSearch = movement.dataset.description.toLowerCase().includes(searchTerm);
    const shouldShow = matchesFilter && matchesSearch;

    movement.classList.toggle("is-hidden", !shouldShow);
    if (shouldShow) visibleMovements += 1;
  });

  noMovements.classList.toggle("is-hidden", visibleMovements > 0);
}

function showFormError(message) {
  formError.textContent = message;
  formError.classList.remove("is-hidden");
}

/*
  Los contactos frecuentes reutilizan el formulario de transferencia.
  dataset permite leer el alias guardado en cada tarjeta del HTML.
*/
document.querySelectorAll("[data-contact-id]").forEach((contact) => {
  contact.addEventListener("click", () => {
    openOperationModal("transfer");
    operationDetail.value = contact.dataset.contactAlias;
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedMovementFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-selected", String(isSelected));
    });

    filterMovements();
  });
});

movementSearch.addEventListener("input", filterMovements);

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

operationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const operation = operationModal.dataset.operation;
  const amount = Number(operationAmount.value);
  const detail = operationDetail.value.trim();

  if (!amount || amount <= 0) {
    showFormError("Ingresá un monto mayor que cero.");
    return;
  }

  if (operation === "currency") {
    showToast("La compra de dólares se incorporará después");
    return;
  }

  if (operation === "transfer" && !detail) {
    showFormError("Ingresá el alias del destinatario.");
    return;
  }

  if (operation === "transfer" && amount > wallet.balanceARS) {
    showFormError("No tenés saldo suficiente para realizar esta transferencia.");
    return;
  }

  if (operation === "income") {
    wallet.balanceARS += amount;
    addMovement({ description: detail || "Dinero ingresado", amount, type: "income" });
    showToast("Ingreso registrado correctamente");
  } else {
    wallet.balanceARS -= amount;
    addMovement({ description: `Transferencia a ${detail}`, amount, type: "expense" });
    showToast("Transferencia realizada correctamente");
  }

  updateBalance();
  closeOperationModal();
});

/* La lista empieza mostrando todos los movimientos iniciales. */
filterMovements();
