// @noImplicitReferences: true
// @traceResolution: true
// @declaration: true
// @typeRoots: /types
// @types: lib
// @currentDirectory: /

// @filename: /types/lib/index.d.ts
interface $ { x }

// @filename: /app.ts
interface A {
    x: $
}