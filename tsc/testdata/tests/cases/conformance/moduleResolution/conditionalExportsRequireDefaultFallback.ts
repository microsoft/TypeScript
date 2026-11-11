// @module: commonjs
// @strict: true
// @noEmit: true
// @traceResolution: true
// @noImplicitReferences: true

// @filename: /node_modules/provider/package.json
{
    "exports": {
        ".": {
            "require": "./index.cjs",
            "default": "./index.js"
        }
    }
}

// @filename: /node_modules/provider/index.cjs
exports.value = 0;

// @filename: /node_modules/provider/index.d.ts
export const value: number;

// @filename: /main.ts
import { value } from "provider";
