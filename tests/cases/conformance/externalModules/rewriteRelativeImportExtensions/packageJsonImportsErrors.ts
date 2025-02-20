// @module: node18,nodenext
// @rewriteRelativeImportExtensions: true
// @noTypesAndSymbols: true
// @verbatimModuleSyntax: true

// @Filename: /package.json
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

// @Filename: /foo.ts
export {};

// @Filename: /internal/foo.ts
export {};

// @Filename: /index.ts
import {} from "#foo.ts"; // Ok
import {} from "#internal/foo.ts"; // Error
import {} from "pkg/foo.ts"; // Ok