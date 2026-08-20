//// [tests/cases/compiler/subpathImportsJS.ts] ////

//// [package.json]
{
  "name": "pkg",
  "type": "module",
  "imports": {
    "#subpath": "./dist/subpath.js"
  }
}

//// [subpath.ts]
export const foo = "foo";

//// [index.ts]
import { foo } from "#subpath";
foo;


//// [subpath.js]
export const foo = "foo";
//// [index.js]
import { foo } from "#subpath";
foo;


//// [subpath.d.ts]
export declare const foo = "foo";
//// [index.d.ts]
export {};
