// @module: nodenext
// @outDir: /dist
// @rootDir: /src
// @noEmit: true
// @noImplicitReferences: true

// The self-name import "pkg/x" maps to "./dist/^/x.js" in the output
// directory. The resolver maps this path back to the input file
// "/src/^/x.ts". It reads "^" as a directory name, not as a root. The import
// resolves. "x" is a string, so assigning it to "n" (a number) is an error.

// @filename: /package.json
{ "name": "pkg", "version": "1.0.0", "type": "module", "exports": { "./x": "./dist/^/x.js" } }

// @filename: /src/^/x.ts
export const x = "s";

// @filename: /src/a.ts
import { x } from "pkg/x";
const n: number = x;
