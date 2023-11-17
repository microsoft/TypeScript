// @noImplicitReferences: true
// @traceResolution: true
// @declaration: true
// @typeRoots: /types
// @types: lib
// @currentDirectory: /
// @isolatedDeclarationDiffReason: TSC adds type reference directives.

// @filename: /types/lib/index.d.ts
interface $ { x }

// @filename: /app.ts
interface A {
    x: $
}