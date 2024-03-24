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
const foo = (thing) => {
    return thing;
};
exports.foo = foo;
const bar = (thing) => {
    return thing.arg;
};
exports.bar = bar;
