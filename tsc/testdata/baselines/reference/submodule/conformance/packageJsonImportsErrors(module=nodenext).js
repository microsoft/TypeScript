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
export {};
//// [foo.js]
export {};
//// [index.js]
import {} from "#foo.ts"; // Ok
import {} from "#internal/foo.ts"; // Error
import {} from "pkg/foo.ts"; // Ok
