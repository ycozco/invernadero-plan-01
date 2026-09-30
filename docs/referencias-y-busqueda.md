# Referencias y plan de búsqueda

Consulta inicial: 28 de septiembre de 2026. Complementa el [plan de identidad y arquitectura](plan-identidad-y-arquitectura.md).

Estados: **revisada** = página/documentación consultada; **candidata** = recurso localizado que necesita evaluación más profunda; **prototipo pendiente** = no se ha instalado ni probado en este proyecto. Se incorporaron tipografías con licencias OFL y dos fotografías botánicas de Wikimedia Commons, cada una con atribución y enlace de licencia en la ficha; no se copiaron código ni componentes visuales de los repositorios citados.

## 1. Identidad, fichas e imágenes

| Referencia | Aplicación al proyecto | Estado y límites |
| --- | --- | --- |
| [Kew · Plants of the World Online](https://powo.science.kew.org/) | Identificación, nombres, sinónimos y separación entre información botánica y evidencia experimental | Revisada como fuente y estructura; pendiente de inspección visual y verificación de cada taxón. Sus imágenes tienen derechos propios |
| [NC State · Duranta erecta](https://plants.ces.ncsu.edu/plants/duranta-erecta/) | Ejemplo concreto de ficha con identificación, atributos, fotos y créditos | Revisada. Seleccionar fotos por identidad/cultivar y licencia de cada archivo; no asumir una licencia común |
| [Adobe · Source Serif](https://github.com/adobe-fonts/source-serif) y [readme oficial](https://github.com/adobe-fonts/source-serif/wiki/Source-Serif-Readme) | Títulos y lectura editorial botánica | OFL; conservar licencia. Comprobar WOFF2, caracteres españoles y pesos del paquete que se incorpore |
| [Adobe · Source Sans](https://github.com/adobe-fonts/source-sans) | Párrafos, navegación, tablas y controles | Repositorio revisado; verificar licencia y archivos exactos antes de incorporarlos |
| [IBM · Plex](https://github.com/IBM/plex) | Plex Mono para medidas y códigos, uso acotado | OFL-1.1; no trasladar la identidad visual de IBM al sitio |
| [Lucide](https://github.com/lucide-icons/lucide) | Iconos utilitarios consistentes y SVG seleccionados | ISC; conservar avisos. No es la fuente del logotipo de marca |

La selección visual debe completar 6–8 ejemplos repartidos entre ficha botánica, publicación editorial, plano técnico, catálogo móvil y gráfico accesible. Registrar una decisión útil por ejemplo. No tomar dashboards de invernadero como única referencia de identidad.

## 2. Animaciones: ejemplos y repositorios

| Recurso | Ejemplo que buscar/probar | Decisión inicial |
| --- | --- | --- |
| [Motion · ejemplos](https://motion.dev/examples) y [animate](https://motion.dev/docs/animate) | Entrada corta, transición de estado y animación de SVG | Candidato. Comprobar disponibilidad y licencia de cada ejemplo; la galería puede incluir recursos distintos del núcleo |
| [Motion · licencia del paquete](https://github.com/motiondivision/motion/blob/main/packages/motion/LICENSE.md) | Núcleo JavaScript como alternativa para animación | MIT revisada; prototipo pendiente |
| [Anime.js · SVG](https://animejs.com/documentation/svg/) y [repositorio](https://github.com/juliangarnier/anime) | Trazado de líneas, puntos siguiendo recorridos y secuencias del corte técnico | MIT en el repositorio; candidato preferente si CSS/WAAPI resultan insuficientes |
| [Observable Plot](https://github.com/observablehq/plot) y [accesibilidad](https://observablehq.com/plot/features/accessibility) | Gráfico derivado de datos con etiquetas y descripción | ISC; evaluar solo en la fase de datos. Mantener tabla alternativa y medir coste total incluido D3 |
| [MDN · movimiento reducido](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | Interacción equivalente sin desplazamiento ni ciclos | Referencia de implementación; aplica a todas las opciones |

No se propone instalar todas las bibliotecas. CSS/SVG nativo primero; elegir una biblioteca de animación solo si resuelve el prototipo mejor. Plot es una decisión independiente para gráficos, no un requisito del rediseño editorial.

Ficha de evaluación de cada prototipo:

```text
Nombre / enlace / versión o commit:
Interacción que resuelve:
Pantalla donde se utilizaría:
Licencia de código y recursos:
Dependencias y coste comprimido medido:
Teclado y táctil:
Estado sin JS y con movimiento reducido:
Prueba en móvil:
Qué se adapta y qué se descarta:
Decisión y motivo:
```

## 3. Estructura modular y GitHub Pages

- [GitHub Pages: qué es](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages): confirma el alojamiento estático de HTML, CSS y JavaScript.
- [GitHub: configuración de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site): flujo de construcción y publicación con Actions. Verificar versiones vigentes de acciones en la implementación.
- [Eleventy: colecciones](https://www.11ty.dev/docs/collections/): base para generar catálogo y enlaces desde las fichas.
- [Eleventy: configuración y prefijo](https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix): despliegue bajo subdirectorio.
- [Eleventy: filtro URL](https://www.11ty.dev/docs/filters/url/): aplicar el prefijo a enlaces; no asumir que todos los recursos se reescriben automáticamente.
- [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog): referencia de organización de contenidos y plantillas; adaptar principios, sin convertir el catálogo en un blog ni copiar su aspecto. Revisar la licencia de cualquier archivo reutilizado.

La elección de Eleventy es una recomendación para este repositorio pequeño de HTML/CSS/JS. Su coste es incorporar un build; su beneficio es generar páginas completas y repetibles sin añadir un framework de interfaz en el navegador.

## 4. Fuentes técnicas iniciales

| ID propuesto | Fuente | Utilidad y alcance |
| --- | --- | --- |
| `shiri-2019-duranta` | [Shiri et al. · IBA y medios de enraizamiento](https://academicjournals.org/journal/AJPS/article-abstract/CBB437F61875) | Resumen revisado: ensayo específico de Duranta, con concentraciones y medios. Leer el método completo antes de convertir dosis en instrucciones locales |
| `silva-2026-duranta` | [UNC · tesis de Duranta en Independencia, Lima](https://repositorio.unc.edu.pe/bitstream/handle/20.500.14074/10443/TESIS%20LENNY%20SILVA%20CHILONpdf.pdf?sequence=1) | Candidata localizada: conexión peruana relevante. Pendiente de lectura completa, extracción de tratamientos y evaluación de límites |
| `zhang-2014-lantana` | [Zhang et al. · calentamiento e invasividad](https://pubmed.ncbi.nlm.nih.gov/25184224/) | Resumen revisado: trata crecimiento y respuestas al calentamiento. No usarlo solo para afirmar un rango óptimo de enraizamiento |
| `umass-mist-fog` | [UMass · Mist and Fog Equipment for Propagation](https://www.umass.edu/agriculture-food-environment/greenhouse-floriculture/fact-sheets/mist-fog-equipment-for-propagation) | Relación entre niebla/nebulización y ambiente de propagación; apoya una explicación de VPD, sin sustituir ajuste por especie |
| `msu-moisture-2018` | [MSU · Moisture management during vegetative cutting propagation](https://msu-prod.dotcmscloud.com/news/moisture_management_during_vegetative_cutting_propagation) | Manejo de humedad por etapa; sirve para investigar control contextual y evitar horarios presentados como universales |
| `ncsu-substrates` | [NC State · Substrates](https://nurserycrops.ces.ncsu.edu/substrates/) | Propiedades físicas/químicas y necesidad de medir mezclas; entrada a métodos de evaluación |
| `senamhi-stations` | [SENAMHI · estaciones](https://www.senamhi.gob.pe/servicios/?p=estaciones) | Localizar series y estaciones; pendiente de ubicación precisa y evaluación de representatividad |

### Consultas siguientes, con resultado esperado

| Consulta orientativa | Resultado útil |
| --- | --- |
| `"Duranta erecta" cuttings IBA rooting substrate` | Método de aplicación, resultados por tratamiento y condiciones |
| `"Duranta erecta" enraizamiento AIB site:alicia.concytec.gob.pe` | Tesis y experimentos peruanos; ir después al documento original |
| `"Lantana camara" stem cuttings rooting mist substrate` | Estudios de enraizamiento, diferenciados de invasividad o crecimiento de plantas establecidas |
| `"Myoporum [especie verificada]" cuttings propagation` | Evidencia para la especie identificada, no para el género entero |
| `site:senamhi.gob.pe [localidad/estación] temperatura humedad` | Series con periodo y localización documentados |
| `site:umass.edu propagation vapor pressure deficit` | Explicación de procesos y límites de uso |
| `site:ncsu.edu container substrate air filled porosity EC method` | Método, unidades y condiciones de medición |
| `SVG greenhouse cross section animation github license` | Técnicas adaptables para un dibujo propio; descartar recursos sin procedencia |

Por cada afirmación técnica, registrar:

```text
ID / planta / etapa:
Afirmación propuesta:
Tipo: resultado publicado / propuesta local / observación local
Fuente y DOI/URL:
Página, tabla o sección:
Especie/cultivar, material y tamaño de muestra:
Tratamiento, duración, ambiente y método de medida:
Resultado y variabilidad informada:
Qué permite afirmar / qué no permite afirmar:
Adaptación local y pendientes:
Fecha de revisión:
```

## 5. Accesibilidad y criterios visuales

- [W3C: contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): referencia para las combinaciones de texto del sistema visual. Los cálculos del plan corresponden a colores sólidos específicos.
- [W3C: tamaño mínimo de objetivo](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum): el criterio AA contempla 24 × 24 CSS px y excepciones; el proyecto adopta 44 px de alto como objetivo de comodidad para botones, no como cita literal de ese mínimo.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion): implementar variantes de interacción sin movimiento innecesario.

## 6. Registro de decisiones iniciales

| Decisión | Motivo | Estado |
| --- | --- | --- |
| Decolumax · San Camilo | Nombre principal de la identidad, con descriptor «Propagación experimental» | Confirmado por el usuario |
| Botánica editorial + ingeniería de campo | Dar identidad vinculada a plantas, lugar y experimento | Propuesta base |
| Paleta clara con verde y terracota | Mejorar jerarquía y separar acento decorativo de datos | Parejas de contraste calculadas; falta QA visual |
| Página independiente por planta | Compartir, ampliar y consultar fichas completas | Requisito del usuario |
| Plantillas estáticas y colecciones | Evitar duplicación al sumar plantas | Eleventy implementado; pendiente validar registros automáticamente y probar una cuarta planta |
| GitHub Pages con prefijo configurable | Respetar el alojamiento y las rutas de proyecto | Requisito del usuario |
| Animación explicativa y opcional | Aportar información sin obstaculizar lectura | Prototipos pendientes |
| Fuentes vinculadas a afirmaciones | Distinguir evidencia de decisiones experimentales | Requisito editorial de la propuesta |

No se han validado aún las nuevas pantallas, el rendimiento ni el despliegue del rediseño: son entregables de las fases del plan.
