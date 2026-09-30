# Plan de investigación, identidad y arquitectura del sitio

Fecha: 28 de septiembre de 2026 · Versión: propuesta 1.0

Estado: implementación de fichas y primera revisión visual adaptable completadas; quedan verificaciones de accesibilidad, contraste, enlaces y publicación. No implica que existan conexiones a sensores ni datos experimentales reales. La investigación por especie está en [Investigación de propagación](investigacion-propagacion-por-especie.md).

## Avance de fichas y distribución · 29 de septiembre de 2026

Se corrigió la distribución observada en escritorio: el lienzo general pasó de 1240 px a 1840 px, y el contenido de las fichas ahora crece junto al viewport en vez de quedar fijado en 760 px. En escritorio la barra de ficha mantiene su columna propia y los métodos y fuentes se disponen en tarjetas; en móvil regresan a una columna. Se limitaron las líneas de lectura de los párrafos y del procedimiento para conservar legibilidad dentro del lienzo ampliado.

La ficha común incorporó una sección que separa semilla, esquejes, condiciones del estudio, resultado y límite de aplicación. Duranta muestra el ensayo de Shiri et al. y la referencia secundaria de semilla; Lantana presenta germinación y esquejes del cultivar estudiado; Mioporum deja explícito qué evidencia pertenece solo a *M. laetum* y qué guías son genéricas. La fotografía comparativa de Myoporum lleva crédito y licencia CC BY 4.0 y no se presenta como identificación del ejemplar local. La plantilla y los datos siguen siendo reutilizables al añadir especies.

**Verificación de esta iteración:** compilación de Eleventy con el prefijo `/invernadero-plan-01/`; revisión visual local de Mioporum en escritorio y de ficha/métodos en móvil; comprobación de que el documento no desborda horizontalmente a 390 px. Esto comprueba el build y la vista local, no confirma el despliegue de GitHub Pages ni valida las condiciones en San Camilo.

**Pendiente:** obtener fotos diagnósticas de la planta madre de Mioporum y confirmar su especie; decidir los protocolos locales antes de llamarlos recetas; incorporar mediciones y resultados de campo cuando existan; revisar contraste, teclado, foco, enlaces y rendimiento; comprobar la página desplegada después de publicar.

## Avance de implementación · 28 de septiembre de 2026

**Hecho en esta iteración:** Eleventy genera `dist/` y acepta `SITE_PATH_PREFIX`; se crearon portada y rutas propias para catálogo, Duranta, Lantana, Myoporum sp., módulo, método, mediciones y evidencia. La identidad Decolumax · San Camilo se centralizó en `src/_data/site.json`. Plantas y referencias viven en archivos de datos separados; las fichas se generan desde una plantilla común. El workflow de Pages compila con `/invernadero-plan-01/` y publica solo `dist/`.

La dirección visual está expresada en `src/assets/css/site.css`: papel cálido, verde botánico y terracota; Source Serif 4, Source Sans 3 e IBM Plex Mono locales; jerarquía editorial adaptable; fotografías de referencia con créditos y licencias; movimiento explicativo en el diagrama y soporte de `prefers-reduced-motion`. La ficha se amplió para aprovechar el ancho disponible y presentar métodos en tarjetas comparables. El contenido señala cuando la identificación, el protocolo o las mediciones locales no están confirmados.

**Pendiente:** contrastar la evidencia completa por especie y las fuentes aún candidatas; confirmar ubicación, protocolo aprobado, sensores y datos de campo; identificar Myoporum a nivel de especie y consultar si existe manual/logotipo que preservar; sustituir imágenes de referencia por fotos del piloto si se obtienen; revisar interacción, contraste, teclado, tamaños, rendimiento y enlaces en móvil y escritorio; confirmar configuración y resultado real de Pages. Las fotos actuales no documentan el piloto.

**Mapa del proyecto:** `src/index.njk` (portada), `src/plantas/index.njk` (catálogo), `src/plantas.njk` (generador de fichas), `src/_data/` (identidad, plantas y fuentes), `src/_includes/` (layout y tarjeta), `src/assets/` (estilos, interacción, tipografías e imágenes), `.github/workflows/deploy-pages.yml` (compilación y despliegue). Para sumar una planta se añade su registro, referencias y recursos; la plantilla genera su página.

## 1. Objetivo y decisiones de partida

