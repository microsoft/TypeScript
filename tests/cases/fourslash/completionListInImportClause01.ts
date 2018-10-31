/// <reference path='fourslash.ts'/>
// @ModuleResolution: classic

// @Filename: m1.ts
////export var foo: number = 1;
////export function bar() { return 10; }
////export function baz() { return 10; }

// @Filename: m2.ts
////import {/*1*/, /*2*/ from "m1"
////import {/*3*/} from "m1"
////import {foo,/*4*/ from "m1"
////import {bar as /*5*/, /*6*/ from "m1"
////import {foo, bar, baz as b,/*7*/} from "m1"

verify.completions(
    { marker: ["1", "2", "3"], exact: ["bar", "baz", "foo"] },
    { marker: "4", exact: ["bar", "baz"] },
    { marker: "5", exact: undefined, isNewIdentifierLocation: true },
    { marker: "6", exact: ["baz", "foo"] },
    { marker: "7", exact: undefined },
);
