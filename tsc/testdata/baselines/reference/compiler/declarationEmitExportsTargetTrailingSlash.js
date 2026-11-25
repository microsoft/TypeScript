//// [tests/cases/compiler/declarationEmitExportsTargetTrailingSlash.ts] ////

//// [package.json]
{ "name": "pkg", "exports": { ".": "./index.js/" } }

//// [index.d.ts]
export interface L { x: number }

//// [package.json]
{ "name": "dep" }

//// [index.d.ts]
import type { L } from "../pkg/index";
export declare function make(): L;

//// [main.ts]
import { make } from "dep";
export const v = make();


//// [main.js]
import { make } from "dep";
export const v = make();