Convertir el micrositio en una estación experimental botánica digital: reconocible, legible, sustentada y ampliable. La portada presenta el proyecto; el catálogo permite explorar plantas; cada planta tiene una página completa con URL propia.

- Dirección visual: botánica editorial + ingeniería de campo. Fotografías, tipografía editorial, cortes técnicos y tablas explicativas.
- Nombre confirmado por el usuario: **Decolumax · San Camilo**. Decolumax lidera la firma; San Camilo identifica el proyecto o sede. Descriptor: «Propagación experimental». El código actual mezcla otras denominaciones: la migración las unificará y centralizará el nombre en configuración.
- Publicación: **GitHub Pages**, con HTML generado durante el build. Node se usaría para construir, no como servidor en producción.
- Arquitectura implementada: Eleventy + datos JSON centralizados + plantillas Nunjucks + CSS compartido + JavaScript progresivo; Markdown queda habilitado para contenido futuro.
- La lectura, navegación y bibliografía funcionan sin JavaScript. Los filtros y diagramas añaden interacción.
- Cada planta nueva se incorpora como contenido y recursos gráficos; no exige editar condicionales en `script.js` ni copiar un HTML entero.
- Se diferencian siempre: evidencia publicada, propuesta local, observación local y demostración simulada.

## 2. Auditoría inicial y problemas que resolver

La inspección realizada es de código y documentación; la evaluación visual en navegadores será parte de la fase de prototipo.

| Hallazgo en el proyecto | Decisión de rediseño |
| --- | --- |
| Una sola página con seis secciones extensas y fichas que cambian por JavaScript | Portada breve, catálogo y rutas de detalle reales |
| `speciesData` reúne textos, HTML y comportamiento | Contenido estructurado independiente de la presentación |
| Fondos oscuros, resplandores y tarjetas repetidas | Superficies claras, ritmo editorial y área de mediciones diferenciada |
| Muchas etiquetas de 9–11 px | Escala mínima legible y jerarquía explícita |
| Contenedores con `max-width: 100%` | Ancho máximo de contenido y longitud de lectura controlada |
| Etiquetas «Online» y «en vivo» con lecturas generadas | Estado de datos visible y consistente en cada vista |
| Curvas SVG prefijadas independientes de las lecturas | Gráficos derivados de una misma serie, con ejes, unidades y fechas |
| Movimiento reducido solo cambia el desplazamiento suave | Aplicarlo también a animaciones, transiciones y diagramas |
| S3 se llama «Pumita + Coco» pero contiene arena | Nombres y composición generados desde los mismos datos |
| Sustrato dibujado como capas | Aclarar que representa proporciones; no indicar accidentalmente una receta por capas |
| Myoporum figura solo a nivel de género | Mantener identificación pendiente hasta verificar la especie |

## 3. Plan de investigación

La búsqueda debe responder preguntas que cambien una decisión del sitio. Cada hallazgo registra URL, autor, año, consulta, fragmento o página pertinente, alcance, limitaciones y aplicación propuesta.

| Línea | Qué buscar | Entregable | Condición para cerrar |
| --- | --- | --- | --- |
| Identidad y contexto | Nombre del proyecto, relación con Decolumax, público principal, ubicación, fase real del piloto | Ficha de identidad de una página | Nombre consistente y afirmaciones del proyecto clasificadas como existentes o propuestas |
| Referencias visuales | Catálogos botánicos, publicaciones de campo, planos y guías técnicas | 6–8 referencias comentadas con patrones útiles | Cada referencia explica qué adaptar y en qué pantalla |
| Taxonomía y contenido | Nombre aceptado, cultivar, identificación y rasgos de cada planta | Ficha de identidad por planta | Incertidumbres visibles; no convertir «mioporo» en una especie por inferencia |
| Propagación | Tipo de esqueje, tratamiento, dosis y exposición, medio, clima, duración, tamaño de muestra y resultados | Matriz de evidencia por especie | Cada cifra publicada tiene fuente aplicable o está marcada como hipótesis local |
| Ambiente local | Estación representativa, altitud, estacionalidad, radiación si existe, agua y materiales disponibles | Perfil de condiciones y datos faltantes | Periodo, procedencia y representatividad explícitos |
| Animación e interacción | Ejemplos SVG, microinteracciones, teclado, movimiento reducido y carga | Tres pruebas pequeñas comparables | Se elige una solución por utilidad, accesibilidad y peso medido |
| Arquitectura y publicación | Rutas estáticas, base path, contenido, imágenes, metadatos y CI | Prueba de portada + catálogo + ficha | Una ficha abre directamente y al recargar bajo el subdirectorio del repositorio |

