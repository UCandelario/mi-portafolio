# Mi Portafolio Web (versión accesible)

Este sitio personal incluye mejoras de **accesibilidad** alineadas a WCAG 2.2 (A/AA): regiones semánticas, enfoque visible, `skip link`, navegación por teclado, formularios con mensajes de error y `aria-live`, tablas con `caption` y `scope`, imágenes con `alt` adecuados y enlaces externos seguros (`rel="noopener"`).

## Estructura
- `index.html`: Página principal (presentación y formulario).
- `cv.html`: Currículum accesible.
- `portafolio.html`: Tabla de proyectos con encabezados.
- `styles.css`: Estilos con contraste suficiente y foco visible.
- `script.js`: Menú accesible, validación con `aria-invalid` y notificaciones en vivo.

## Consejos de validación
- Ejecuta **Lighthouse** / **axe DevTools** / **WAVE** para verificar (0 issues automáticos recomendados).
- Usa el **Contrast Checker de WebAIM** para nuevos colores o fondos.
- Prueba navegación por teclado (Tab/Shift+Tab, Enter/Espacio, Escape para cerrar el menú).

## Despliegue
Funciona en hosting estático (GitHub Pages, Netlify, Vercel). Solo sube los archivos.
