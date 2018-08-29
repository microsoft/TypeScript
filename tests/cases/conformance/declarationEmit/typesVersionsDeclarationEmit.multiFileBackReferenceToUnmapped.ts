// @traceResolution: true
// @target: esnext
// @module: commonjs
// @declaration: true
// @filename: node_modules/ext/package.json
{
    "name": "ext",
    "version": "1.0.0",
    "types": "index",
    "typesVersions": {
        ">=3.1.0-0": {
            "index" : ["ts3.1/index"]
        }
    }
}

// @filename: node_modules/ext/index.d.ts
export interface A {}
export function fa(): A;

// @filename: node_modules/ext/other.d.ts
export interface A2 {}
export function fa(): A2;

// @filename: node_modules/ext/ts3.1/index.d.ts
export * from "../other";

// @filename: main.ts
import { fa } from "ext";
import { fa as fa2 } from "ext/other";

export const va = fa();
export const va2 = fa2();

// @filename: tsconfig.json
{}