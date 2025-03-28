# Sakura VN Prototype 🌸

Un prototipo simple de Novela Visual (VN) creada con HTML, CSS y JavaScript puro, con una estética inspirada en los cerezos en flor (sakura) y un enfoque "mobile-first".

Inspirado por las Aventuras Gráficas/Novelas Visuales de la NES, Sakura VN ofrece una experiencia minimalista un poco más enfocada al texto que a la parte gráfica.

## Descripción

Este proyecto es un punto de partida para crear novelas visuales interactivas directamente en el navegador. Presenta una interfaz limpia con colores pastel, manejo básico de escenas, diálogos y elecciones que llevan a diferentes finales. Está construido sin dependencias externas, utilizando tecnologías web estándar. **La historia se carga desde un archivo `story.json` externo y permite al jugador introducir su nombre al inicio.**

## ✨ Características Principales

*   **Estética Sakura:** Paleta de colores pastel (rosados, blancos) y elementos de UI con bordes redondeados.
*   **Temas de Color:** Permite elegir entre varias paletas de colores (Sakura, Cian, Amarillo, Verde, Oscuro) desde el menú de opciones, guardando la preferencia.
*   **Responsive Design (Mobile First):** La interfaz se adapta a diferentes tamaños de pantalla.
*   **Pantalla de Inicio:** Menú básico con opción "Nuevo Juego" y "Opciones" funcionales.
*   **Introducción de Nombre:** Solicita al jugador introducir su nombre antes de comenzar la partida.
*   **Pantalla de Juego:** Layout adaptable que muestra personaje, nombre, diálogo y opciones.
*   **Historia Externa:** La narrativa (escenas, diálogos, opciones) se carga desde `story.json`, facilitando su edición.
*   **Lógica de Historia Simple:** Contiene una narrativa corta con múltiples elecciones que conducen a 3 finales distintos. El nombre del jugador se puede insertar en el diálogo usando `[PLAYER_NAME]`.
*   **Tecnología Pura:** Desarrollado únicamente con HTML5, CSS3 y Vanilla JavaScript (ES6+).
*   **Unidades `rem`:** Utiliza `rem` para el dimensionamiento (`1rem = 10px`).
*   **Clases Utilitarias CSS:** Incluye `.row` y `.column`.

## 🚀 Cómo Empezar

1.  **Clona o descarga el repositorio.**
2.  **Navega a la carpeta del proyecto.**
3.  **Inicia un servidor web local:** Debido a que el juego carga `story.json` usando `fetch`, necesitas un servidor local para evitar errores de CORS al abrir `index.html` directamente desde el sistema de archivos.
    *   **Si tienes Python 3:** Abre una terminal en la carpeta y ejecuta `python -m http.server`
    *   **Si tienes Node.js:** Puedes instalar `serve` (`npm install -g serve`) y ejecutar `serve` en la carpeta.
    *   **Usuarios de VS Code:** La extensión "Live Server" es una excelente opción.
4.  **Abre tu navegador** y ve a la dirección proporcionada por tu servidor local (normalmente `http://localhost:8000` o similar).

*(Nota: El servidor local es solo para desarrollo. Al desplegar en plataformas como GitHub Pages, que sirven archivos estáticos, funcionará directamente sin necesidad de un servidor adicional.)*

## 🛠️ Especificaciones Técnicas

*   **Frontend:**
    *   HTML5 (Semántico)
    *   CSS3 (Flexbox, Custom Properties, Media Queries, `rem`)
    *   JavaScript (Vanilla ES6+, Manipulación del DOM, `fetch` API para JSON, `localStorage` para tema)
*   **Datos:**
    *   `story.json` (Estructura de la historia)

## 📝 Tareas Pendientes (To-Do)

*   [ ] **Implementar Menú:** Hacer funcionales "Cargar" y "Acerca de".
*   [ ] **Sistema de Guardado/Carga:**
    *   [ ] Guardado local (`localStorage` o `IndexedDB`) del progreso (escena actual, nombre, ¿flags?).
    *   [ ] Múltiples ranuras de guardado.
*   [ ] **Pantalla de Opciones:**
    *   [ ] Control de volumen (Música, SFX).
    *   [ ] Velocidad del texto.
    *   [ ] Opción para saltar texto leído.
*   [ ] **Mejoras Visuales:**
    *   [ ] Animaciones/Transiciones CSS.
    *   [ ] Fondos de escena variables.
    *   [ ] Soporte para expresiones de personaje.
    *   [ ] Cursor personalizado.
*   [ ] **Audio:**
    *   [ ] Música de fondo (BGM).
    *   [ ] Efectos de sonido (SFX).
*   [ ] **Complejidad de la Historia:**
    *   [ ] Sistema de "flags" para decisiones.
*   [ ] **Mejoras de Código:**
    *   [ ] Refactorizar JS en módulos/clases.
    *   [ ] Mejor validación de nombre.
*   [ ] **Accesibilidad (a11y).**

## 🧑‍💻 Autor

*   **Feith Noir**
    *   GitHub: [FeithNoir](https://github.com/FeithNoir)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. (Puedes añadir un archivo LICENSE.md).