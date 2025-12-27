// @strict: true
// @declaration: true
// @module: nodenext

// @filename: node_modules/effect/dist/declarations/src/Data.d.ts
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

// @filename: node_modules/effect/dist/declarations/src/Equal.d.ts
import * as Hash from "./Hash.js";

export declare const symbol: unique symbol;

export interface Equal extends Hash.Hash {
  [symbol](that: Equal): boolean;
}

// @filename: node_modules/effect/dist/declarations/src/Hash.d.ts
export declare const symbol: unique symbol;

export interface Hash {
  [symbol](): number;
}

// @filename: node_modules/effect/dist/declarations/src/Types.d.ts
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false;

// @filename: node_modules/effect/dist/declarations/src/index.d.ts
export * as Data from "./Data.js";
export * as Equal from "./Equal.js";
export * as Types from "./Types.js";

// @filename: node_modules/effect/dist/effect.cjs.d.ts
export * from "./declarations/src/index";

// @filename: node_modules/effect/package.json
{
  "name": "effect",
  "exports": {
    ".": "./dist/effect.cjs.js"
  }
}

// @filename: src/index.ts
import { Data } from "effect";
export class Foo extends Data.TaggedClass("Foo")<{}> {}