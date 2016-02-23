// @noImplicitReferences: true

// The primary lookup folder is relative to tsconfig.json, if present

// @filename: typings/alpha/index.d.ts
declare var alpha: { a: string };

// @filename: src/foo.ts
/// <reference library="alpha" />
var x: string = alpha.a;

// @filename: tsconfig.json
{
}
