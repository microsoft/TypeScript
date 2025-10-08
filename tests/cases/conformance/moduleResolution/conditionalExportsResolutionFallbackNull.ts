// @module: esnext
// @moduleResolution: node16,nodenext,bundler
// @traceResolution: true
// @allowJs: true
// @noTypesAndSymbols: true
// @noEmit: true

// We fixed https://github.com/microsoft/TypeScript/issues/50762 for `null` only

// @Filename: /node_modules/dep/package.json
{
  "name": "dep",
  "version": "1.0.0",
  "exports": {
    ".": {
        "import": null,
        "types": "./dist/index.d.ts"
    }
  }
}

// @Filename: /node_modules/dep/dist/index.d.ts
export {};

// @Filename: /index.mts
import {} from "dep"; // Cannot find module 'dep'.