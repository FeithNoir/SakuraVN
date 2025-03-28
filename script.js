document.addEventListener("DOMContentLoaded", () => {
  // --- Referencias a Elementos del DOM ---
  const startScreen = document.getElementById("start-screen");
  const nameInputScreen = document.getElementById("name-input-screen"); // Nueva pantalla nombre
  const gameScreen = document.getElementById("game-screen");
  const optionsScreen = document.getElementById("options-screen");
  const loadingMessage = document.getElementById("loading-message"); // Mensaje cargando

  const newGameBtn = document.getElementById("new-game-btn");
  const optionsBtn = document.getElementById("options-btn");
  const backToStartBtn = document.getElementById("back-to-start-btn"); // Volver desde opciones
  const backToStartFromNameBtn = document.getElementById(
    "back-to-start-from-name-btn"
  ); // Volver desde nombre
  const themeButtons = document.querySelectorAll(
    ".theme-selector .theme-button"
  );

  const playerNameInput = document.getElementById("player-name-input"); // Input nombre
  const confirmNameBtn = document.getElementById("confirm-name-btn"); // Botón confirmar nombre

  const characterImage = document.getElementById("character-image");
  const characterNameDisplay = document.getElementById("character-name");
  const dialogueText = document.getElementById("dialogue-text");
  const optionsContainer = document.getElementById("options-container");

  // --- Variables Globales del Juego ---
  let storyData = null;
  let currentSceneId = null;
  let playerName = "Viajero"; // Nombre por defecto

  // --- Funciones Helper ---
  function getCssVariable(variableName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }

  function getPlaceholderUrl(width, height, text, themeBgVar, themeTextVar) {
    let bgColor = getCssVariable(themeBgVar).substring(1) || "cccccc";
    let textColor = getCssVariable(themeTextVar).substring(1) || "333333";
    return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(
      text
    )}`;
  }

  function showScreen(screenToShow) {
    [startScreen, nameInputScreen, gameScreen, optionsScreen].forEach(
      (screen) => screen.classList.remove("active")
    );
    if (screenToShow !== gameScreen) {
      gameScreen.querySelector(".game-layout").style.display = "none";
    }
    screenToShow.classList.add("active");
    if (screenToShow === gameScreen) {
      gameScreen.querySelector(".game-layout").style.display = "flex";
    }
  }

  // --- Funciones del Juego ---

  // Paso 1: Mostrar pantalla para pedir nombre
  function promptForName() {
    playerNameInput.value = ""; // Limpiar input por si vuelve
    showScreen(nameInputScreen);
    playerNameInput.focus(); // Poner foco en el input
  }

  // Paso 2: Guardar nombre y empezar juego
  function saveNameAndStartGame() {
    const inputName = playerNameInput.value.trim();
    if (inputName) {
      playerName = inputName;
    } else {
      playerName = "Viajero"; // Usar default si está vacío
    }
    console.log("Nombre del jugador:", playerName);
    startGame();
  }

  // Paso 3: Iniciar la lógica del juego
  function startGame() {
    if (!storyData) {
      console.error("Intentando iniciar juego antes de cargar la historia.");
      return;
    }
    showScreen(gameScreen);
    currentSceneId = "1";
    displayScene(currentSceneId);
  }

  function displayScene(sceneId) {
    if (!storyData) return;

    const sceneData = storyData[sceneId];
    if (!sceneData) {
      console.error(`Escena con ID "${sceneId}" no encontrada en storyData!`);
      return;
    }

    // --- Actualizar Personaje ---
    let characterDisplayData = null;
    if (sceneData.character) {
      characterDisplayData = {
        name: sceneData.character.name,
        image: getPlaceholderUrl(
          300,
          400,
          sceneData.character.placeholderText || sceneData.character.name,
          "--image-placeholder-bg",
          "--image-placeholder-text"
        ),
      };
    }
    // (código para mostrar imagen y nombre, sin cambios)
    if (characterDisplayData) {
      characterImage.src = characterDisplayData.image;
      characterImage.alt = characterDisplayData.name;
      characterNameDisplay.textContent = characterDisplayData.name;
      characterImage.style.display = "block";
      characterNameDisplay.style.display = "inline-block";
    } else {
      characterImage.src = "";
      characterImage.alt = "";
      characterNameDisplay.textContent = "";
      characterNameDisplay.style.display = "none";
    }

    // --- Actualizar Diálogo (Reemplazando Placeholder) ---
    let processedText = sceneData.text;
    // Reemplaza todas las ocurrencias de [PLAYER_NAME] con el nombre guardado
    processedText = processedText.replace(/\[PLAYER_NAME\]/g, playerName);
    dialogueText.textContent = processedText;

    // --- Limpiar y Añadir Opciones ---
    optionsContainer.innerHTML = "";
    if (sceneData.options && sceneData.options.length > 0) {
      sceneData.options.forEach((option) => {
        const button = document.createElement("button");
        // Reemplazar placeholder también en las opciones si fuera necesario
        button.textContent = option.text.replace(
          /\[PLAYER_NAME\]/g,
          playerName
        );
        button.addEventListener("click", () =>
          handleOptionClick(String(option.nextSceneId))
        );
        optionsContainer.appendChild(button);
      });
    } else {
      // --- Escena Final --- (sin cambios)
      const endMessage = document.createElement("p");
      endMessage.textContent = `--- Fin (Resultado: ${
        sceneData.ending || "Desconocido"
      }) ---`;
      endMessage.style.fontWeight = "bold";
      endMessage.style.marginTop = "2rem";
      endMessage.style.textAlign = "center";
      optionsContainer.appendChild(endMessage);
      const playAgainButton = document.createElement("button");
      playAgainButton.textContent = "Jugar de Nuevo";
      playAgainButton.style.marginTop = "1rem";
      playAgainButton.addEventListener("click", () => window.location.reload());
      optionsContainer.appendChild(playAgainButton);
    }
  }

  function handleOptionClick(nextSceneId) {
    currentSceneId = nextSceneId;
    displayScene(currentSceneId);
  }

  // --- Funciones de Cambio de Tema ---
  function applyTheme(themeName) {
    if (themeName === "sakura") {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", themeName);
    }
    localStorage.setItem("vnTheme", themeName);

    if (gameScreen.classList.contains("active") && currentSceneId !== null) {
      displayScene(currentSceneId);
    }
  }

  // --- Función de Inicialización Principal ---
  function initializeApp() {
    console.log("Story loaded successfully!");
    loadingMessage.style.display = "none"; // Ocultar mensaje "Cargando"

    const savedTheme = localStorage.getItem("vnTheme");
    applyTheme(savedTheme || "sakura");

    // --- Adjuntar Event Listeners ---
    // Botón Nuevo Juego ahora lleva a pedir nombre
    newGameBtn.addEventListener("click", promptForName);

    // Botón Confirmar Nombre ahora guarda y empieza el juego
    confirmNameBtn.addEventListener("click", saveNameAndStartGame);
    // Permitir confirmar con Enter en el input
    playerNameInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        saveNameAndStartGame();
      }
    });

    // Botones de navegación
    optionsBtn.addEventListener("click", () => showScreen(optionsScreen));
    backToStartBtn.addEventListener("click", () => showScreen(startScreen));
    backToStartFromNameBtn.addEventListener("click", () =>
      showScreen(startScreen)
    ); // Volver desde nombre

    // Cambio de tema
    themeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const theme = button.getAttribute("data-theme");
        applyTheme(theme);
      });
    });

    // Habilitar botones principales
    newGameBtn.disabled = false;
    optionsBtn.disabled = false;

    showScreen(startScreen); // Mostrar pantalla inicial
  }

  // --- Carga Asíncrona del JSON y Arranque ---
  function loadStoryAndInit() {
    fetch("story.json")
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        storyData = data;
        initializeApp();
      })
      .catch((error) => {
        console.error("Error loading story data:", error);
        loadingMessage.textContent = `Error al cargar historia: ${error.message}`;
        loadingMessage.style.color = "red";
        // Mantener botones desactivados si falla la carga
      });
  }

  // --- Punto de Entrada ---
  loadStoryAndInit();
}); // Fin DOMContentLoaded
