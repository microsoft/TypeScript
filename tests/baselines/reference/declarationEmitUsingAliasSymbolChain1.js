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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var effect_1 = require("effect");
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Foo;
}(effect_1.Data.TaggedClass("Foo")));
exports.Foo = Foo;


//// [index.d.ts]
import { Data } from "effect";
declare const Foo_base: new <A extends Record<string, any>>(args: import("effect").Types.Equals<Omit<A, keyof import("effect").Equal.Equal>, {}> extends true ? void : Omit<A, keyof import("effect").Equal.Equal>) => Data.Data<A & {
    _tag: "Foo";
}>;
export declare class Foo extends Foo_base<{}> {
}
export {};
