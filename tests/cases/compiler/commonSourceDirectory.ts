// Test that importing a file from `node_modules` does not affect calculation of the common source directory.
// @noImplicitReferences: true
// @moduleResolution: node
// @fullEmitPaths: true

// @filename: /node_modules/foo/index.ts
export const x = 0;

// @filename: /types/bar.d.ts
declare module "bar" {
    export const y = 0;
}

// @filename: /app/index.ts
/// <reference path="../types/bar.d.ts" preserve="true" />
import { x } from "foo";
import { y } from "bar";
x + y;

// @filename: /app/tsconfig.json
{
    "compilerOptions": {
        "outDir": "bin",
        "typeRoots": ["../types"],
        "sourceMap": true,
        "mapRoot": "myMapRoot",
        "sourceRoot": "mySourceRoot",
        "declaration": true
    }
}
