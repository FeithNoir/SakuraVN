document.addEventListener("DOMContentLoaded", () => {
  // --- Referencias a Elementos del DOM ---
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const newGameBtn = document.getElementById("new-game-btn");

  const characterImage = document.getElementById("character-image");
  const characterNameDisplay = document.getElementById("character-name");
  const dialogueText = document.getElementById("dialogue-text");
  const optionsContainer = document.getElementById("options-container");

  // --- Datos de la Historia (Simple) ---
  // Usa IDs numéricos para las escenas
  const story = {
    // Escena Inicial
    1: {
      character: {
        name: "???",
        image: "https://placehold.co/300x400/ffe0e9/5c3c45?text=Sakura",
      }, // Imagen placeholder
      text: "Despiertas bajo un cerezo en flor. Una suave brisa mece las ramas. No recuerdas cómo llegaste aquí.",
      options: [
        { text: "Intentar levantarte", nextSceneId: 2 },
        { text: "Observar los alrededores", nextSceneId: 3 },
      ],
    },
    // Rama 1: Levantarse
    2: {
      character: {
        name: "Akari",
        image: "https://placehold.co/300x400/ffb3c6/5c3c45?text=Akari",
      }, // Imagen placeholder
      text: "Al intentar ponerte de pie, una chica con un kimono rosa se acerca corriendo. '¡Oh! ¡Despertaste! ¿Te encuentras bien?'",
      options: [
        { text: "'Sí, gracias. ¿Quién eres?'", nextSceneId: 4 },
        { text: "'Me duele un poco la cabeza...'", nextSceneId: 5 },
      ],
    },
    // Rama 2: Observar
    3: {
      character: null, // Sin personaje visible aún
      text: "Miras a tu alrededor. Es un jardín hermoso, lleno de cerezos. Ves un pequeño sendero a lo lejos y escuchas el sonido de agua corriendo.",
      options: [
        { text: "Seguir el sendero", nextSceneId: 6 },
        { text: "Quedarte bajo el árbol", nextSceneId: 7 },
      ],
    },
    // Continuación Rama 1
    4: {
      // Preguntas quién es
      character: {
        name: "Akari",
        image: "https://placehold.co/300x400/ffb3c6/5c3c45?text=Akari",
      },
      text: "'Me llamo Akari. Este es el Jardín de los Sueños Efímeros. Te encontré aquí... parecías perdido.' Te ofrece una cálida sonrisa.",
      options: [
        { text: "Aceptar su ayuda", nextSceneId: 100 }, // FINAL BUENO
        { text: "Desconfiar y alejarte", nextSceneId: 101 }, // FINAL NEUTRO
      ],
    },
    5: {
      // Dices que te duele la cabeza
      character: {
        name: "Akari",
        image: "https://placehold.co/300x400/ff8fab/5c3c45?text=Akari?",
      }, // Imagen placeholder (expresión diferente?)
      text: "'Oh, no... Quizás te golpeaste al caer. Deberías descansar.' Su mirada parece un poco preocupada, quizás demasiado.",
      options: [
        { text: "Confiar y descansar donde dice", nextSceneId: 102 }, // FINAL MALO
        { text: "Decir que prefieres caminar un poco", nextSceneId: 101 }, // FINAL NEUTRO
      ],
    },
    // Continuación Rama 2
    6: {
      // Sigues el sendero
      character: null,
      text: "El sendero te lleva a un pequeño arroyo cristalino. El sonido es relajante. Ves un puente de madera cruzándolo.",
      options: [
        { text: "Cruzar el puente", nextSceneId: 8 },
        { text: "Beber agua del arroyo", nextSceneId: 9 },
      ],
    },
    7: {
      // Te quedas bajo el árbol
      character: null,
      text: "Decides quedarte bajo el árbol. La paz es agradable, pero sientes que algo no está bien. El tiempo parece detenerse.",
      options: [
        { text: "Cerrar los ojos y descansar", nextSceneId: 102 }, // FINAL MALO
        { text: "Forzarte a levantarte de nuevo", nextSceneId: 2 }, // Vuelve a la otra rama
      ],
    },
    // Continuación Rama 2.1
    8: {
      // Cruzas el puente
      character: {
        name: "Anciano",
        image: "https://placehold.co/300x400/e0e0e0/5c3c45?text=Anciano",
      }, // Imagen placeholder
      text: "Al otro lado del puente, un anciano te mira con sabiduría. 'Bienvenido al corazón del jardín, viajero perdido. ¿Buscas respuestas?'",
      options: [
        { text: "Preguntar dónde estás", nextSceneId: 100 }, // FINAL BUENO
        { text: "Preguntar cómo salir", nextSceneId: 101 }, // FINAL NEUTRO
      ],
    },
    9: {
      // Bebes agua
      character: null,
      text: "El agua es fresca y deliciosa. Sin embargo, sientes cómo tus párpados pesan y una somnolencia profunda te invade.",
      options: [
        { text: "Luchar contra el sueño", nextSceneId: 101 }, // FINAL NEUTRO
        { text: "Dejarse llevar...", nextSceneId: 102 }, // FINAL MALO
      ],
    },

    // --- Finales ---
    100: {
      // FINAL BUENO
      character: {
        name: "Jardín",
        image: "https://placehold.co/300x400/ffe0e9/5c3c45?text=Paz",
      },
      text: "Ya sea con Akari o el Anciano, encuentras guía. Comprendes que este jardín es un reflejo de tu paz interior. Te sientes renovado y, al cerrar los ojos, despiertas suavemente en tu cama. FIN (Bueno)",
      options: null, // Indica final
      ending: "Bueno",
    },
    101: {
      // FINAL NEUTRO
      character: null,
      text: "Dudas, te alejas, o luchas por mantener el control. El jardín se desvanece lentamente, dejándote con más preguntas que respuestas. Despiertas sintiéndote confundido, como si hubieras olvidado un sueño importante. FIN (Neutro)",
      options: null,
      ending: "Neutro",
    },
    102: {
      // FINAL MALO
      character: {
        name: "???",
        image: "https://placehold.co/300x400/5c3c45/ffe0e9?text=Oscuridad",
      },
      text: "Confías ciegamente, te rindes al descanso o bebes sin pensar. La somnolencia te vence. El hermoso jardín se torna oscuro y silencioso. Te has perdido en el sueño... quizás para siempre. FIN (Malo)",
      options: null,
      ending: "Malo",
    },
  };

  let currentSceneId = null;

  // --- Funciones del Juego ---

  function startGame() {
    startScreen.classList.remove("active");
    gameScreen.classList.add("active");
    // Asegura que el layout principal sea visible y flex
    gameScreen.style.display = "flex";
    gameScreen.querySelector(".game-layout").style.display = "flex";

    currentSceneId = 1; // Empezar en la escena 1
    displayScene(currentSceneId);
  }

  function displayScene(sceneId) {
    const scene = story[sceneId];
    if (!scene) {
      console.error(`Escena con ID ${sceneId} no encontrada!`);
      return;
    }

    // Actualizar Imagen y Nombre del Personaje
    if (scene.character) {
      characterImage.src = scene.character.image;
      characterImage.alt = scene.character.name;
      characterNameDisplay.textContent = scene.character.name;
      characterImage.style.display = "block"; // Muestra la imagen
      characterNameDisplay.style.display = "inline-block"; // Muestra el nombre
    } else {
      characterImage.src = ""; // Limpia imagen
      characterImage.alt = "";
      characterNameDisplay.textContent = "";
      // characterImage.style.display = 'none'; // Oculta si no hay personaje
      characterNameDisplay.style.display = "none"; // Oculta nombre
    }

    // Actualizar Texto del Diálogo
    dialogueText.textContent = scene.text;

    // Limpiar Opciones Anteriores
    optionsContainer.innerHTML = "";

    // Añadir Nuevas Opciones (si existen)
    if (scene.options) {
      scene.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.classList.add("option-button"); // Puedes añadir clase si necesitas estilo específico
        button.addEventListener("click", () =>
          handleOptionClick(option.nextSceneId)
        );
        optionsContainer.appendChild(button);
      });
    } else {
      // Es una escena final
      const endMessage = document.createElement("p");
      endMessage.textContent = `--- Fin de la Aventura (Resultado: ${scene.ending}) ---`;
      endMessage.style.fontWeight = "bold";
      endMessage.style.marginTop = "2rem";
      endMessage.style.textAlign = "center";
      optionsContainer.appendChild(endMessage);

      // Opcional: Botón para volver a jugar
      const playAgainButton = document.createElement("button");
      playAgainButton.textContent = "Jugar de Nuevo";
      playAgainButton.style.marginTop = "1rem";
      playAgainButton.addEventListener("click", () => {
        // La forma más simple de reiniciar es recargar la página
        window.location.reload();
        // O podrías llamar a startGame() pero necesitarías resetear estados si el juego fuera más complejo
      });
      optionsContainer.appendChild(playAgainButton);
    }
  }

  function handleOptionClick(nextSceneId) {
    currentSceneId = nextSceneId;
    displayScene(currentSceneId);
  }

  // --- Event Listeners ---
  newGameBtn.addEventListener("click", startGame);
}); // Fin del DOMContentLoaded
