// @noImplicitReferences: true
// @traceResolution: true
// @declaration: true
// @typeRoots: /types
// @currentDirectory: /

// local value shadows global - no need to add type reference directive 
   
// @filename: /types/lib/index.d.ts
declare let $: { x: number }


// @filename: /app.ts
/// <reference types="lib"/>

export let $ = 1;

export let x: typeof $;
export let y = () => x