// Test that importing a file from `node_modules` does not affect calculation of the common source directory.
// @noImplicitReferences: true
// @moduleResolution: node
// @fullEmitPaths: true

// @filename: /app/lib/bar.d.ts
declare const y: number;

// @filename: /app/src/index.ts
/// <reference path="../lib/bar.d.ts" preserve="true" />
export const x = y;

// @filename: /app/tsconfig.json
{
    "compilerOptions": {
        "outDir": "bin",
        "sourceMap": true,
        "mapRoot": "myMapRoot",
        "sourceRoot": "mySourceRoot",
        "declaration": true
    }
}
