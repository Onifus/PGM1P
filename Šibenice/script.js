const words = ["javascript", "programovani", "webdesign"];
let selectedWord;
let hiddenWord;
let attempts;

function initializeGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  hiddenWord = "*".repeat(selectedWord.length);
  console.log(attempts);
  attempts = 0;
  console.log(attempts);
  document.getElementById("wordDisplay").innerText = hiddenWord;
  document.getElementById("message").innerText = "";
  document.getElementById("letterInput").value = "";
  clearCanvas();
}

function drawHangman() {
  const canvas = document.getElementById("hangmanCanvas");
  const ctx = canvas.getContext("2d");

  switch (attempts) {
    case 1:
      ctx.beginPath();
      ctx.moveTo(10, 180);
      ctx.lineTo(100, 180); // základ
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(30, 180);
      ctx.lineTo(30, 20); // sloup
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(30, 20);  // Začínáme od sloupu
      ctx.lineTo(100, 20); // příčka
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo(100, 20); // Začínáme od příčky
      ctx.lineTo(100, 40); // lano
      break;
    case 5:
      ctx.beginPath();
      ctx.arc(100, 60, 20, 0, Math.PI * 2); // hlava
      break;
    case 6:
      ctx.beginPath();
      ctx.moveTo(100, 80);
      ctx.lineTo(100, 130); // tělo
      break;
    case 7:
      ctx.beginPath();
      ctx.moveTo(100, 90);
      ctx.lineTo(80, 110); // levá ruka
      break;
    case 8:
      ctx.beginPath();
      ctx.moveTo(100, 90);
      ctx.lineTo(120, 110); // pravá ruka
      break;
    case 9:
      ctx.beginPath();
      ctx.moveTo(100, 130);
      ctx.lineTo(80, 160); // levá noha
      break;
    case 10:
      ctx.beginPath();
      ctx.moveTo(100, 130);
      ctx.lineTo(120, 160); // pravá noha
      break;
    default:
      return;
  }
  ctx.stroke();
}


function clearCanvas() {
  const canvas = document.getElementById("hangmanCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkLetter() {
  const input = document.getElementById("letterInput");
  const letter = input.value.toLowerCase();

  if (!/^[a-z]$/.test(letter)) {
    document.getElementById("message").innerText = "Zadejte prosím pouze jedno písmeno.";
    return;
  }

  input.value = "";
  document.getElementById("message").innerText = "";

  if (selectedWord.includes(letter)) {
    let newHiddenWord = "";
    for (let i = 0; i < selectedWord.length; i++) {
      newHiddenWord += selectedWord[i] === letter ? letter : hiddenWord[i];
    }
    hiddenWord = newHiddenWord;
    document.getElementById("wordDisplay").innerText = hiddenWord;

    if (!hiddenWord.includes("*")) {
      document.getElementById("message").innerText = "Gratulujeme! Vyhrál(a) jste!";
    }
  } else {
    attempts++;
    drawHangman();

    if (attempts >= 10) {
      document.getElementById("message").innerText = "Prohráli jste! Slovo bylo: " + selectedWord;
    }
  }
}

function resetGame() {
  initializeGame();
}

initializeGame();
