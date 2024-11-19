const objects = [];

document.getElementById("addObject").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const type = document.getElementById("type").value.trim();
  const weight = document.getElementById("weight").value.trim();
  const errors = [];

  if (!name) errors.push("Chybí hodnota v poli Název.");
  if (!type) errors.push("Chybí hodnota v poli Typ.");
  if (!weight) errors.push("Chybí hodnota v poli Hmotnost.");
  else if (isNaN(weight) || Number(weight) <= 0) errors.push("Hmotnost musí být kladné číslo.");

  const errorMessages = document.getElementById("errorMessages");
  errorMessages.innerHTML = errors.join("<br>");

  if (errors.length === 0) {
    objects.push({ name, type, weight: parseFloat(weight) });
    updateTable();
    errorMessages.innerHTML = "Objekt úspěšně přidán!";
    errorMessages.style.color = "green";
    setTimeout(() => {
      errorMessages.innerHTML = "";
      errorMessages.style.color = "red";
    }, 2000);
    document.getElementById("objectForm").reset();
  }
});


function updateTable() {
  const table = document.getElementById("objectTable");
  const tbody = table.querySelector("tbody");
  const totalWeightCell = document.getElementById("totalWeight");

  tbody.innerHTML = objects.map((obj, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${obj.name}</td>
      <td>${obj.type}</td>
      <td>${obj.weight} kg</td>
    </tr>
  `).join("");

  const totalWeight = objects.reduce((sum, obj) => sum + obj.weight, 0);
  totalWeightCell.textContent = `${totalWeight} kg`;

  table.classList.remove("hidden");
}

// Zobrazit pop-up okno
function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popupMessage");
  popupMessage.innerHTML = message;
  popup.classList.add("visible");
}

// Skrýt pop-up okno
function hidePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("visible");
}

// Přidání funkce zavření okna kliknutím mimo obsah
document.getElementById("popup").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    hidePopup();
  }
});

// Přidání funkce zavření okna přes tlačítko
document.getElementById("closePopup").addEventListener("click", hidePopup);

// Nahrazení alert() voláním vlastního pop-up okna
document.getElementById("showSummary").addEventListener("click", () => {
  if (objects.length === 0) {
    showPopup("Žádné objekty nejsou k dispozici.");
  } else {
    const summary = objects.map(obj => `<strong>${obj.name}</strong>: ${obj.type}, ${obj.weight} kg`).join("<br>");
    showPopup(`<h3>Souhrn objektů</h3>${summary}`);
  }
});

document.getElementById("calculateWeight").addEventListener("click", () => {
  if (objects.length === 0) {
    showPopup("Žádné objekty nejsou k dispozici.");
  } else {
    const totalWeight = objects.reduce((sum, obj) => sum + obj.weight, 0);
    showPopup(`<h3>Celková hmotnost</h3>Celková hmotnost všech objektů je: <strong>${totalWeight} kg</strong>`);
  }
});
