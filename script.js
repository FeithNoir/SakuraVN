document.addEventListener("DOMContentLoaded", () => {
  // --- Referencias a Elementos del DOM ---
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const optionsScreen = document.getElementById("options-screen"); // Nueva pantalla

  const newGameBtn = document.getElementById("new-game-btn");
  const optionsBtn = document.getElementById("options-btn"); // Botón opciones
  const backToStartBtn = document.getElementById("back-to-start-btn"); // Botón volver
  const themeButtons = document.querySelectorAll(
    ".theme-selector .theme-button"
  ); // Botones de tema

  const characterImage = document.getElementById("character-image");
  const characterNameDisplay = document.getElementById("character-name");
  const dialogueText = document.getElementById("dialogue-text");
  const optionsContainer = document.getElementById("options-container");

  // --- Función Helper para obtener color CSS variable ---
  // Útil para actualizar placeholders dinámicamente
  function getCssVariable(variableName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }

  // --- Función para generar URL de Placeholder con colores del tema ---
  function getPlaceholderUrl(width, height, text, themeBgVar, themeTextVar) {
    // Obtener los colores actuales computados
    let bgColor = getCssVariable(themeBgVar).substring(1); // Quita '#'
    let textColor = getCssVariable(themeTextVar).substring(1); // Quita '#'

    // Fallback si los colores no se pueden obtener o son inválidos
    if (!bgColor || bgColor.length < 3) bgColor = "cccccc";
    if (!textColor || textColor.length < 3) textColor = "333333";

    return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(
      text
    )}`;
  }

  // --- Datos de la Historia (Ahora usa función para placeholders) ---
  const story = {
    1: {
      // Usamos variables CSS para los colores del placeholder
      character: () => ({
        name: "???",
        image: getPlaceholderUrl(
          300,
          400,
          "Sakura",
          "--image-placeholder-bg",
          "--image-placeholder-text"
        ),
      }),
      text: "Despiertas bajo un cerezo en flor...",
      options: [
        { text: "Intentar levantarte", nextSceneId: 2 },
        { text: "Observar los alrededores", nextSceneId: 3 },
      ],
    },
    2: {
      character: () => ({
        name: "Akari",
        image: getPlaceholderUrl(
          300,
          400,
          "Akari",
          "--image-placeholder-bg",
          "--image-placeholder-text"
        ),
      }),
      text: "Al intentar ponerte de pie, una chica...",
      options: [
        { text: "'Sí, gracias. ¿Quién eres?'", nextSceneId: 4 },
        { text: "'Me duele un poco la cabeza...'", nextSceneId: 5 },
      ],
    },
    3: {
      character: null,
      text: "Miras a tu alrededor. Es un jardín hermoso...",
      options: [
        { text: "Seguir el sendero", nextSceneId: 6 },
        { text: "Quedarte bajo el árbol", nextSceneId: 7 },
      ],
    },
    4: {
      character: () => ({
        name: "Akari",
        image: getPlaceholderUrl(
          300,
          400,
          "Akari :)",
          "--image-placeholder-bg",
          "--image-placeholder-text"
        ),
      }),
      text: "'Me llamo Akari. Este es el Jardín...",
      options: [
        { text: "Aceptar su ayuda", nextSceneId: 100 },
        { text: "Desconfiar y alejarte", nextSceneId: 101 },
      ],
    },
    5: {
      character: () => ({
        name: "Akari",
        image: getPlaceholderUrl(
          300,
          400,
          "Akari :(",
          "--image-placeholder-bg",
          "--image-placeholder-text"
        ),
      }),
      text: "'Oh, no... Quizás te golpeaste al caer...",
      options: [
        { text: "Confiar y descansar donde dice", nextSceneId: 102 },
        { text: "Decir que prefieres caminar un poco", nextSceneId: 101 },
      ],
    },
    6: {
      character: null,
      text: "El sendero te lleva a un pequeño arroyo...",
      options: [
        { text: "Cruzar el puente", nextSceneId: 8 },
        { text: "Beber agua del arroyo", nextSceneId: 9 },
      ],
    },
    7: {
      character: null,
      text: "Decides quedarte bajo el árbol...",
      options: [
        { text: "Cerrar los ojos y descansar", nextSceneId: 102 },
        { text: "Forzarte a levantarte de nuevo", nextSceneId: 2 },
      ],
    },
    8: {
      character: () => ({
        name: "Anciano",
        image: getPlaceholderUrl(
          300,
          400,
          "Anciano",
          "--image-placeholder-bg",
          "--image-placeholder-text"
        ),
      }),
      text: "Al otro lado del puente, un anciano te mira...",
      options: [
        { text: "Preguntar dónde estás", nextSceneId: 100 },
        { text: "Preguntar cómo salir", nextSceneId: 101 },
      ],
    },
    9: {
      character: null,
      text: "El agua es fresca y deliciosa...",
      options: [
        { text: "Luchar contra el sueño", nextSceneId: 101 },
        { text: "Dejarse llevar...", nextSceneId: 102 },
      ],
    },
    // Finales
    100: {
      character: () => ({
        name: "Jardín",
        image: getPlaceholderUrl(
          300,
          400,
          "Paz",
          "--image-placeholder-bg",
          "--image-placeholder-text"
        ),
      }),
      text: "Ya sea con Akari o el Anciano, encuentras guía...",
      options: null,
      ending: "Bueno",
    },
    101: {
      character: null,
      text: "Dudas, te alejas, o luchas...",
      options: null,
      ending: "Neutro",
    },
    102: {
      character: () => ({
        name: "???",
        image: getPlaceholderUrl(
          300,
          400,
          "Oscuridad",
          "--image-placeholder-bg",
          "--image-placeholder-text"
        ),
      }),
      text: "Confías ciegamente, te rindes al descanso...",
      options: null,
      ending: "Malo",
    },
  };

  let currentSceneId = null;

  // --- Funciones de Navegación entre Pantallas ---

  function showScreen(screenToShow) {
    // Ocultar todas las pantallas
    startScreen.classList.remove("active");
    gameScreen.classList.remove("active");
    optionsScreen.classList.remove("active");
    // Ocultar layout de juego específicamente si se oculta gameScreen
    if (screenToShow !== gameScreen) {
      gameScreen.querySelector(".game-layout").style.display = "none";
    }
    // Mostrar la pantalla deseada
    screenToShow.classList.add("active");
    // Asegurar visibilidad del layout si es la pantalla de juego
    if (screenToShow === gameScreen) {
      gameScreen.querySelector(".game-layout").style.display = "flex"; // O 'row'/'column' si es necesario anular inline style
    }
  }

  // --- Funciones del Juego ---

  function startGame() {
    showScreen(gameScreen); // Usa la función helper
    currentSceneId = 1;
    displayScene(currentSceneId);
  }

  function displayScene(sceneId) {
    const sceneData = story[sceneId];
    if (!sceneData) {
      console.error(`Escena con ID ${sceneId} no encontrada!`);
      return;
    }

    // Obtener datos del personaje (ahora es una función)
    const characterData =
      typeof sceneData.character === "function"
        ? sceneData.character()
        : sceneData.character;

    // Actualizar Imagen y Nombre
    if (characterData) {
      characterImage.src = characterData.image;
      characterImage.alt = characterData.name;
      characterNameDisplay.textContent = characterData.name;
      characterImage.style.display = "block";
      characterNameDisplay.style.display = "inline-block";
    } else {
      characterImage.src = "";
      characterImage.alt = "";
      characterNameDisplay.textContent = "";
      characterNameDisplay.style.display = "none";
    }

    // Actualizar Diálogo
    dialogueText.textContent = sceneData.text;

    // Limpiar y Añadir Opciones
    optionsContainer.innerHTML = "";
    if (sceneData.options) {
      sceneData.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.addEventListener("click", () =>
          handleOptionClick(option.nextSceneId)
        );
        optionsContainer.appendChild(button);
      });
    } else {
      // Escena final
      const endMessage = document.createElement("p");
      endMessage.textContent = `--- Fin (Resultado: ${sceneData.ending}) ---`;
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
    // Si es sakura (default), quitar el atributo
    if (themeName === "sakura") {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", themeName);
    }
    // Guardar en localStorage
    localStorage.setItem("vnTheme", themeName);

    // Opcional: Si el juego está activo, refrescar la escena actual
    // para actualizar placeholders de imágenes si usan colores del tema
    if (gameScreen.classList.contains("active") && currentSceneId !== null) {
      // Re-llama a displayScene para que recalcule la URL del placeholder
      displayScene(currentSceneId);
    }
  }

  // --- Event Listeners ---

  // Navegación
  newGameBtn.addEventListener("click", startGame);
  optionsBtn.addEventListener("click", () => showScreen(optionsScreen));
  backToStartBtn.addEventListener("click", () => showScreen(startScreen));

  // Cambio de Tema
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.getAttribute("data-theme");
      applyTheme(theme);
    });
  });

  // --- Inicialización al Cargar la Página ---

  // Aplicar tema guardado (si existe)
  const savedTheme = localStorage.getItem("vnTheme");
  if (savedTheme) {
    applyTheme(savedTheme); // Aplica el tema guardado al inicio
  }

  // Asegurarse de que solo la pantalla de inicio esté activa al principio
  showScreen(startScreen);
}); // Fin del DOMContentLoaded
