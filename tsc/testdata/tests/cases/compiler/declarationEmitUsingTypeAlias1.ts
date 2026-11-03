// @target: es2015
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

// @filename: node_modules/deep-types/package.json
{
  "name": "deep-types",
  "exports": {
    ".": { "types": "./index.d.ts" }
  }
}

// @filename: node_modules/deep-types/index.d.ts
export type { HelperDeep, InlineDeep, PublicMapped } from "./source.js";
export { mapped } from "./source.js";

// @filename: node_modules/deep-types/source.d.ts
export type HelperDeep<T> = T extends object ? _HelperObjectDeep<T> : T;
export type _HelperObjectDeep<T> = { readonly [K in keyof T]: HelperDeep<T[K]> };
export type InlineDeep<T> = T extends object ? { readonly [K in keyof T]: InlineDeep<T[K]> } : T;
export type PublicMapped<T> = { readonly [K in keyof T]: T[K] };
export declare function mapped<T>(value: T): _HelperObjectDeep<T>;

// @filename: src/mapped.ts
import type { HelperDeep, InlineDeep, PublicMapped } from "deep-types";

type Tree = { value: string; children: Tree[] };
declare function helper<T>(value: T): HelperDeep<T>;
declare function inline<T>(value: T): InlineDeep<T>;
declare function publicMapped<T>(value: T): PublicMapped<T>;

export const recursive = helper({} as Tree);
export const finite = helper({ value: "text" });
export const inlined = inline({} as Tree);
export const named = publicMapped({ value: "text" });

// @filename: src/genericMapped.ts
import { mapped } from "deep-types";

export const generic = <T>(value: T) => mapped(value);