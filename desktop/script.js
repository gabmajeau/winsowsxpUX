
const startButton = document.getElementById("start-button");
const startImg = document.getElementById("start-img");

startButton.addEventListener("mousedown", () => {
  startImg.src = "assets/buttonxpclick.png";
});

startButton.addEventListener("mouseup", () => {
  startImg.src = "assets/buttonxphover.png";
});

startButton.addEventListener("mouseenter", () => {
  startImg.src = "assets/buttonxphover.png";
});

startButton.addEventListener("mouseleave", () => {
  startImg.src = "assets/buttonxp2.png";
});

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

window.addEventListener("load", () => {
  const notification = document.getElementById("notification");
  notification.classList.add("show");
  
  setTimeout(() => {
    notification.classList.remove("show");
  }, 6000); 
});

window.addEventListener("load", () => {
  const som = document.getElementById("startup-sound");
  som.volume = 0.1; 
  som.play().catch(() => {
    console.log("Som bloqueado até interação do usuário");
  });
});


const icons = document.querySelectorAll(".icon");
const desktop = document.querySelector(".desktop");


const videoMap = {
  "Emulador PS1": "assets/icons/videos/ps1.mp4",
  "Emulador PS2": "assets/icons/videos/ps2.mp4",
  "TLOZ - Emulador 64": "assets/icons/videos/pj64.mp4",
  "Internet Explorer": "assets/icons/videos/ie.mp4",
  "MSN": "assets/icons/videos/msn.mp4",
  "Media Player": "assets/icons/videos/mediaplayer.mp4",
  "Paciência": "assets/icons/videos/solitarie.mp4",
  "Warcraft III: The Frozen...": "assets/icons/videos/wc3.mp4",
  "Midnight Club 3": "assets/icons/videos/mdc.mp4",
  "DOOM": "assets/icons/videos/doom.mp4",
  "Counter-Strike 1.6": "assets/icons/videos/cs.mp4",
};

icons.forEach(icon => {
  icon.addEventListener("dblclick", () => {
    const title = icon.querySelector("h3").textContent.trim();
    const videoSrc = videoMap[title];
    if (!videoSrc) return;

    const iconImg = icon.querySelector("img").src;

    const windowDiv = document.createElement("div");
    windowDiv.classList.add("window");

    windowDiv.innerHTML = `
      <div class="window-header">
        <div class="window-title-area">
          <img src="${iconImg}" class="window-icon" alt="ícone">
          <span class="window-title">${title}</span>
        </div>
        <button class="close-btn">
          <img src="assets/x.png" alt="Fechar" class="close-icon">
        </button>
      </div>
      <div class="window-body">
        <video autoplay ${title === "Media Player" ? "controls" : ""}>
          <source src="${videoSrc}" type="video/mp4">
          Seu navegador não suporta vídeos.
        </video>
      </div>
    `;
makeWindowDraggable(windowDiv);

    desktop.appendChild(windowDiv);

    const video = windowDiv.querySelector("video");
    const closeBtn = windowDiv.querySelector(".close-btn");
    const closeIcon = closeBtn.querySelector(".close-icon");


    video.addEventListener("ended", () => {
      windowDiv.remove();
    });


    closeBtn.addEventListener("mousedown", () => {
      closeIcon.src = "assets/xclick.png";
    });
    closeBtn.addEventListener("mouseup", () => {
      closeIcon.src = "assets/x.png";
    });
    closeBtn.addEventListener("mouseleave", () => {
      closeIcon.src = "assets/x.png";
    });

    closeBtn.addEventListener("click", () => {
      windowDiv.remove();
    });
  });
});


function makeWindowDraggable(windowDiv) {
  const header = windowDiv.querySelector(".window-header");
  let offsetX = 0, offsetY = 0;
  let isDragging = false;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = windowDiv.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    windowDiv.style.zIndex = 10000; 
    header.style.cursor = "grabbing";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    header.style.cursor = "default";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    windowDiv.style.left = `${e.clientX - offsetX}px`;
    windowDiv.style.top = `${e.clientY - offsetY}px`;
    windowDiv.style.position = "absolute";
  });
}

let isSelecting = false;
let startX, startY;
let selectionBox;


 
document.addEventListener("mouseup", () => {
  if (!isDraggingSelect) return;
  isDraggingSelect = false;

  const boxRect = dragSelectionBox.getBoundingClientRect();
  const icons = document.querySelectorAll(".icon");

  icons.forEach(icon => {
    const iconRect = icon.getBoundingClientRect();
    const isInside =
      iconRect.left < boxRect.right &&
      iconRect.right > boxRect.left &&
      iconRect.top < boxRect.bottom &&
      iconRect.bottom > boxRect.top;

    icon.classList.toggle("selected", isInside);
  });

  dragSelectionBox.remove();
});
 
    
const startMenu = document.getElementById('start-menu');

