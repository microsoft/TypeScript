//// [tests/cases/compiler/declarationEmitUsingTypeAlias1.ts] ////

//// [inner.d.ts]
export declare type Other = { other: string };
export declare type SomeType = { arg: Other };

//// [index.d.ts]
export type OtherType = import('./inner').Other;
export type SomeType = import('./inner').SomeType;

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
