---
title: Analice su primer modelo
description: Lea un archivo .archimate e inspeccione el ArchiModel resultante.
---

`parseArchiModel` acepta **solo texto XML**. Leer un archivo del disco, usar
la API File del navegador u obtener XML por red es responsabilidad de quien
llama — esto mantiene el paquete utilizable desde Node.js, bundlers de
navegador y pruebas sin acoplarlo a un entorno de E/S específico.

## Ejemplo mínimo

```ts
import {
  parseArchiModel,
  validateArchiModel,
} from '@cda/archi-semantic-core';

const model = parseArchiModel(xml);

console.log(model.elements);
console.log(model.relationships);
console.log(model.views);

console.log(model.elements[0].type);
// e.g. "ApplicationComponent", not "archimate:ApplicationComponent"

const { valid, errors } = validateArchiModel(model);
```

## Lectura desde el disco

```ts
import { readFile } from 'node:fs/promises';
import { parseArchiModel } from '@cda/archi-semantic-core';

const xml = await readFile('MyModel.archimate', 'utf8');
const model = parseArchiModel(xml);
```

:::note[.archimate también puede ser un zip]

Archi guarda un modelo como archivo zip — `model.xml` más una entrada
`images/` por cada icono incrustado — siempre que el modelo tenga imágenes
incrustadas. Un archivo zip es **binario**, no texto: leerlo con un
decodificador de texto antes de detectar el formato lo corrompe
irremediablemente. Si el archivo pudiera ser un zip, lea los bytes crudos y
páselos primero por `extractArchiModelXml`:

```ts
import { readFile } from 'node:fs/promises';
import { extractArchiModelXml } from '@cda/archi-semantic-core/archive';
import { parseArchiModel } from '@cda/archi-semantic-core';

const bytes = await readFile('MyModel.archimate'); // bytes, not text
const xml = extractArchiModelXml(bytes);            // handles plain XML or a zip
const model = parseArchiModel(xml);
```

Consulte [Trabajar con archivos .archimate](/es/libraries/archi-semantic-core/getting-started/archives/) para más detalles.

:::

## Qué se obtiene

`parseArchiModel` devuelve un [`ArchiModel`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModel/)
cuyas colecciones son **arrays planos en el orden del XML fuente**:

| Colección | Contenido |
| --- | --- |
| `folders` | El árbol del modelo (Business, Application, Relations, Views, carpetas personalizadas). |
| `elements` | Todos los elementos semánticos, cualquier tipo ArchiMate. |
| `relationships` | Todas las relaciones semánticas. |
| `views` | Todas las definiciones de diagrama/vista. |
| `diagramObjects` | Nodos visuales: objetos de diagrama, grupos, referencias a modelos. |
| `diagramConnections` | Conexiones visuales entre objetos de diagrama. |
| `notes` | Notas de diagrama de texto libre. |
| `profiles` | Especializaciones y Perfiles genéricos declarados en la raíz del modelo. |

Las referencias cruzadas entre colecciones son ids de cadena simples —
búsquelos en el array correspondiente o construya un `Map` con clave `id`
para búsquedas repetidas (consulte [Construir índices de búsqueda](/es/libraries/archi-semantic-core/guides/lookup-indexes/)).

## Comportamiento ante errores

`parseArchiModel` lanza una excepción cuando:

- la entrada no es una cadena;
- el XML no está bien formado.

No lanza una excepción para un modelo semánticamente roto (ids faltantes,
referencias colgantes, valores de Unión sin resolver) — use
[`validateArchiModel`](/es/libraries/archi-semantic-core/getting-started/validate-model/) para las
comprobaciones estructurales.