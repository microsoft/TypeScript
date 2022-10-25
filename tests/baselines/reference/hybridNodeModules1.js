//// [tests/cases/conformance/moduleResolution/hybrid/hybridNodeModules1.ts] ////

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
"use strict";
exports.__esModule = true;
//// [main.mjs]
"use strict";
exports.__esModule = true;
//// [main.cjs]
"use strict";
exports.__esModule = true;
