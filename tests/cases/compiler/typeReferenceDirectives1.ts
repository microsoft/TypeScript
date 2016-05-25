// @noImplicitReferences: true
// @traceResolution: true
// @declaration: true
// @typesRoot: /


// @filename: /types/lib/index.d.ts
interface $ { x }

// @filename: /app.ts
/// <reference types="lib"/>
interface A {
    x: $
}