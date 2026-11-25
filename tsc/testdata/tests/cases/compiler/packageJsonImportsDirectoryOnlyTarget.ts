// @module: nodenext
// @noEmit: true
// @noImplicitReferences: true
// @traceResolution: true

// The "imports" target "./dist.js/" ends with "/", so it names a directory.
// The resolver does not look up the file "/dist.ts" for it, and "#js/" does
// not resolve.

// @filename: /package.json
{ "name": "pkg", "type": "module", "imports": { "#js/": "./dist.js/" } }

// @filename: /dist.ts
export const k = 3;

// @filename: /index.ts
import * as b from "#js/";
export { b };
