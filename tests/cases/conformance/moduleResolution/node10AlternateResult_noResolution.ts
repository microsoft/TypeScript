// @moduleResolution: node10
// @traceResolution: true
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: /node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "1.0.0",
    "exports": {
        ".": "./definitely-not-index.js"
    }
}

// @Filename: /node_modules/pkg/definitely-not-index.d.ts
export {};

// @Filename: /index.ts
import { pkg } from "pkg";
