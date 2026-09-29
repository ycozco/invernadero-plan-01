# Cámara de propagación · San Camilo

Micrositio estático en español para presentar el módulo experimental de propagación de **Duranta erecta**, **Lantana camara** y **Myoporum** en un contexto seco.

## Qué incluye

- Vista general del módulo y su hipótesis de diseño.
- Protocolos separados por especie con pasos, rangos y nivel de evidencia.
- Diagrama animado del microinvernadero y su sección transversal.
- Panel de temperatura, humedad, zona radicular y CE con simulación visual.
- Comparador de cuatro mezclas de sustrato por volumen.
- Citas enlazadas a fuentes técnicas y referencias de patrones de dashboard open source.

Es una interfaz informativa y experimental: las lecturas del panel son simuladas hasta conectar sensores reales y los rangos deben validarse con agua, arena y clima locales.

## Ejecutar localmente

No requiere Node ni build step. Abre `index.html` en un navegador o sirve la carpeta con cualquier servidor estático:

```bash
python -m http.server 8080
```

Después visita `http://localhost:8080`.

## Publicar en GitHub Pages

El workflow [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) publica automáticamente el contenido de la raíz cuando se hace push a `main`.

1. Crea un repositorio en GitHub y añade el remote.
2. Haz commit y push de la rama `main`.
3. En **Settings → Pages**, deja **Source: GitHub Actions**.
4. El workflow desplegará el sitio en `https://<usuario>.github.io/<repositorio>/`.

Comandos iniciales si todavía no existe Git local:

```bash
git init
git add .
git commit -m "feat: crear micrositio de cámara de propagación"
git branch -M main
git remote add origin https://github.com/<usuario>/<repositorio>.git
git push -u origin main
```

## Fuentes técnicas

- [Penn State Extension · Propagating Houseplants](https://extension.psu.edu/propagating-houseplants): humedad alta, medio húmedo no saturado, luz indirecta y temperatura óptima de la zona radicular.
- [Duranta erecta · rooting media and IBA concentration](https://academicjournals.org/journal/AJPS/article-full-text/CBB437F61875): ensayo de arena, corteza, peat-lite/perlita e IBA 0–7500 ppm.
- [Lantana camara · temperatura y humedad relativa](https://pmc.ncbi.nlm.nih.gov/articles/PMC4153567/): tratamientos a 22, 26 y 30 °C, 14/10 h y 75 ± 2 % HR.
- [NC State Extension · Substrates](https://nurserycrops.ces.ncsu.edu/substrates/): porosidad total, capacidad de contenedor, porosidad llena de aire, pH y CE.

## Referencias de interfaz

Se revisaron como inspiración de patrones visuales (tarjetas de lecturas, umbrales, estados de alerta y dashboards):

- [againdika/Greenhouse](https://github.com/againdika/Greenhouse)
- [LeonidasPapadakis/Bloombox](https://github.com/LeonidasPapadakis/Bloombox)
- [IoT-Ignite/IgniteGreenhouse](https://iot-ignite.github.io/IgniteGreenhouse/)

No se reutiliza código, imagen ni identidad visual de esos proyectos.
