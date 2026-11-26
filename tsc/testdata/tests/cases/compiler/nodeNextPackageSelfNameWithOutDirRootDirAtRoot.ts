// @module: nodenext
// @outDir: /
// @rootDir: /
// @noEmit: true
// @noImplicitReferences: true

// The output directory and the root directory are both "/". The self-name
// import "me/lib" maps to "./lib.d.ts" in the output directory. The resolver
// maps this path back to the input file "/lib.ts", so the import has no error.

// @filename: /package.json
{ "name": "me", "exports": { "./lib": "./lib.d.ts" } }

// @filename: /lib.ts
export const w = 1;

// @filename: /a.ts
import { w } from "me/lib";
w;
