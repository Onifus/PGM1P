const canvas = document.getElementById("ballCanvas");
const ctx = canvas.getContext("2d");

// Inicializace objektu kuličky
let ball = {
  x: Math.random() * canvas.width, // Náhodné výchozí souřadnice X
  y: Math.random() * canvas.height, // Náhodné výchozí souřadnice Y
  radius: 20,
  dx: 0, // Rychlost na ose X (nastavena později)
  dy: 0, // Rychlost na ose Y (nastavena později)
};

// Pole pro uchování pozic kuličky pro sledování trajektorie
let trail = [];

// Funkce pro nastavení náhodné rychlosti
function initializeBallSpeed() {
  // Generujeme rychlost pro osu X a Y
  const speedX = Math.random() * 4 + 2; // Rychlost X mezi 2 a 6
  const speedY = Math.random() * 4 + 2; // Rychlost Y mezi 2 a 6

  // Zajišťujeme, že směry budou náhodné a rozdílné
  ball.dx = (Math.random() > 0.5 ? 1 : -1) * speedX;  // Náhodný směr na ose X
  ball.dy = (Math.random() > 0.5 ? 1 : -1) * speedY;  // Náhodný směr na ose Y
}

// Inicializace náhodné rychlosti při spuštění
initializeBallSpeed();

let animation; // Uložení interval ID

// Funkce vykreslení kuličky a její trajektorie
function drawBall() {
  // Snižujeme opacitu pro efekt mizení trajektorie
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Poloprůhledná černá pro zjemnění efektu
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Vyčištění plátna s nízkou opacitou
  
  // Vykreslení cesty (trail)
  ctx.beginPath();
  for (let i = 0; i < trail.length; i++) {
    let opacity = 1 - (i / trail.length); // Snižujeme opacitu čáry s větší vzdáleností
    ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`; // Nastavujeme barvu čáry podle opacity
    ctx.lineWidth = 2;
    ctx.moveTo(trail[i].x, trail[i].y);
    ctx.lineTo(trail[i].x + ball.radius, trail[i].y + ball.radius); // Čára od minulého bodu k aktuálnímu
  }
  ctx.stroke();
  
  // Přidání nové pozice kuličky do trajektorie
  trail.push({x: ball.x, y: ball.y});
  if (trail.length > 200) {
    trail.shift(); // Odebíráme první bod, aby historie trajektorie nevyplnila plátno
  }

  // Vykreslení kuličky
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#00c6ff";
  ctx.fill();
  ctx.closePath();

  // Posun kuličky
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Kontrola nárazu na okraj plátna
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx; // Otočení směru na ose X
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy; // Otočení směru na ose Y
  }
}

// Spuštění animace pomocí setInterval()
document.getElementById("startAnimation").addEventListener("click", () => {
  // Pokud je animace již spuštěná, resetujeme plátno a kuličku
  if (animation) {
    clearInterval(animation);
  }

  // Vymazání plátna
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reset pozice kuličky a rychlosti
  ball.x = Math.random() * canvas.width;
  ball.y = Math.random() * canvas.height;
  initializeBallSpeed(); // Znovu inicializujeme rychlosti
  trail = []; // Resetování trajektorie

  // Spustíme novou animaci
  animation = setInterval(drawBall, 16); // Přibližně 60 FPS
});

// Možnost restartování animace kliknutím na plátno
canvas.addEventListener("click", () => {
  clearInterval(animation);
  animation = null;

  // Reset pozice a rychlosti kuličky
  ball.x = Math.random() * canvas.width;
  ball.y = Math.random() * canvas.height;
  initializeBallSpeed(); // Znovu inicializujeme rychlosti
  trail = []; // Resetování trajektorie
});
