// @module: nodenext
// @declaration: true
// @emitDeclarationOnly: true
// @allowImportingTsExtensions: true

// Regression test for https://github.com/microsoft/typescript-go/issues/4616
// When a file uses `.ts` extension relative imports with allowImportingTsExtensions,
// declaration emit should preserve `.js` extensions on non-relative (node_modules) imports.

// @Filename: /package.json
{ "type": "module" }

// @Filename: /node_modules/mylib/package.json
{ "name": "mylib", "version": "1.0.0", "main": "./lib/index.js" }

// @Filename: /node_modules/mylib/lib/Box.d.ts
export interface Box<T> { readonly value: T }
export declare function box<T>(value: T): Box<T>;

// @Filename: /helper.ts
import * as B from 'mylib/lib/Box.js';
export const inner = B.box('hello');

// @Filename: /mod.ts
import { inner } from './helper.ts';
export const out = inner;
