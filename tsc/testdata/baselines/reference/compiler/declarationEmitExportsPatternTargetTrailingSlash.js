//// [tests/cases/compiler/declarationEmitExportsPatternTargetTrailingSlash.ts] ////

//// [package.json]
{ "name": "pkg", "exports": { "./*": "./dist/*/" } }

//// [foo.d.ts]
export interface L { x: number }

//// [package.json]
{ "name": "dep" }

//// [index.d.ts]
import type { L } from "../pkg/dist/foo";
export declare function make(): L;

//// [main.ts]
import { make } from "dep";
export const v = make();


//// [main.js]
import { make } from "dep";
export const v = make();
