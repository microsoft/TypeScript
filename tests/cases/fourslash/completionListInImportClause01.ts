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
////import { type /*8*/ } from "m1";
////import { type b/*9*/ } from "m1";

const type = { name: "type", sortText: completion.SortText.GlobalsOrKeywords };

verify.completions(
    // { marker: ["1", "2", "3"], exact: ["bar", "baz", "foo", type] },
    // { marker: "4", exact: ["bar", "baz", type] },
    // { marker: "5", exact: undefined, isNewIdentifierLocation: true },
    // { marker: "6", exact: ["baz", "foo", type] },
    // { marker: "7", exact: undefined },
    { marker: ["8", "9"], exact: ["bar", "baz", "foo"] }, // No 'type'
);
