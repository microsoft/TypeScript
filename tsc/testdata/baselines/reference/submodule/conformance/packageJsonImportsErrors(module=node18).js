//// [tests/cases/conformance/externalModules/rewriteRelativeImportExtensions/packageJsonImportsErrors.ts] ////

//// [package.json]
{
  "name": "pkg",
  "type": "module",
  "imports": {
    "#foo.ts": "./foo.ts",
    "#internal/*": "./internal/*"
  },
  "exports": {
    "./*.ts": {
      "source": "./*.ts",
      "default": "./*.js"
    }
  }
}

//// [foo.ts]
export {};

//// [foo.ts]
export {};

//// [index.ts]
import {} from "#foo.ts"; // Ok
import {} from "#internal/foo.ts"; // Error
import {} from "pkg/foo.ts"; // Ok

//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _foo_ts_1 = require("#foo.ts"); // Ok
const foo_ts_1 = require("#internal/foo.ts"); // Error
const foo_ts_2 = require("pkg/foo.ts"); // Ok
