//// [tests/cases/compiler/declarationEmitUnreachablePackageExports.ts] ////

//// [package.json]
{ "name": "c-root", "version": "1.0.0", "type": "module", "exports": { ".": "./dist/Thing.d.ts" } }
//// [Thing.d.ts]
export interface Thing { readonly x: number; }
export declare const create: () => Thing;

//// [package.json]
{ "name": "c-subpath", "version": "1.0.0", "type": "module", "exports": { "./Thing": { "types": "./dist/Thing.d.ts", "default": "./dist/Thing.js" } } }
//// [Thing.d.ts]
export interface Thing { readonly x: number; }
export declare const create: () => Thing;

//// [package.json]
{ "name": "c-pattern", "version": "1.0.0", "type": "module", "exports": { "./*": "./dist/*.d.ts" } }
//// [Thing.d.ts]
export interface Thing { readonly x: number; }
export declare const create: () => Thing;

//// [package.json]
{ "name": "s", "type": "module", "exports": "./index.d.ts" }
//// [index.d.ts]
import { create as createRoot } from "c-root";
import { create as createSubpath } from "c-subpath/Thing";
import { create as createPattern } from "c-pattern/Thing";
export declare const root: ReturnType<typeof createRoot>;
export declare const subpath: ReturnType<typeof createSubpath>;
export declare const pattern: ReturnType<typeof createPattern>;

//// [package.json]
{ "name": "a", "type": "module" }
//// [index.ts]
import { root, subpath, pattern } from "s";
export const thing = { root, subpath, pattern };

//// [reachable.ts]
import { root, subpath, pattern } from "./index.js";
export const thing = { root, subpath, pattern };





//// [reachable.d.ts]
export declare const thing: {
    root: import("c-root").Thing;
    subpath: import("c-subpath/Thing").Thing;
    pattern: import("c-pattern/Thing").Thing;
};
