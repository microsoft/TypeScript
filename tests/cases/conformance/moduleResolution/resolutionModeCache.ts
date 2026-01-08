// @module: preserve
// @moduleResolution: bundler
// @noImplicitAny: true
// @noEmit: true
// @traceResolution: true

// @Filename: /node_modules/pkg/package.json
{
  "name": "pkg",
  "version": "1.0.0",
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.js"
    }
  }
}

// @Filename: /node_modules/pkg/index.d.mts
declare const _default: "esm";
export default _default;

// @Filename: /node_modules/pkg/index.d.ts
declare const _exports: "cjs";
export = _exports;

// @Filename: /index.ts
import type pkgRequire from "pkg" with { "resolution-mode": "require" };
import type pkgImport from "pkg" with { "resolution-mode": "import" };
pkgRequire;
pkgImport;