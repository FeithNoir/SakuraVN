# Sakura VN Prototype 🌸

Un prototipo simple de Novela Visual (VN)/Aventura Gráfica  creada con HTML, CSS y JavaScript puro, con una estética inspirada en los cerezos en flor (sakura) y un enfoque "mobile-first".

Inspirado por las Aventuras Gráficas/Novelas Visuales de la NES, Sakura VN ofrece una experiencia minimalista un poco más enfocada al texto que a la parte gráfica.

## Descripción

Este proyecto es un punto de partida para crear novelas visuales interactivas directamente en el navegador. Presenta una interfaz limpia con colores pastel, manejo básico de escenas, diálogos y elecciones que llevan a diferentes finales. Está construido sin dependencias externas, utilizando tecnologías web estándar.

## ✨ Características Principales

*   **Estética Sakura:** Paleta de colores pastel (rosados, blancos) y elementos de UI con bordes redondeados.
*   **Responsive Design (Mobile First):** La interfaz se adapta a diferentes tamaños de pantalla, priorizando la experiencia en móviles.
*   **Pantalla de Inicio:** Menú básico con opción "Nuevo Juego" funcional.
*   **Pantalla de Juego:** Layout adaptable (columna en móvil, fila en escritorio) que muestra:
    *   Área de personaje (imagen y nombre).
    *   Área de diálogo y opciones.
*   **Lógica de Historia Simple:** Contiene una narrativa corta con múltiples elecciones que conducen a 3 finales distintos (Bueno, Malo, Neutro).
*   **Tecnología Pura:** Desarrollado únicamente con HTML5, CSS3 y Vanilla JavaScript (ES6+).
*   **Unidades `rem`:** Utiliza `rem` para el dimensionamiento, con `1rem = 10px` establecido en el HTML para facilitar los cálculos.
*   **Clases Utilitarias CSS:** Incluye clases genéricas como `.row` y `.column` para aplicar estilos Flexbox rápidamente.

## 🚀 Cómo Empezar

1.  **Clona o descarga el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    # O descarga el archivo ZIP
    ```
2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd vn-sakura-proto
    ```
3.  **Abre el archivo `index.html` en tu navegador web.** ¡Y listo! Puedes empezar a jugar.

## 🛠️ Especificaciones Técnicas

*   **Frontend:**
    *   HTML5 (Semántico)
    *   CSS3 (Flexbox, Custom Properties/Variables, Media Queries, `rem` units)
    *   JavaScript (Vanilla ES6+, Manipulación del DOM, Lógica de escenas simple)

## 📝 Tareas Pendientes (To-Do)

*   [ ] **Implementar Menú:** Hacer funcionales los botones "Cargar", "Opciones" y "Acerca de".
*   [ ] **Sistema de Guardado/Carga:**
    *   [ ] Guardado local simple (usando `localStorage`).
    *   [ ] Múltiples ranuras de guardado.
*   [ ] **Pantalla de Opciones:**
    *   [ ] Control de volumen (Música, Efectos de Sonido).
    *   [ ] Velocidad del texto.
    *   [ ] Opción para saltar texto leído.
*   [ ] **Mejoras Visuales:**
    *   [ ] Animaciones/Transiciones CSS sutiles para diálogos, aparición de personajes, etc.
    *   [ ] Fondos de escena (Backgrounds) variables.
    *   [ ] Soporte para diferentes expresiones del mismo personaje (cambiar imagen).
    *   [ ] Cursor personalizado con temática Sakura (si se encuentran/crean los assets).
*   [ ] **Audio:**
    *   [ ] Música de fondo (BGM).
    *   [ ] Efectos de sonido (SFX) para clics, elecciones, etc.
*   [ ] **Complejidad de la Historia:**
    *   [ ] Sistema de "flags" o variables para rastrear decisiones pasadas y afectar diálogos/rutas futuras.
    *   [ ] Estructura de historia más compleja y larga.
*   [ ] **Mejoras de Código:**
    *   [ ] Refactorizar JS en módulos o clases para mejor organización.
    *   [ ] Optimizar rendimiento si la historia crece mucho.
*   [ ] **Accesibilidad (a11y):**
    *   [ ] Mejorar navegación por teclado.
    *   [ ] Asegurar buen contraste de colores.
    *   [ ] Uso de atributos ARIA donde sea necesario.

## 🧑‍💻 Autor

*   **Feith Noir**
    *   GitHub: [FeithNoir](https://github.com/FeithNoir)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles (puedes añadir un archivo LICENSE.md si lo deseas).