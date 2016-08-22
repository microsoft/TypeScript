// @noImplicitReferences: true
// @traceResolution: true
// @declaration: true
// @typeRoots: /types
// @currentDirectory: /

// $ comes from type declaration file - type reference directive should be added

// @filename: /ref.d.ts
declare let $: { x: number }
    
// @filename: /types/lib/index.d.ts
interface $ { x }


// @filename: /app.ts
/// <reference path="./ref.d.ts"/>
/// <reference types="lib"/>

let x: $;
let y = () => x

