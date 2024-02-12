//// [tests/cases/conformance/moduleResolution/bundler/bundlerNodeModules1.ts] ////

//// [package.json]
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

//// [index.js]
export const esm = 0;

//// [index.d.ts]
export const esm: number;

//// [index.cjs]
exports.cjs = 0;

//// [index.d.cts]
export const cjs: number;

//// [main.ts]
import { esm, cjs } from "dual";

//// [main.mts]
import { esm, cjs } from "dual";

//// [main.cts]
import { esm, cjs } from "dual";


//// [main.js]
//// [main.mjs]
//// [main.cjs]
