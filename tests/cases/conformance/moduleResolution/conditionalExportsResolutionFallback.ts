// @module: esnext
// @moduleResolution: node16,nodenext,bundler
// @traceResolution: true
// @allowJs: true
// @noTypesAndSymbols: true
// @noEmit: true

// This documents bug https://github.com/microsoft/TypeScript/issues/50762.

// @Filename: /node_modules/dep/package.json
{
  "name": "dep",
  "version": "1.0.0",
  "exports": {
    ".": {
        "import": "./dist/index.mjs",
        "require": "./dist/index.js",
        "types": "./dist/index.d.ts",
    }
  }
}

// @Filename: /node_modules/dep/dist/index.d.ts
export {};

// @Filename: /node_modules/dep/dist/index.mjs
export {};

// @Filename: /index.mts
import {} from "dep";
// Should be an untyped resolution to dep/dist/index.mjs,
// but the first search is only for TS files, and when
// there's no dist/index.d.mts, it continues looking for
// matching conditions and resolves via `types`.