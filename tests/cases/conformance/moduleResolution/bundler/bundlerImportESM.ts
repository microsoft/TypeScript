// @moduleResolution: bundler
// @module: esnext, preserve

// @Filename: /esm.mts
export const esm = 0;

// @Filename: /not-actually-cjs.cts
import { esm } from "./esm.mjs";

// @Filename: /package.json
{ "type": "commonjs" }

// @Filename: /still-not-cjs.ts
import { esm } from "./esm.mjs";
