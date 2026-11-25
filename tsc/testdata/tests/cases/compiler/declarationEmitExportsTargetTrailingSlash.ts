// @declaration: true
// @noImplicitReferences: true

// The "exports" target of "pkg" ends with "/", so it names a directory and
// not the file "/node_modules/pkg/index.js". Declaration emit does not use
// "pkg" to name the type of "v", and reports an error.

// @filename: /node_modules/pkg/package.json
{ "name": "pkg", "exports": { ".": "./index.js/" } }

// @filename: /node_modules/pkg/index.d.ts
export interface L { x: number }

// @filename: /node_modules/dep/package.json
{ "name": "dep" }

// @filename: /node_modules/dep/index.d.ts
import type { L } from "../pkg/index";
export declare function make(): L;

// @filename: /src/main.ts
import { make } from "dep";
export const v = make();
