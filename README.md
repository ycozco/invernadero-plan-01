# Decolumax · San Camilo

Micrositio editorial para documentar un piloto de propagación experimental. La portada presenta el proyecto; el catálogo conduce a páginas independientes por planta, con estado de identificación, preguntas, procedimiento de registro, mediciones por evaluar y fuentes relacionadas.

## Desarrollo

Requiere Node.js 22 o superior. Eleventy genera el sitio estático para GitHub Pages:

```bash
npm ci
npm run dev
npm run build
```

El build escribe a `dist/`. Para comprobar el prefijo de un repositorio de proyecto:

```powershell
$env:SITE_PATH_PREFIX = '/invernadero-plan-01/'
npm run build
```

Las vistas públicas funcionan como archivos estáticos: no requieren servidor Node en producción. El workflow de GitHub Actions genera y publica `dist/`.

## Añadir una planta

1. Agregar un objeto a `src/_data/plants.json` con un `slug` único, nombres, estado de identificación, preguntas, procedimiento y mediciones.
2. Añadir a `sourceIds` únicamente fuentes que respalden el alcance descrito y registrar esas fuentes en `src/_data/sources.json`.
3. Para una fotografía, colocar el archivo en `src/assets/images/plants/` e incluir texto alternativo, autor, origen y licencia en el objeto `image`.
4. Ejecutar `npm run build`. Eleventy crea automáticamente `/plantas/<slug>/` desde la plantilla compartida.

La identidad del sitio se configura en `src/_data/site.json`; las plantillas y estilos están en `src/_includes/` y `src/assets/css/site.css`.

## Contenido y alcance

- Duranta y Lantana incluyen fotos botánicas de referencia con autor y licencia atribuidos. No son documentación fotográfica del piloto.
- Myoporum se mantiene como `Myoporum sp.` hasta resolver su identificación; la fuente de taxonomía no respalda una especie local concreta.
- No se publican resultados locales ni lecturas de sensores. La página de mediciones declara esta ausencia.
- Las fuentes se comparten desde un único archivo de datos y se muestran en la página general y en las fichas pertinentes.
- El movimiento es decorativo o explicativo, se limita a un diagrama y respeta `prefers-reduced-motion`.
- Las fuentes tipográficas WOFF2 se sirven localmente; sus licencias OFL se conservan en `src/assets/fonts/licenses/`.

## Investigación y decisiones

- [Plan de identidad y arquitectura](docs/plan-identidad-y-arquitectura.md)
- [Referencias técnicas, visuales y de implementación](docs/referencias-y-busqueda.md)

## GitHub Pages

El workflow está en [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). En **Settings → Pages**, selecciona **GitHub Actions** como fuente. El `pathPrefix` se define mediante `SITE_PATH_PREFIX` para que enlaces, imágenes y metadatos funcionen bajo el subdirectorio del repositorio.
