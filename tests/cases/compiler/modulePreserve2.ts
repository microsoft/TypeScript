// @module: preserve
// @target: esnext
// @strict: true
// @checkJs: true
// @traceResolution: true
// @noEmit: true

// @Filename: /node_modules/dep/package.json
{
  "name": "dep",
  "exports": {
    "import": "./import.mjs",
    "require": "./require.js"
  }
}

// @Filename: /node_modules/dep/import.d.mts
export const esm: "esm";

// @Filename: /node_modules/dep/require.d.ts
declare const cjs: "cjs";
export = cjs;

// @Filename: /index.ts
import { esm } from "dep";
import cjs = require("dep");

// @Filename: /main.js
import { esm } from "dep";
const cjs = require("dep");
