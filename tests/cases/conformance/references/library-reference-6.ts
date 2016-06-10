// @noImplicitReferences: true
// @traceResolution: true

// The primary lookup folder is relative to tsconfig.json, if present

// @filename: /types/alpha/index.d.ts
declare var alpha: { a: string };

// @filename: /src/foo.ts
/// <reference types="alpha" />
var x: string = alpha.a;

// @filename: /tsconfig.json
{
}
