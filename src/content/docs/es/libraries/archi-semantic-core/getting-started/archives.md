---
title: Trabajar con archivos .archimate
description: La variante de archivo zip de los archivos .archimate y el subpath /archive solo para Node.
---

Archi puede guardar un modelo de dos formas, ambas con la extensión
`.archimate`:

- **XML plano** — el modelo como un único archivo de texto XML;
- **archivo zip** — un `model.xml` más una entrada `images/` por cada icono
  personalizado incrustado, comprimidos juntos bajo la misma extensión. Archi
  usa esta forma automáticamente siempre que el modelo tiene imágenes
  incrustadas y no se almacena en una carpeta bajo control de git (dentro de
  carpetas git, el `ArchiveManager` de Archi prefiere una estructura de
  XML plano + carpeta `images/` hermana para que los binarios de las imágenes
  sigan siendo compatibles con los diffs).

Un archivo `.archimate` en formato zip es **binario** — leerlo con un
decodificador de texto antes de detectar el formato lo corrompería
irremediablemente.

## `extractArchiModelXml`

La función solo para Node
[`extractArchiModelXml`](/es/libraries/archi-semantic-core/reference/generated/functions/extractArchiModelXml/)
acepta bytes de archivo crudos y devuelve el texto XML del modelo tanto si la
entrada es XML plano como un archivo zip:

```ts
import { readFileSync } from 'node:fs';
import { extractArchiModelXml } from '@cda/archi-semantic-core/archive';
import { parseArchiModel } from '@cda/archi-semantic-core';

const bytes = readFileSync('MyModel.archimate'); // read as bytes, not text
const xml = extractArchiModelXml(bytes);          // plain XML or zip, both work
const model = parseArchiModel(xml);
```

Detecta la firma del zip y decodifica la entrada directamente como texto
UTF-8 (XML plano) o la descomprime y decodifica la entrada `model.xml`
(archivo zip) — usando el `zlib` integrado de Node, sin dependencias
adicionales.

## Por qué `/archive` es un subpath separado

`extractArchiModelXml` depende del `node:zlib` de Node. La raíz del paquete
sigue siendo compatible con navegadores/bundlers al **no** importarlo, de
modo que la función de manejo de zips vive en un subpath dedicado:

```ts
// Browser-safe core
import { parseArchiModel, validateArchiModel } from '@cda/archi-semantic-core';

// Node-only archive handling
import { extractArchiModelXml } from '@cda/archi-semantic-core/archive';
```

Esta es una frontera de API pública intencional, no una ocurrencia tardía: los
bundlers que consumen el punto de entrada raíz nunca ven un módulo integrado
de Node.

## Imágenes incrustadas

`extractArchiModelXml` **no** extrae los bytes de las imágenes. Si necesita
localizar las imágenes por su cuenta, trate las referencias que Archi expone
— como `ArchiProfile.imagePath` (`"images/abc123.png"`) o la ruta de imagen de
un `DiagramModelImageProvider` — como punteros a las entradas `images/` del
archivo.

## Comportamiento ante errores

`extractArchiModelXml` lanza una excepción cuando la entrada:

- parece un zip pero no tiene una entrada `model.xml`;
- usa un método de compresión distinto de Stored/Deflate (Archi nunca escribe
  otra cosa);
- falla su comprobación de integridad CRC-32;
- es un zip truncado o corrupto.

## Véase también

- [Manejo de archivos en Node](/es/libraries/archi-semantic-core/guides/node-archive-handling/) — guía más
  profunda sobre el pipeline de archivos y la taxonomía de errores.