### Método de selección

1. Buscar en fuentes primarias y extensión universitaria; buscar tesis peruanas como complemento contextual.
2. Registrar contradicciones y diferencias entre especies, etapas y condiciones experimentales.
3. Separar resultados de un estudio, interpretación y decisión del piloto. Una temperatura usada en un experimento no se convierte automáticamente en recomendación óptima.
4. Vincular citas a la afirmación concreta. La bibliografía al final complementa esa trazabilidad.
5. Para imágenes y código: registrar origen, licencia y modificaciones del recurso específico. La licencia de un repositorio no cubre automáticamente sus fotos o ejemplos externos.
6. Para referencias visuales: inspeccionar escritorio y móvil; registrar jerarquía, navegación y comportamiento. Los enlaces iniciales han sido revisados documentalmente, no constituyen aún una auditoría visual completa.

### Investigación agronómica prioritaria

- **Duranta:** revisar el estudio de Shiri y colaboradores, incluyendo método de aplicación de IBA; contrastarlo con la tesis peruana de 2026 localizada en la UNC. La tesis queda como candidata hasta leer metodología y resultados completos.
- **Lantana:** localizar trabajos de enraizamiento. La referencia actual sobre calentamiento e invasividad no establece por sí sola el protocolo óptimo del esqueje.
- **Mioporo:** resolver identificación y luego investigar protocolos de esa especie. Mientras tanto, usar `Myoporum sp.` y estado «identificación pendiente».
- **Microclima:** evaluar cómo explicar temperatura, HR, déficit de presión de vapor y humedad del sustrato. Si el VPD se calcula solo con aire, identificarlo como VPD del aire; no confundirlo con el gradiente hoja–aire.
- **Sustratos y agua:** documentar volumen, granulometría, pH, CE y método de medida. No comparar CE de métodos distintos como si fueran equivalentes.
- **Ensayo:** verificar distribución de los 180 esquejes, controles, repeticiones y calendario. Evitar prometer cruces de tratamientos que el tamaño real de muestra no permite evaluar razonablemente.

## 4. Identidad de marca propuesta

### Personalidad y lenguaje

Tres atributos: **precisa, cercana, vinculada al lugar**. Los textos describen qué se hace, por qué y qué falta comprobar. Usar español natural, nombres científicos en cursiva y unidades junto a cada cifra.

- Nombre visible: «Decolumax · San Camilo», con descriptor «Propagación experimental». En la firma, Decolumax ocupa el primer nivel y San Camilo el segundo; la versión de texto completo conserva ambos.
- Mensaje: «Observar, propagar y registrar».
- Encabezado de portada: «Propagación vegetal en San Camilo».
- Introducción propuesta: «Un módulo piloto para comparar tratamientos y sustratos, registrar el microclima y evaluar el enraizamiento antes de ampliar la producción». Añadir cantidades solo tras confirmar su estado.
- Botones: «Explorar plantas», «Conocer el módulo», «Consultar evidencia».
- Evitar calificativos de certeza como «óptimo», «garantizado», «activo» o «en vivo» sin datos que los sostengan.

### Firma gráfica y recursos distintivos

- Diseñar una firma tipográfica y un símbolo SVG original: sección de cubierta + esqueje + línea de suelo, legible a 24 px y en una sola tinta.
- Versiones horizontal, compacta y monocromática. El área libre alrededor del símbolo será al menos un cuarto de su altura.
- Motivos propios: numeración de muestras, líneas de cota, marcas discretas de escala y pies de figura. Usarlos donde aportan información.
- Iconos utilitarios de una única familia, 20–24 px y grosor coherente. El logotipo se diseña aparte.
- El color de una planta puede aparecer en una pequeña etiqueta; cada ficha conserva la misma identidad general.

## 5. Sistema de color que debe respetarse

Los valores visuales se centralizan como propiedades semánticas en `:root` de `src/assets/css/site.css`. Los componentes consumen variables compartidas; los colores locales restantes corresponden a superficies, diagramas o estados que pueden consolidarse durante el refinamiento.

