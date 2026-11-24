// @module: esnext
// @moduleResolution: bundler
// @strict: true
// @noImplicitReferences: true

// Both copies of "pkg" have the same name and version. The "types" field of
// the first copy points outside its package directory, to a sibling directory
// whose name starts with "pkg". The package ID of the first copy has no
// sub-module, so the two copies are not merged, and the assignment is an error.

// @filename: /node_modules/a/index.d.ts
import { C } from "pkg";
export declare const a: C;

// @filename: /node_modules/a/node_modules/pkg-x/index.d.ts
export declare class C { private p; }

// @filename: /node_modules/a/node_modules/pkg/package.json
{ "name": "pkg", "version": "1.0.0", "types": "../pkg-x/index.d.ts" }

// @filename: /node_modules/b/index.d.ts
import { C } from "pkg";
export declare const b: C;

// @filename: /node_modules/b/node_modules/pkg/package.json
{ "name": "pkg", "version": "1.0.0", "types": "./x/index.d.ts" }

// @filename: /node_modules/b/node_modules/pkg/x/index.d.ts
export declare class C { private p; }

// @filename: /index.ts
import { a } from "a";
import { b } from "b";
let x = a;
x = b;
