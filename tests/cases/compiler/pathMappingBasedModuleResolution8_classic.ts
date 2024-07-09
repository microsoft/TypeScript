// @moduleResolution: classic
// @module: amd
// @traceResolution: true

// @filename: c:/root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@speedy/*/testing": [
               "*/dist/index.ts"
            ]
        }
    }
}

// @filename: c:/root/index.ts
import {x} from "@speedy/folder1/testing"

// @filename: c:/root/folder1/dist/index.ts
export const x = 1 + 2;
