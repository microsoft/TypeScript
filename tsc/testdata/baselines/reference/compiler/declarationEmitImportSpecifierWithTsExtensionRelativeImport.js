//// [tests/cases/compiler/declarationEmitImportSpecifierWithTsExtensionRelativeImport.ts] ////

//// [package.json]
{ "type": "module" }

//// [package.json]
{ "name": "mylib", "version": "1.0.0", "main": "./lib/index.js" }

//// [Box.d.ts]
export interface Box<T> { readonly value: T }
export declare function box<T>(value: T): Box<T>;

//// [helper.ts]
import * as B from 'mylib/lib/Box.js';
export const inner = B.box('hello');

//// [mod.ts]
import { inner } from './helper.ts';
export const out = inner;




//// [helper.d.ts]
import * as B from 'mylib/lib/Box.js';
export declare const inner: B.Box<string>;
//// [mod.d.ts]
export declare const out: import("mylib/lib/Box.js").Box<string>;
