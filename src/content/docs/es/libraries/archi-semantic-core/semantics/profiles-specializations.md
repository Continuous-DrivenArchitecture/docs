---
title: Perfiles y especializaciones
description: ArchiProfile — especializaciones, perfiles genéricos y referencias basadas en id.
---

El mecanismo genérico de perfiles de Archi se expone a través de un
[`ArchiProfile`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiProfile/):

```ts
interface ArchiProfile {
  id: string;
  name: string | null;
  imagePath: string | null;   // e.g. "images/abc123.png"
  features: ArchiFeature[];   // { key, value } pairs defined on the profile
}
```

## Dos tipos de perfiles

Archi tiene dos variantes nativas de perfil, ambas representadas como
`ArchiProfile`:

- **Especializaciones** — perfiles que especializan un tipo de elemento
  ArchiMate (p. ej., una especialización de "Data Store" de
  `ApplicationService`), normalmente con un icono y valores de
  características. Archi las almacena como entradas
  `archimate:Specialization` con un `name` y un `imagePath`.
- **perfiles genéricos** — perfiles adjuntos a cualquier elemento sin una
  especialización.

## Cómo los referencian los elementos

Los perfiles se declaran **una sola vez en la raíz del modelo**
(`model.profiles`) y se referencian por id desde los elementos y las
relaciones:

```ts
element.profiles: string[]       // ArchiProfile.id values
relationship.profiles: string[]  // ArchiProfile.id values
```

```ts
const profileById = new Map(model.profiles.map((p) => [p.id, p]));

for (const element of model.elements) {
  const profiles = element.profiles
    .map((id) => profileById.get(id))
    .filter(Boolean);

  if (profiles.length) {
    console.log(element.name, '→', profiles.map((p) => p.name).join(', '));
  }
}
```

## Manejo de imágenes

Cuando un perfil tiene un icono incrustado, `imagePath` apunta a la entrada
`images/` del archivo `.archimate` — p. ej. `"images/abc123.png"`.
`extractArchiModelXml` no extrae los bytes de la imagen; trata `imagePath`
como un puntero dentro del archivo si necesitas el binario (consulta
[Trabajo con archivos .archimate](/es/libraries/archi-semantic-core/getting-started/archives/)).

## Límite actual

El contenido del perfil se analiza (nombre, ruta de imagen, características),
pero no se realiza ningún tipado semántico de características — las claves de
las características del perfil se conservan como pares clave/valor simples.