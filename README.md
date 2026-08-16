# Invitación de cumpleaños

Invitación web interactiva y responsive inspirada en la estética de *Gossip Girl*, pensada principalmente para visualizarse desde teléfonos móviles y compartirse mediante un enlace.

## Estado actual — v0.6.0

- Pantalla de apertura tipo mensaje privado de Gossip Girl.
- Portada con estética Upper East Side / Manhattan.
- Secciones editoriales tipo periódico, dossier y collage.
- Imágenes en alta resolución para fondos principales.
- Cuenta regresiva funcional con fecha provisional.
- Cielo estrellado animado y brillos sutiles en la cuenta regresiva.
- Diseño mobile-first optimizado para celular y responsive específico para escritorio 16:9.
- RSVP integrado dentro de la propia invitación.
- Formulario para nombre, asistencia, acompañante y mensaje opcional.
- Pantalla final temática: “Confirmación recibida · XOXO”.
- Preparación para guardar respuestas automáticamente en Google Sheets mediante Google Apps Script.
- Modo demo temporal mientras se configura la URL del Web App.

## Estructura

- `index.html` — estructura principal y modal RSVP.
- `css/style.css` — estilos base.
- `css/images-v03.css` — recursos visuales de alta resolución.
- `css/v04.css` — responsive, composición editorial, desktop y efectos visuales.
- `css/rsvp-v06.css` — estilos del formulario de confirmación.
- `js/main.js` — apertura, animaciones, contador y lógica RSVP.
- `google-apps-script/Code.gs` — backend preparado para guardar respuestas en Google Sheets.
- `CHANGELOG.md` — historial de versiones del proyecto.

## Sitio publicado

https://codedrago1.github.io/Invitacion-cumpleanos/

Los datos del evento actuales siguen siendo demostrativos. Para activar el guardado real de RSVP falta desplegar el Google Apps Script y colocar su URL en `RSVP_ENDPOINT` dentro de `js/main.js`.