| Token propuesto | Color | Uso |
| --- | --- | --- |
| `--paper` | `#101612` | Fondo oscuro principal |
| `--surface` | `#18211b` | Superficies de lectura |
| `--surface-muted` | `#232e27` | Avisos y planos elevados |
| `--ink` | `#eef4eb` | Texto y encabezados |
| `--muted` | `#bdc9bf` | Texto secundario |
| `--green` | `#90bd96` | Marca, enlaces y acción principal |
| `--terracotta` | `#e8a27d` | Acento cálido para detalles |
| `--water` | `#82c7dc` | Humedad/agua, con etiqueta de variable |
| `--line` | `#2c3a31` | Separación y bordes |
| `--focus` | `#e8c77a` | Foco visible de teclado |

Proporción visual orientativa: 75% neutros oscuros, 20% verde/grafito y 5% acentos. No se aplica como fórmula a las fotografías. La implementación y el criterio de contraste se documentan en [Anime.js, procesos explicados y tema oscuro](animaciones-animejs-modo-oscuro.md).

Contrastes calculados con luminancia relativa para colores sólidos sobre `#F4F0E6`: tinta 13.15:1, texto secundario 5.61:1, verde 8.61:1, terracota oscuro 6.00:1, azul 5.72:1, advertencia 5.29:1 y error 5.89:1. Papel sobre verde: 8.61:1.

El terracota claro alcanza 3.96:1 sobre papel: **no usarlo para texto normal**. Estas parejas verificadas no sustituyen la prueba de todos los estados reales. Mantener contraste mínimo de texto normal de 4.5:1 y de texto grande de 3:1 según WCAG; controles, foco y gráficos requieren su propia revisión. Referencias en [el catálogo](referencias-y-busqueda.md).

## 6. Tipografía, tamaños y espaciado

Familias propuestas: **Source Serif 4** para títulos editoriales, **Source Sans 3** para lectura e interfaz, **IBM Plex Mono** para códigos y mediciones. Alojar WOFF2 localmente, conservar licencias y usar `font-display: swap`. Cargar Mono solo donde se necesita y medir el coste de todas las variantes.

| Rol | Escritorio | Móvil | Peso / interlineado |
| --- | --- | --- | --- |
| H1 portada | 56–64 px | 36–40 px | Serif 500–600 / 1.08 |
| H1 ficha | 48–56 px | 34–40 px | Serif 500–600 / 1.12 |
| H2 sección | 36–40 px | 28–32 px | Serif 500–600 / 1.18 |
| H3 componente | 22–24 px | 20–22 px | Sans 600 / 1.3 |
| Introducción | 20 px | 18 px | Sans 400 / 1.55 |
| Párrafo | 18 px | 17 px | Sans 400 / 1.65 |
| Navegación y botón | 16 px | 16 px | Sans 600 / 1.3 |
| Pie, etiqueta y fuente | 14 px | 14 px | Sans 400–600 / 1.5 |
| Lectura destacada | 36–44 px | 30–36 px | Mono 500 / 1.15 |

- Implementar tamaños fluidos con `clamp()` y unidades relativas; verificar zoom y aumento de texto. Los px de la tabla son objetivos visuales, no tamaños rígidos obligatorios.
- Un H1 por página. La jerarquía HTML responde al contenido y no se elige por tamaño visual.
- Párrafos de 55–70 caracteres por línea; ancho máximo de lectura de 65ch.
- Evitar saltos `<br>` impuestos en títulos que fallen en móvil; permitir ajuste natural.
- Espaciado: escala 4, 8, 12, 16, 24, 32, 48, 64 y 96 px. Separación entre secciones 80–96 px en escritorio, 48–64 px en móvil.
- Contenedor máximo 1280 px; márgenes laterales fluidos de 20 a 64 px. Retícula de 12 columnas, 8 en tableta y 4 en móvil.
- Bordes de 1 px, radios 4/8/12 px; sombras discretas solo si explican elevación o interacción.
- Botones de al menos 44 px de alto como criterio del proyecto; enlaces en párrafos mantienen su presentación textual.

## 7. Mapa de páginas y navegación

Las rutas siguientes se expresan relativas a la raíz lógica del sitio. En GitHub Project Pages deben incluir el prefijo del repositorio.

