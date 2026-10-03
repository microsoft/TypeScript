//// [tests/cases/compiler/ambientModuleImportingItselfNotResolved.ts] ////

//// [package.json]
{ "name": "foo", "version": "1.0.0", "types": "index.d.ts" }

//// [index.d.ts]
declare global {
    var fooGlobal: string;
}
declare function foo(value: unknown): boolean;
export default foo;

//// [declarations.d.ts]
declare module "foo" {
    import _foo from "foo";
    export function isFoo(value: unknown): boolean;
}

//// [a.ts]
/// <reference path="declarations.d.ts" />
fooGlobal;


//// [a.js]
"use strict";
/// <reference path="declarations.d.ts" />
fooGlobal;
