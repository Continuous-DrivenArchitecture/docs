---
title: Manejo de archivos en Node
description: Una mirada profunda al pipeline de archivos .archimate y su taxonomía de errores.
---

## El pipeline

```text
bytes  →  signature check  →  plain XML: decode UTF-8 directly
                     │
                     └── zip: find model.xml entry → stream-decode → CRC-32 check → decode UTF-8
```

[`extractArchiModelXml`](/es/libraries/archi-semantic-core/reference/generated/functions/extractArchiModelXml/)
acepta bytes crudos y devuelve el texto XML del modelo para **ambas** formas
de archivo:

```ts
import { readFile } from 'node:fs/promises';
import { extractArchiModelXml } from '@cda/archi-semantic-core/archive';

const bytes = await readFile('Model.archimate'); // binary read — never text-decode first
const xml = extractArchiModelXml(bytes);
```

## Detección

La función inspecciona la firma del archivo:

- **PK (zip)** → ruta de archivo: localiza `model.xml` en el directorio
  central, lo infla, verifica el CRC-32 y decodifica UTF-8.
- **cualquier otra cosa** → ruta de XML plano: decodifica los bytes
  directamente como UTF-8.

## Métodos de compresión

Solo se admiten entradas **Stored** (sin comprimir) y **Deflate** — son los
únicos dos métodos que Archi escribe jamás. Cualquier otro método lanza una
excepción. El archivo `.archimate` completo nunca necesita ser inflado: solo
se lee la entrada `model.xml`, por lo que el costo de memoria se mantiene
proporcional al tamaño decodificado del modelo (consulta
[Trabajo con modelos grandes](/es/libraries/archi-semantic-core/guides/large-models/)).

## Taxonomía de errores

| Condición | Comportamiento |
| --- | --- |
| La entrada parece un zip pero no tiene una entrada `model.xml` | lanza una excepción |
| La entrada usa un método distinto de Stored/Deflate | lanza una excepción |
| Desajuste de CRC-32 en la entrada decodificada | lanza una excepción |
| Estructura zip truncada o corrupta | lanza una excepción |

## Trabajo con imágenes

`extractArchiModelXml` devuelve solo XML — los bytes de las imágenes
permanecen en el archivo. `ArchiProfile.imagePath` (p. ej. `"images/abc123.png"`)
y las rutas de imagen de `DiagramModelImageProvider` son punteros: para
extraer un binario específico, abre el archivo tú mismo y lee la entrada
`images/` correspondiente.

## Límite de plataforma

La ruta de archivo usa el `node:zlib` integrado de Node — esta es la razón
por la que la función vive en el subpath `/archive` y no forma parte del
entrypoint raíz seguro para navegadores. Si necesitas manejo de archivos del
lado del navegador, eso es un asunto de otro paquete, no de este.