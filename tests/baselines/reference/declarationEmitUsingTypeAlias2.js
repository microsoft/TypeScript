//// [tests/cases/compiler/declarationEmitUsingTypeAlias2.ts] ////

//// [inner.d.ts]
export declare type Other = { other: string };
export declare type SomeType = { arg: Other };

//// [indirection.d.ts]
import { Other as IndirectOther, SomeType as IndirectSomeType } from './inner';
export declare type Other = IndirectOther;
export declare type SomeType = IndirectSomeType

//// [index.d.ts]
import { Other, SomeType as IndirectSomeType } from './indirection';
export type OtherType = Other;
export type SomeType = IndirectSomeType;

//// [package.json]
{
  "name": "some-dep",
  "exports": {
    ".": "./dist/index.js"
  }
}

//// [index.ts]
import { SomeType } from "some-dep";

export const foo = (thing: SomeType) => {
  return thing;
};

export const bar = (thing: SomeType) => {
  return thing.arg;
};

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = exports.foo = void 0;
var foo = function (thing) {
    return thing;
};
exports.foo = foo;
var bar = function (thing) {
    return thing.arg;
};
exports.bar = bar;


//// [index.d.ts]
import { SomeType } from "some-dep";
export declare const foo: (thing: SomeType) => import("some-dep").SomeType;
export declare const bar: (thing: SomeType) => import("some-dep").OtherType;
