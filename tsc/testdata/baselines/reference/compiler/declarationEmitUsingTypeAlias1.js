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

//// [package.json]
{
  "name": "deep-types",
  "exports": {
    ".": { "types": "./index.d.ts" }
  }
}

//// [index.d.ts]
export type { HelperDeep, InlineDeep, PublicMapped } from "./source.js";
export { mapped } from "./source.js";

//// [source.d.ts]
export type HelperDeep<T> = T extends object ? _HelperObjectDeep<T> : T;
export type _HelperObjectDeep<T> = { readonly [K in keyof T]: HelperDeep<T[K]> };
export type InlineDeep<T> = T extends object ? { readonly [K in keyof T]: InlineDeep<T[K]> } : T;
export type PublicMapped<T> = { readonly [K in keyof T]: T[K] };
export declare function mapped<T>(value: T): _HelperObjectDeep<T>;

//// [mapped.ts]
import type { HelperDeep, InlineDeep, PublicMapped } from "deep-types";

type Tree = { value: string; children: Tree[] };
declare function helper<T>(value: T): HelperDeep<T>;
declare function inline<T>(value: T): InlineDeep<T>;
declare function publicMapped<T>(value: T): PublicMapped<T>;

export const recursive = helper({} as Tree);
export const finite = helper({ value: "text" });
export const inlined = inline({} as Tree);
export const named = publicMapped({ value: "text" });

//// [genericMapped.ts]
import { mapped } from "deep-types";

export const generic = <T>(value: T) => mapped(value);

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
//// [mapped.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.named = exports.inlined = exports.finite = exports.recursive = void 0;
exports.recursive = helper({});
exports.finite = helper({ value: "text" });
exports.inlined = inline({});
exports.named = publicMapped({ value: "text" });
//// [genericMapped.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generic = void 0;
const deep_types_1 = require("deep-types");
const generic = (value) => (0, deep_types_1.mapped)(value);
exports.generic = generic;
