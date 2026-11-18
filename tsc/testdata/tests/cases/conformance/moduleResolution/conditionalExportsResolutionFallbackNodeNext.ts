// @target: es2022
// @module: nodenext
// @moduleResolution: nodenext
// @strict: true
// @traceResolution: true
// @noTypesAndSymbols: true
// @noEmit: true
// @noImplicitReferences: true

// @Filename: /node_modules/dep/package.json
{
    "name": "dep",
    "version": "1.0.0",
    "types": "./index.d.ts",
    "exports": {
        ".": {
            "import": "./index.mjs",
            "require": "./index.js",
            "types": "./index.d.ts"
        }
    }
}

// @Filename: /node_modules/dep/index.d.ts
export {};

// @Filename: /node_modules/dep/index.mjs
export {};

// @Filename: /index.mts
import {} from "dep";
