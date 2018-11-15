//// [tests/cases/compiler/exportAssignmentMembersVisibleInAugmentation.ts] ////

//// [index.d.ts]
export = foo;
declare namespace foo {
    export type T = number;
}

//// [a.ts]
import * as foo from "foo";
declare module "foo" {
    export function f(): T; // OK
}

//// [b.ts]
import * as foo from "foo";
declare module "foo" {
    export function g(): foo.T; // OK
}


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;


//// [a.d.ts]
declare module "foo" {
    function f(): T;
}
export {};
//// [b.d.ts]
import * as foo from "foo";
declare module "foo" {
    function g(): foo.T;
}
