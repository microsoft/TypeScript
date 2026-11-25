// @declaration: true
// @noImplicitReferences: true

// The "exports" pattern target of "pkg" ends with "/", so it names
// directories and not the file "/node_modules/pkg/dist/foo.js". Declaration
// emit does not use "pkg/foo" to name the type of "v", and reports an error.

// @filename: /node_modules/pkg/package.json
{ "name": "pkg", "exports": { "./*": "./dist/*/" } }

// @filename: /node_modules/pkg/dist/foo.d.ts
export interface L { x: number }

// @filename: /node_modules/dep/package.json
{ "name": "dep" }

// @filename: /node_modules/dep/index.d.ts
import type { L } from "../pkg/dist/foo";
export declare function make(): L;

// @filename: /src/main.ts
import { make } from "dep";
export const v = make();