| Ruta | Función | Contenido principal |
| --- | --- | --- |
| `/` | Presentación | Problema, módulo, plantas y método |
| `/plantas/` | Catálogo ampliable | Buscar, filtrar y abrir fichas |
| `/plantas/duranta-erecta/` | Detalle de Duranta | Identificación, protocolo, evidencia y seguimiento |
| `/plantas/lantana-camara/` | Detalle de Lantana | Misma estructura, contenido específico |
| `/plantas/mioporo/` | Detalle provisional | Identificación pendiente y límites del protocolo |
| `/modulo/` | Ingeniería | Planta, corte, componentes, sensores y operación |
| `/metodo/` | Sustento técnico | Microclima, sustratos y diseño del ensayo |
| `/mediciones/` | Datos y demostración | Series, procedencia, estado y eventos |
| `/evidencia/` | Fuentes trazables | Fuentes vinculadas a especies y decisiones |
| `/404.html` | Recuperación | Volver al catálogo o inicio, con enlaces que respetan el prefijo |

Navegación principal: Proyecto, Plantas, Módulo, Método y Mediciones. Evidencia accesible desde las fichas, el método y el pie. En móvil: menú expandible con botón, estado accesible y orden de foco natural.

Una tarjeta del catálogo abre la ficha en la **misma pestaña, como nueva página**. No reemplazar el detalle por modal, pestaña dinámica o parámetro `?planta=`. Permitir copiar el enlace y usar atrás/adelante del navegador normalmente.

### Portada: secuencia y disposición

| Orden | Título propuesto | Disposición |
| --- | --- | --- |
| 1 | Propagación vegetal en San Camilo | Texto 5 columnas + fotografía o corte técnico 7 columnas; dos acciones como máximo |
| 2 | Un piloto con preguntas concretas | Tres datos del proyecto, con estado «propuesto» o «registrado» |
| 3 | Plantas del ensayo | Tres avances con fotografía, nombre, estado y enlace; colección automática |
| 4 | Cómo funciona el módulo | Un corte dominante con 4–6 puntos explicativos y enlace al detalle |
| 5 | Qué vamos a comparar | Secuencia breve: material → tratamiento → sustrato → evaluación |
| 6 | Qué sabemos y qué falta validar | Evidencia representativa y preguntas abiertas |
| 7 | Registro del proyecto | Último registro real, o explicación transparente del estado de demostración |

No replicar los protocolos completos en portada. Alternar imagen, texto, comparación y diagrama para dar ritmo. En móvil conservar el orden de lectura y reducir columnas, sin carruseles obligatorios.

### Ficha de planta: plantilla reusable

1. Migas: Inicio → Plantas → Nombre.
2. Cabecera: nombre común, nombre científico, fotografía identificada, resumen de 40–70 palabras y estado de revisión.
3. Ficha rápida: identificación, material vegetal, etapa, estado del protocolo y fecha de actualización. No rellenar datos faltantes con valores genéricos.
4. Índice local: Identificación, Propagación, Ambiente, Sustrato, Seguimiento y Fuentes.
5. Identificación: planta completa, hoja, nudo y flor cuando haya material; pies de foto con procedencia.
6. Protocolo: pasos numerados y momentos de decisión, con un esquema o fotografía por paso cuando aporte información.
7. Condiciones y tratamientos: tabla de parámetro, valor/unidad, etapa, procedencia y estado de validación.
8. Sustratos comparados: composición por volumen y propiedades medidas o pendientes; evitar escalas inventadas de «aireación 90%».
9. Seguimiento: resultados con denominador, fecha y tratamiento; estado vacío útil cuando aún no existen.
10. Evidencia: resultados publicados, adaptación local y límites, con citas próximas a cada afirmación.
11. Fuentes y fichas relacionadas generadas desde los datos.

En escritorio: índice lateral de unas 220 px y columna de lectura de hasta 760 px; fotografías y tablas pueden ocupar el ancho disponible. En móvil: índice desplegable antes del contenido. Encabezados anclados no quedan tapados por navegación fija.

### Catálogo y crecimiento

- Con tres plantas: listado sencillo, sin controles innecesarios. Al crecer, activar búsqueda por nombre común/científico y filtros basados en campos existentes.
- Cuadrícula orientativa de 3/2/1 columnas; fotografías 4:3, títulos alineados y resúmenes de extensión similar.
- Los enlaces son HTML real incluso cuando hay filtros JavaScript. Estado de filtros en parámetros de URL y botón «Limpiar filtros».
- Orden predeterminado estable, sin depender del orden de un objeto JavaScript. Conteo de resultados y mensaje cuando no hay coincidencias.
- Estado sin foto: ficha tipográfica honesta; no usar una foto de otra especie como sustituto.

