// @traceResolution: true
// @target: esnext
// @module: commonjs
// @declaration: true
// @noImplicitReferences: true
// @filename: node_modules/ext/package.json
{
    "name": "ext",
    "version": "1.0.0",
    "types": "index",
    "typesVersions": {
        "3.0": { "*" : ["ts3.0/*"] }
    }
}

// @filename: node_modules/ext/index.d.ts
declare module "ext" {
    export interface A {}
    export function fa(): A;
}
declare module "ext/other" {
    export interface B {}
    export function fb(): B;
}
// @filename: node_modules/ext/ts3.0/index.d.ts
declare module "ext" {
    export interface A {}
    export function fa(): A;
}
declare module "ext/other" {
    export interface B {}
    export function fb(): B;
}

// @filename: main.ts
import { fa } from "ext";
import { fb } from "ext/other";

export const va = fa();
export const vb = fb();

// @filename: tsconfig.json
{}