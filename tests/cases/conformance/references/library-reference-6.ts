// @noImplicitReferences: true
// @traceResolution: true
// @currentDirectory: /

// The primary lookup folder is relative to tsconfig.json, if present

// @filename: /node_modules/@types/alpha/index.d.ts
declare var alpha: { a: string };

// @filename: /src/foo.ts
/// <reference types="alpha" />
var x: string = alpha.a;

// @filename: /tsconfig.json
{
}
