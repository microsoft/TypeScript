// @strict: true
// @declaration: true
// @module: nodenext

// @filename: node_modules/some-dep/dist/inner.d.ts
export declare type Other = { other: string };
export declare type SomeType = { arg: Other };

// @filename: node_modules/some-dep/dist/indirection.d.ts
import { Other as IndirectOther, SomeType as IndirectSomeType } from './inner';
export declare type Other = IndirectOther;
export declare type SomeType = IndirectSomeType

// @filename: node_modules/some-dep/dist/index.d.ts
import { Other, SomeType as IndirectSomeType } from './indirection';
export type OtherType = Other;
export type SomeType = IndirectSomeType;

// @filename: node_modules/some-dep/package.json
{
  "name": "some-dep",
  "exports": {
    ".": "./dist/index.js"
  }
}

// @filename: src/index.ts
import { SomeType } from "some-dep";

export const foo = (thing: SomeType) => {
  return thing;
};

export const bar = (thing: SomeType) => {
  return thing.arg;
};