// @moduleResolution: bundler
// @module: esnext, preserve
// @traceResolution: true

// @Filename: /node_modules/dual/package.json
{
  "name": "dual",
  "version": "1.0.0",
  "type": "module",
  "main": "index.cjs",
  "types": "index.d.cts",
  "exports": {
    ".": {
      "import": "./index.js",
      "require": "./index.cjs"
    }
  }
}

// @Filename: /node_modules/dual/index.js
export const esm = 0;

// @Filename: /node_modules/dual/index.d.ts
export const esm: number;

// @Filename: /node_modules/dual/index.cjs
exports.cjs = 0;

// @Filename: /node_modules/dual/index.d.cts
export const cjs: number;

// @Filename: /main.ts
import { esm, cjs } from "dual";

// @Filename: /main.mts
import { esm, cjs } from "dual";

// @Filename: /main.cts
import { esm, cjs } from "dual";