startButton.addEventListener('click', (e) => {
  e.stopPropagation();
  const isVisible = startMenu.style.display === 'block';
  startMenu.style.display = isVisible ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
  if (!startMenu.contains(e.target) && e.target !== startButton) {
    startMenu.style.display = 'none';
  }
});

const windowMap = {
  "Internet Explorer": "explorer-window",
};

const videoSources = {
  "Media Player": "assets/icons/videos/mediaplayer.mp4",
  "Paciência": "assets/icons/videos/solitaire.mp4",
  "Emulador PS1": "assets/icons/videos/ps1.mp4",
  "Emulador PS2": "assets/icons/videos/ps2.mp4"
};


document.querySelectorAll(".start-shortcut").forEach(shortcut => {
  shortcut.addEventListener("click", () => {

    const app = shortcut.getAttribute("data-app");
    startMenu.style.display = "none";

    // 1) Explorer abre sua janela especial
    if (app === "Internet Explorer") {
      document.getElementById("explorer-window").style.display = "block";
      return;
    }

    // 2) Os outros apps usam o mesmo sistema do desktop
    const videoSrc = videoMap[app];
    if (!videoSrc) return;

    // Ícone da esquerda no menu iniciar
    const iconImg = shortcut.querySelector("img").src;

    // Criar janela igual à do desktop
    const windowDiv = document.createElement("div");
    windowDiv.classList.add("window");

    windowDiv.innerHTML = `
      <div class="window-header">
        <div class="window-title-area">
          <img src="${iconImg}" class="window-icon" alt="ícone">
          <span class="window-title">${app}</span>
        </div>
        <button class="close-btn">
          <img src="assets/x.png" alt="Fechar" class="close-icon">
        </button>
      </div>
      <div class="window-body">
        <video autoplay>
          <source src="${videoSrc}" type="video/mp4">
          Seu navegador não suporta vídeos.
        </video>
      </div>
    `;

    makeWindowDraggable(windowDiv);
    desktop.appendChild(windowDiv);

    const video = windowDiv.querySelector("video");
    const closeBtn = windowDiv.querySelector(".close-btn");
    const closeIcon = closeBtn.querySelector(".close-icon");

    // Fechar quando o vídeo terminar
    video.addEventListener("ended", () => windowDiv.remove());

    // Animação do botão fechar
    closeBtn.addEventListener("mousedown", () => closeIcon.src = "assets/xclick.png");
    closeBtn.addEventListener("mouseup", () => closeIcon.src = "assets/x.png");
    closeBtn.addEventListener("mouseleave", () => closeIcon.src = "assets/x.png");

    // Fechar
    closeBtn.addEventListener("click", () => windowDiv.remove());
  });
});


document.getElementById("logoffBtn").onclick = () => {
    window.location.href = "index.html";
};

document.getElementById("shutdownBtn").onclick = () => {
    window.location.href = "loadingoff.html";
};


const userIcon = document.querySelector(".user-icon");
const userPicOverlay = document.getElementById("userPicOverlay");
const userPicWindow = document.getElementById("userPicWindow");
const closeUserPicWindow = document.getElementById("userPicClose");

// Abre a janela
userIcon.addEventListener("click", () => {
  userPicOverlay.style.display = "block";
  userPicWindow.style.display = "block";
});

// Botão X (clicado)
closeUserPicWindow.addEventListener("mousedown", () => {
  closeUserPicWindow.src = "assets/xclick.png";
});

// Solta o botão X (fecha)
closeUserPicWindow.addEventListener("mouseup", () => {
  closeUserPicWindow.src = "assets/x.png";
  userPicOverlay.style.display = "none";
  userPicWindow.style.display = "none";
});

// Trocar foto ao clicar
document.querySelectorAll(".pic-choice").forEach(img => {
  img.addEventListener("click", () => {
    userIcon.src = img.src;
    userPicOverlay.style.display = "none";
    userPicWindow.style.display = "none";
  });
});

const bonziIcon = document.getElementById("bonziBuddy");
const bonziGif = document.getElementById("bonziGifContainer");

let bonziActivated = false;

bonziIcon.addEventListener("click", (e) => {
  e.stopPropagation(); 
  if (bonziActivated) return;

  bonziActivated = true;
  bonziGif.style.display = "block";
});

document.getElementById("bonzi-icon").addEventListener("click", () => {
  if (document.querySelector(".bonzi-window")) return;

  const bonzi = document.createElement("img");
  bonzi.src = "bonzi.gif"; 
  bonzi.className = "bonzi-window";
  document.body.appendChild(bonzi);
});






