// @noImplicitReferences: true
// @traceResolution: true
// @declaration: true
// @typeRoots: /types
// @currentDirectory: /

// $ comes from d.ts file - no need to add type reference directive

// @filename: /ref.d.ts
interface $ { x }

// @filename: /types/lib/index.d.ts
declare let $: { x: number }


// @filename: /app.ts
/// <reference path="./ref.d.ts"/>
/// <reference types="lib"/>

let x: $;
let y = () => x