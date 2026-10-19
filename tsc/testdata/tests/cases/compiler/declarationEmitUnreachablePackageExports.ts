// @declaration: true
// @emitDeclarationOnly: true
// @strict: true
// @module: nodenext, preserve
// @noTypesAndSymbols: true

// @filename: /node_modules/.store/c-root/node_modules/c-root/package.json
{ "name": "c-root", "version": "1.0.0", "type": "module", "exports": { ".": "./dist/Thing.d.ts" } }
// @filename: /node_modules/.store/c-root/node_modules/c-root/dist/Thing.d.ts
export interface Thing { readonly x: number; }
export declare const create: () => Thing;

// @filename: /node_modules/.store/c-subpath/node_modules/c-subpath/package.json
{ "name": "c-subpath", "version": "1.0.0", "type": "module", "exports": { "./Thing": { "types": "./dist/Thing.d.ts", "default": "./dist/Thing.js" } } }
// @filename: /node_modules/.store/c-subpath/node_modules/c-subpath/dist/Thing.d.ts
export interface Thing { readonly x: number; }
export declare const create: () => Thing;

// @filename: /node_modules/.store/c-pattern/node_modules/c-pattern/package.json
{ "name": "c-pattern", "version": "1.0.0", "type": "module", "exports": { "./*": "./dist/*.d.ts" } }
// @filename: /node_modules/.store/c-pattern/node_modules/c-pattern/dist/Thing.d.ts
export interface Thing { readonly x: number; }
export declare const create: () => Thing;

// @filename: /packages/s/package.json
{ "name": "s", "type": "module", "exports": "./index.d.ts" }
// @filename: /packages/s/index.d.ts
import { create as createRoot } from "c-root";
import { create as createSubpath } from "c-subpath/Thing";
import { create as createPattern } from "c-pattern/Thing";
export declare const root: ReturnType<typeof createRoot>;
export declare const subpath: ReturnType<typeof createSubpath>;
export declare const pattern: ReturnType<typeof createPattern>;

// @filename: /packages/a/package.json
{ "name": "a", "type": "module" }
// @filename: /packages/a/index.ts
import { root, subpath, pattern } from "s";
export const thing = { root, subpath, pattern };

// @filename: /packages/s/reachable.ts
import { root, subpath, pattern } from "./index.js";
export const thing = { root, subpath, pattern };

// @link: /node_modules/.store/c-root/node_modules/c-root -> /packages/s/node_modules/c-root
// @link: /node_modules/.store/c-subpath/node_modules/c-subpath -> /packages/s/node_modules/c-subpath
// @link: /node_modules/.store/c-pattern/node_modules/c-pattern -> /packages/s/node_modules/c-pattern
// @link: /packages/s -> /packages/a/node_modules/s
