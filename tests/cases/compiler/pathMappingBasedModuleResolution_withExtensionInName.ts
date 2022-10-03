// @traceResolution: true
// @module: commonjs
// @noImplicitReferences: true

// @filename: /tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "*": ["foo/*"]
        }
    }
}

// @filename: /foo/zone.js/index.d.ts
export const x: number;

// @filename: /foo/zone.tsx/index.d.ts
export const y: number;

// @filename: /a.ts
import { x } from "zone.js";
import { y } from "zone.tsx";
