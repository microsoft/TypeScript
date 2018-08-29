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
        ">=3.1.0-0": { "*" : ["ts3.1/*"] }
    }
}

// @filename: node_modules/ext/index.d.ts
export interface A {}
export function fa(): A;

// @filename: node_modules/ext/other.d.ts
export interface B {}
export function fb(): B;

// @filename: node_modules/ext/ts3.1/index.d.ts
export interface A {}
export function fa(): A;

// @filename: node_modules/ext/ts3.1/other.d.ts
export interface B {}
export function fb(): B;

// @filename: main.ts
import { fa } from "ext";
import { fb } from "ext/other";

export const va = fa();
export const vb = fb();

// @filename: tsconfig.json
{}