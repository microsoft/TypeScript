//// [tests/cases/compiler/duplicatePackage_typesOutsidePackageDirectory.ts] ////

//// [index.d.ts]
import { C } from "pkg";
export declare const a: C;

//// [index.d.ts]
export declare class C { private p; }

//// [package.json]
{ "name": "pkg", "version": "1.0.0", "types": "../pkg-x/index.d.ts" }

//// [index.d.ts]
import { C } from "pkg";
export declare const b: C;

//// [package.json]
{ "name": "pkg", "version": "1.0.0", "types": "./x/index.d.ts" }

//// [index.d.ts]
export declare class C { private p; }

//// [index.ts]
import { a } from "a";
import { b } from "b";
let x = a;
x = b;


//// [index.js]
import { a } from "a";
import { b } from "b";
let x = a;
x = b;
