document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".window").style.display = "none";
});

    const continueBtn = document.getElementById("continues-btn");
        document.getElementById("continues-btn").addEventListener("click", () => {
      window.location.href = "desktop/index.html"; 
    });


    function makeWindowDraggable(windowEl) {
  const header = windowEl.querySelector(".title-bar");
  let offsetX = 0, offsetY = 0, isDragging = false;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;
    windowEl.style.zIndex = 1000; // traz pra frente
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    windowEl.style.left = `${e.clientX - offsetX}px`;
    windowEl.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

const bonzi = document.getElementById("bonzi-img");
const originalSrc = bonzi.src;

const bonziSounds = [
  "desktop/assets/buzzysound/1.m4a",
  "desktop/assets/buzzysound/2.m4a",
  "desktop/assets/buzzysound/3.m4a",
  "desktop/assets/buzzysound/4.m4a",
  "desktop/assets/buzzysound/5.m4a",
  "desktop/assets/buzzysound/6.m4a",
  "desktop/assets/buzzysound/7.m4a",
  "desktop/assets/buzzysound/8.m4a",

];

bonzi.addEventListener("click", () => {
  const randomSound = bonziSounds[Math.floor(Math.random() * bonziSounds.length)];
  const sound = new Audio(randomSound);
  sound.volume = 0.5;
  sound.play();

  // Guarda o tamanho atual antes de trocar
  const width = bonzi.offsetWidth;
  const height = bonzi.offsetHeight;

  bonzi.src = "desktop/assets/bonzybuddy2.gif";

  // Aplica o mesmo tamanho da imagem anterior
    bonzi.style.height = height + "px";

  setTimeout(() => {
    bonzi.src = originalSrc;
    bonzi.style.width = ""; 
    bonzi.style.height = "";
  }, 800);
});

function makeWindowDraggable(windowEl) {
  const header = windowEl.querySelector(".title-bar");
  let offsetX = 0, offsetY = 0, isDragging = false;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;
    windowEl.style.zIndex = 1000; 
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    windowEl.style.left = `${e.clientX - offsetX}px`;
    windowEl.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}


document.querySelectorAll(".window").forEach(makeWindowDraggable);
