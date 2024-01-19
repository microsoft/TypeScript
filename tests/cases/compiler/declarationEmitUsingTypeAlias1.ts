// @strict: true
// @declaration: true
// @module: nodenext

// @filename: node_modules/some-dep/dist/inner.d.ts
export declare type Other = { other: string };
export declare type SomeType = { arg: Other };

// @filename: node_modules/some-dep/dist/index.d.ts
export type OtherType = import('./inner').Other;
export type SomeType = import('./inner').SomeType;

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