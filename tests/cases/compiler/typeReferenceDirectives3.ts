// @noImplicitReferences: true
// @declaration: true
// @typeRoots: /types
// @traceResolution: true
// @currentDirectory: /

// $ comes from d.ts file - no need to add type reference directive

// @filename: /ref.d.ts
interface $ { x }

// @filename: /types/lib/index.d.ts
declare let $: { x: number }

// @filename: /app.ts
/// <reference types="lib"/>
/// <reference path="ref.d.ts" />
interface A {
    x: () => $
}