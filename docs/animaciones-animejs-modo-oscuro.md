# Anime.js, procesos explicados y tema oscuro

Actualizado: 29 de septiembre de 2026. Implementación en las fichas estáticas de Decolumax · San Camilo.

## Decisión técnica

Se fijó Anime.js **4.5.0**, última versión estable consultada para esta implementación; la rama 5 figuraba como beta. El paquete está instalado como dependencia de desarrollo del flujo del proyecto y se copió el bundle ESM minificado a `src/assets/vendor/anime.esm.min.js` para que Eleventy lo publique como archivo local. La licencia MIT y el aviso de copyright se conservan en `src/assets/vendor/ANIMEJS-LICENSE.md`. La animación no depende de CDN ni de una conexión a Internet al visitar GitHub Pages.

La ficha importa `createTimeline` desde ese archivo local. Según la [documentación oficial de importación por módulos](https://animejs.com/documentation/getting-started/module-imports/), este patrón usa el bundle como módulo ES. La [línea de tiempo](https://animejs.com/documentation/timeline/timeline-playback-settings/) se crea con `autoplay: false`; los botones explícitos llaman a [play](https://animejs.com/documentation/animation/animation-methods/play/), [pause](https://animejs.com/documentation/animation/animation-methods/pause/) y [restart](https://animejs.com/documentation/animation/animation-methods/restart/). No hay reproducción al entrar, bucle ni animación activada al desplazarse.

## Qué significa la guía animada

La lista completa de pasos y su contexto se entrega desde Nunjucks/JSON al generar cada página. Cada vía (semilla, esqueje, manejo de luz o identificación) puede seleccionarse; al cambiarla se carga una lámina SVG original, su crédito y su secuencia de pasos. Las ilustraciones resumen protocolos de corte, preparación basal, bandejas, mediciones y evaluación, y señalan el panel asociado al paso activo. También se puede elegir una tarjeta directamente o avanzar/anterior sin reproducir todo el recorrido. Las láminas son esquemas, no están a escala ni sustituyen las fotografías de identificación. Los datos permanecen en la página incluso con JavaScript desactivado. El movimiento es una capa de orientación: nunca revela información que estuviera oculta, sustituye mediciones ni transforma un protocolo bibliográfico en receta local.

Las fichas detallan en palabras las operaciones, cantidades, condiciones, fechas de evaluación y límites de extrapolación. En particular: supervivencia de Duranta no equivale a enraizamiento; los resultados de Lantana se separan por estudio/cultivar; y el proceso de Myoporum empieza por identificar la especie. Los valores de estudios externos no se presentan como resultados de campo de San Camilo. Ver también [Investigación de propagación por especie](investigacion-propagacion-por-especie.md).

## Accesibilidad y control

- La reproducción solo comienza cuando la persona pulsa «Reproducir pasos»; hay pausa y reinicio.
- La lista es contenido HTML ordenado, con títulos, detalles y estado comunicable (`aria-live`). Los botones usan controles nativos y son utilizables con teclado.
- Cada etapa del SVG enlaza por índice con su paso textual; la interacción cambia el contorno/énfasis del panel y la tarjeta seleccionada.
- Si `prefers-reduced-motion: reduce` está activo, los controles de movimiento se ocultan, la lista se conserva y el selector de proceso sigue disponible. Si la preferencia cambia durante la sesión, se detiene la secuencia.
- Con movimiento reducido siguen disponibles «Anterior», «Siguiente» y la selección directa de una tarjeta, porque cambian el foco de lectura sin animar.
- No se usa movimiento como única señal de estado; el texto anuncia inicio, pausa y final.
- Anime.js se carga solo en páginas de detalle de plantas.

Referencias específicas consultadas:

- [Anime.js · importar módulos](https://animejs.com/documentation/getting-started/module-imports/)
- [Anime.js · opciones de línea de tiempo](https://animejs.com/documentation/timeline/timeline-playback-settings/)
- [Anime.js · play](https://animejs.com/documentation/animation/animation-methods/play/), [pause](https://animejs.com/documentation/animation/animation-methods/pause/) y [restart](https://animejs.com/documentation/animation/animation-methods/restart/)
- [Anime.js · licencia MIT](https://github.com/juliangarnier/anime/blob/master/LICENSE.md)
- [MDN · prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

## Identidad cromática en modo oscuro

El tema oscuro es la única apariencia del sitio y se declara mediante `color-scheme: dark`, incluyendo controles nativos y la barra del navegador. Se mantienen las familias y jerarquías tipográficas Source Serif 4 (títulos), Source Sans 3 (lectura e interfaz) e IBM Plex Mono (etiquetas técnicas); los colores por planta quedan en superficies secundarias y no cambian el significado de los datos.

| Token CSS | Valor | Función |
| --- | --- | --- |
| `--paper` | `#101612` | Fondo de página |
| `--surface` | `#18211b` | Tarjetas y superficies de lectura |
| `--surface-muted` | `#232e27` | Avisos y superficie elevada |
| `--ink` | `#eef4eb` | Texto principal |
| `--muted` | `#bdc9bf` | Texto secundario |
| `--green` | `#90bd96` | Acciones, enlaces y énfasis botánico |
| `--terracotta` | `#e8a27d` | Segundo acento cálido |
| `--water` | `#82c7dc` | Indicadores asociados a humedad |
| `--line` | `#2c3a31` | Bordes y divisores |
| `--focus` | `#e8c77a` | Foco de teclado |

Los colores semánticos se centralizan en `src/assets/css/site.css`; `theme-color` usa `#101612`. Mantener texto pequeño sobre superficies con contraste suficiente y acompañar color con etiqueta, valor o icono.

## Publicación en GitHub Pages

Eleventy genera HTML estático y copia recursos locales. Las rutas de los scripts pasan por el filtro `url` para respetar el prefijo del repositorio en Pages. No se requiere servidor, API, compilación en el navegador, ni servicio externo. Tras modificar rutas o JS, comprobar que el archivo Anime.js se publica dentro de `dist/assets/vendor/` y que la ficha desplegada carga su módulo bajo el subdirectorio correcto.

## Avance y trabajo de campo pendiente

Las fichas ya ofrecen ocho recorridos entre las tres plantas y ocho láminas SVG originales: corte de Duranta, semilla de Duranta, corte de Lantana, comparación de luz, semilla de Lantana, identificación de mioporo, semilla de *M. laetum* y piloto de esquejes por confirmar. Las láminas destacan la etapa sincronizada con el texto y llevan su referencia o aviso de alcance.

Queda pendiente obtener fotografías propias del material de San Camilo, confirmar la especie del mioporo y validar condiciones ambientales, lotes y calendario con el responsable del vivero. Hasta publicar mediciones locales, los esquemas de prueba siguen siendo guías de lectura de estudios o diseños exploratorios, no protocolos certificados para producción.
