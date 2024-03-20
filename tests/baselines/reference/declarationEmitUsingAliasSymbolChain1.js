//// [tests/cases/compiler/declarationEmitUsingAliasSymbolChain1.ts] ////

//// [Data.d.ts]
import type * as Types from "./Types.js";
import type * as Equal from "./Equal.js";

export type Data<A extends Readonly<Record<string, any>> | ReadonlyArray<any>> =
  Readonly<A> & Equal.Equal;

export declare const TaggedClass: <Key extends string>(
  tag: Key,
) => new <A extends Record<string, any>>(
  args: Types.Equals<Omit<A, keyof Equal.Equal>, {}> extends true
    ? void
    : Omit<A, keyof Equal.Equal>,
) => Data<
  A & {
    _tag: Key;
  }
>;

//// [Equal.d.ts]
import * as Hash from "./Hash.js";

export declare const symbol: unique symbol;

export interface Equal extends Hash.Hash {
  [symbol](that: Equal): boolean;
}

//// [Hash.d.ts]
export declare const symbol: unique symbol;

export interface Hash {
  [symbol](): number;
}

//// [Types.d.ts]
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false;

//// [index.d.ts]
export * as Data from "./Data.js";
export * as Equal from "./Equal.js";
export * as Types from "./Types.js";

//// [effect.cjs.d.ts]
export * from "./declarations/src/index";

//// [package.json]
{
  "name": "effect",
  "exports": {
    ".": "./dist/effect.cjs.js"
  }
}

//// [index.ts]
import { Data } from "effect";
export class Foo extends Data.TaggedClass("Foo")<{}> {}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const effect_1 = require("effect");
class Foo extends effect_1.Data.TaggedClass("Foo") {
}
exports.Foo = Foo;


//// [index.d.ts]
import { Data } from "effect";
declare const Foo_base: new <A extends Record<string, any>>(args: import("effect").Types.Equals<Omit<A, keyof import("effect").Equal.Equal>, {}> extends true ? void : Omit<A, keyof import("effect").Equal.Equal>) => Data.Data<A & {
    _tag: "Foo";
}>;
export declare class Foo extends Foo_base<{}> {
}
export {};