## 8. Animaciones y microinteracciones

Principio: cada movimiento tiene un propósito y un estado final comprensible. CSS y Web Animations API son la base. Anime.js es candidato para secuencias SVG; Motion es alternativa para transiciones. Elegir como máximo una biblioteca adicional después de comparar pruebas.

| Elemento | Comportamiento | Duración orientativa | Alternativa con movimiento reducido |
| --- | --- | --- | --- |
| Botón y enlace | Cambio de color, subrayado y foco | 120–160 ms | Cambio inmediato |
| Tarjeta | Borde y desplazamiento máximo de 2 px al apuntar | 160–200 ms | Borde sin desplazamiento |
| Filtro | Actualización y anuncio del total; foco conservado | 160–200 ms | Actualización inmediata |
| Entrada de sección | Opacidad y hasta 8 px, una sola vez | 240–320 ms | Contenido visible desde el inicio |
| Corte del módulo | Mostrar cubierta, mesa y sensores por pasos activados | 500–800 ms por paso | Cambiar entre estados estáticos |
| Flujo de aire/agua | Flechas sobre trazados al pulsar «Ver funcionamiento» | Ciclo corto de 2–4 s, con pausa | Flechas fijas con etiquetas |
| Desarrollo del esqueje | Paso manual entre preparación, callo, raíz y aclimatación | 300–500 ms | Imágenes estáticas por etapa |
| Gráfico | Actualizar desde datos, conservando escala explicada | 150–250 ms | Redibujado inmediato |

- Curva estándar propuesta: `cubic-bezier(.2,.7,.2,1)`. Evitar rebotes en contenido técnico.
- No animar números desde cero ni generar curvas para aparentar mediciones. Las demostraciones llevan etiqueta permanente.
- Diagramas explicativos no son simulaciones físicas salvo que exista un modelo validado y descrito.
- Nada depende solo de hover; botones de diagramas utilizables con teclado y táctil.
- Respetar `prefers-reduced-motion`, también si cambia durante la sesión. Detener ciclos fuera de pantalla o con pestaña oculta.
- No interceptar el scroll ni bloquearlo para contar una historia. La navegación entre páginas usa enlaces nativos; transiciones entre documentos son mejora opcional con fallback.
- Las secciones parten visibles sin JS. El realce animado se habilita después de inicializar correctamente la interacción.

Pruebas previstas: A) tarjeta y filtro con CSS; B) corte SVG con controles nativos; C) secuencia del mismo SVG usando Anime.js. Comparar peso añadido, fluidez en móvil, legibilidad y facilidad de mantenimiento; registrar decisión antes de integrar.

## 9. Modelo modular de contenido

Propuesta de estructura, todavía no implementada:

```text
src/
  _data/
    site.json                 # nombre, URL pública y prefijo
    navigation.json
    sources.json              # bibliografía compartida
    substrates.json           # composiciones compartidas
  _includes/
    layouts/base.njk
    components/header.njk
    components/plant-card.njk
  plantas/
    index.njk                 # catálogo
  plantas.njk                # genera una página por objeto en plants.json
  assets/css/site.css        # primer corte; se separa al crecer el sistema
  assets/images/og.jpg      # tarjeta social optimizada
  assets/js/                 # interacción solo donde haga falta
  assets/fonts/
    licenses/                 # avisos de distribución de cada familia tipográfica
  assets/images/plants/
  index.njk
  modulo.njk
  metodo.njk
  mediciones/index.njk
  evidencia.njk
  404.njk
schemas/
  plant.schema.json
scripts/
  validate-content.mjs
docs/
eleventy.config.js
  package.json
  package-lock.json
dist/                         # salida generada, no editar a mano
```

### Contrato de una planta

| Grupo | Campos | Regla |
| --- | --- | --- |
| Identidad | `id`, `slug`, `commonName`, `scientificName`, `identificationStatus` | ID y slug únicos; nombres son texto, nunca fragmentos HTML |
| Publicación | `status`, `updatedAt`, `summary`, `order` | Separar borrador/publicado de la calidad de evidencia |
| Recursos | `images[]: src, alt, caption, author, sourceUrl, license, width, height` | Ruta existente; crédito específico de cada archivo |
| Protocolo | `steps[]`, `stage`, `parameters[]` | Secciones opcionales; no crear valores por defecto agronómicos |
| Parámetro | `name, value/range, unit, stage, evidenceType, sourceIds, rationale` | Hipótesis con justificación; dato publicado con fuente |
| Sustratos | `substrateIds[]` | Referencia compartida; proporciones validadas para sumar 100% |
| Evidencia | `claims[]: text, evidenceType, sourceIds, limitations` | Estado por afirmación, no un sello indiscriminado para toda la planta |
| Resultados | `results[]: date, treatment, rooted, total, observation` | Sin datos = sin resultado; nunca 0% por ausencia de información |

