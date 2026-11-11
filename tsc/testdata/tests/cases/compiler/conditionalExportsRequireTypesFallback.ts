// @target: es2015
// @module: nodenext
// @moduleResolution: nodenext
// @strict: true
// @noEmit: true
// @traceResolution: true
// @noImplicitReferences: true

// @filename: /node_modules/provider/package.json
{
    "exports": {
        "require": "./index.cjs",
        "types": "./index.d.ts"
    }
}
// @filename: /node_modules/provider/index.cjs
exports.value = 0;
// @filename: /node_modules/provider/index.d.ts
export const value: number;
// @filename: /index.cts
import { value } from "provider";
value;
