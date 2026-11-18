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
        "node": "./index.js",
        "types": "./types.d.ts"
    }
}
// @filename: /node_modules/provider/index.js
exports.value = 0;
// @filename: /node_modules/provider/types.d.ts
export const value: number;
// @filename: /index.mts
import { value } from "provider";
value;