Tipos de evidencia: `published`, `local-proposal`, `local-observation`. La simulación pertenece a conjuntos de datos de demostración separados y nunca se mezcla con resultados reales.

Las fuentes compartidas guardan ID, título, autores, año, institución/revista, DOI/URL, fecha de consulta y alcance. Cada afirmación puede añadir página, tabla o sección del documento.

### Cómo se añadirá una nueva planta

1. Añadir un objeto a `src/_data/plants.json` siguiendo los campos definidos.
2. Completar identidad, resumen y contenido disponible; dejar explícito lo pendiente.
3. Añadir imágenes con sus créditos y referencias a las fuentes compartidas cuando haya recursos verificados.
4. Ejecutar el build y revisar el objeto incorporado.
5. La paginación de `src/plantas.njk` genera ficha, tarjeta del catálogo y metadatos sin código nuevo por especie.
6. Revisar la página bajo el prefijo de GitHub Pages y publicar por el flujo habitual.

Criterio clave: añadir una cuarta planta de prueba no requiere modificar plantillas, menú, CSS ni JavaScript. La prueba se mantiene como fixture o borrador excluido de la publicación.

## 10. GitHub Pages: reglas de implementación

El workflow actual construye el sitio y sube únicamente `dist/` como artefacto; esta ruta debe validarse con la configuración y ejecución real de Pages. GitHub Pages sirve archivos estáticos; la generación con Actions es compatible con ese modelo. [Documentación oficial](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

- URL esperada por el remoto actual: `https://ycozco.github.io/invernadero-plan-01/`, pendiente de comprobar la configuración publicada y posible dominio personalizado.
- Prefijo esperado: `/invernadero-plan-01/`. Centralizarlo en configuración y pasarlo a Eleventy; no repetirlo manualmente por archivo.
- Aplicar el filtro `url` a enlaces y recursos de plantillas. El prefijo por sí solo no corrige enlaces arbitrarios. Revisar aparte imágenes de Markdown, `url()` de CSS, `fetch()`, módulos JS, sitemap, canonical y Open Graph. [Eleventy: filtro URL](https://www.11ty.dev/docs/filters/url/).
- Generar físicamente `plantas/duranta-erecta/index.html`, etc. No depender de redirecciones a `index.html` para rutas virtuales.
- Probar dos builds: raíz `/` y prefijo `/invernadero-plan-01/`. Probar la ficha mediante URL directa, recarga y navegación atrás.
- Mantener nombres de archivo en minúsculas, sin tildes ni espacios, y respetar mayúsculas/minúsculas que Linux distingue.
- CI actual: checkout → Node 22 → `npm ci` → build con prefijo → subir solo `dist/` → desplegar en `github-pages`. La validación automática de contenido y enlaces queda pendiente.
- El workflow publica desde `main` o mediante ejecución manual; comprobar permisos, ejecución y URL final en GitHub.
- Mantener anclas antiguas de portada o enlaces de continuidad para `#especies`, `#ambiente`, `#sustratos`, `#modulo` y `#medir`, evitando romper referencias existentes.
- HTML completo por ruta, título y descripción propios, `lang="es"`, imágenes con dimensiones y metadatos generados desde contenido.
- Mediciones iniciales: archivos JSON/CSV estáticos o demostración identificada. Una API externa futura debe ser pública o tener un intermediario adecuado; las credenciales no pueden ocultarse en el navegador.
- No prometer autenticación, escritura compartida de bitácora o recepción directa de sensores en Pages. Un borrador local o descarga CSV no equivale a almacenamiento compartido.

## 11. Imágenes, gráficos y rendimiento

- Preparar por planta: vista general, hoja/nudo y una imagen útil para el protocolo, según disponibilidad; diferenciar referencia botánica de fotografía del piloto.
- Usar SVG propio para planos y anotaciones. Raster para fotografías con variantes responsivas, AVIF/WebP y fallback según el flujo elegido.
- Hero con dimensiones explícitas y sin carga diferida si es el contenido principal; el resto con lazy loading. Evitar saltos de layout.
- Gráficos con ejes y unidades, leyenda, descripción y tabla alternativa. Series de temperatura y HR en paneles separados o escalas explícitas, nunca sobre un eje ambiguo.
- Coste orientativo inicial por página: JS comprimido hasta 50 KB en páginas editoriales, CSS hasta 40 KB y fuentes cargadas inicialmente hasta 180 KB. Son presupuestos a medir, no resultados ya obtenidos.
- Hero fotográfico objetivo hasta 250 KB en la variante entregada. Diagramas interactivos y gráficos se cargan solo en las páginas que los utilizan.
- Objetivos de experiencia: LCP ≤ 2.5 s, CLS ≤ 0.1 e INP ≤ 200 ms cuando exista medición de campo. Las pruebas de laboratorio guían la mejora y no prueban por sí solas el INP real.

## 12. Fases, entregables y criterios de aceptación

| Fase | Trabajo | Entregable verificable | Dependencia |
| --- | --- | --- | --- |
| 0 · Base | Auditoría de código y búsqueda inicial | Este plan y catálogo de referencias | Realizado documentalmente |
| 1 · Investigación | Contexto, evidencia por planta, fotografías y referencias visuales | Matriz de afirmaciones, inventario de recursos y decisiones abiertas | Parte del contexto y la identidad botánica requieren información del proyecto |
| 2 · Sistema visual | Firma, tokens, tipos, componentes y ejemplos de texto | Portada editorial, componentes de planta, esquema del módulo y tarjeta social | Nombre confirmado: Decolumax · San Camilo |
| 3 · Arquitectura | Eleventy, colección, validación y prefijo | Portada, catálogo y ficha navegables con contenido real | Contrato de contenido |
| 4 · Piloto visual | Aplicar diseño a portada, Duranta y corte del módulo | Tres vistas revisables con interacción mínima | Fases 2 y 3 |
| 5 · Extensión | Lantana, mioporo, método, evidencia y mediciones | Sitio completo y prueba de cuarta planta | Evidencia y estados pendientes representados honestamente |
| 6 · Publicación | Accesibilidad, enlaces, rendimiento y build de producción | Artefacto estático validado y despliegue de Pages al ejecutar esa etapa | Comprobaciones siguientes |

### Comprobaciones de aceptación

- [ ] Marca, colores, tipos y estados consistentes; ninguna ficha introduce un sistema visual distinto.
- [ ] Revisar a 360, 390, 768, 1280 y 1440 px, además de zoom al 200%; sin recortes de texto ni scroll horizontal general.
- [ ] Teclado, foco visible, enlace para saltar al contenido, menú móvil, filtros y diagramas operables.
- [ ] Contraste de todas las parejas utilizadas, incluida selección, hover, foco y superficies oscuras.
- [ ] Movimiento reducido completo; contenido principal legible sin JavaScript.
- [ ] Cada planta tiene URL directa, H1, metadatos, fotografía identificada o estado sin foto y bibliografía propia.
- [ ] Una cuarta ficha se incorpora sin editar lógica de interfaz.
- [ ] No existen afirmaciones numéricas sin fuente o identificación de propuesta; las incertidumbres de Myoporum se conservan.
- [ ] Simulación, datos registrados y ausencia de datos se distinguen; gráficos y cifras usan la misma serie.
- [ ] Build en raíz y subdirectorio: enlaces, imágenes, fuentes, 404, anclas y recarga directa funcionan.
- [ ] Presupuestos de carga medidos en prototipo y producción; registrar excepciones justificadas.
- [ ] Fotos, fuentes tipográficas y código reutilizado tienen procedencia y licencia registradas.

## 13. Pendientes que no deben rellenarse con suposiciones

Existencia de un logotipo o manual previo de Decolumax que deba preservarse; ubicación exacta y estación meteorológica representativa; identidad específica del mioporo; disponibilidad de fotos del piloto; dimensiones y cantidades ejecutadas frente a propuestas; diseño experimental aprobado; existencia y formato de sensores reales. El nombre **Decolumax · San Camilo** ya está confirmado.

Se puede desarrollar la estructura y el lenguaje visual mientras estos campos permanecen señalados. La investigación se cierra por afirmación resuelta o incertidumbre documentada, no por acumular enlaces.
