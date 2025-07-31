//// [tests/cases/compiler/narrowingUnionByUnionCandidate1.ts] ////

//// [narrowingUnionByUnionCandidate1.ts]
// https://github.com/microsoft/TypeScript/issues/61581

type Result<A, E> =
  | {
      readonly _tag: "Ok";
      readonly value: A;
    }
  | {
      readonly _tag: "Fail";
      readonly error: E;
    };

declare const isResult: (u: unknown) => u is Result<any, any>;

// return type: Result<A, E> | "ok"
export const fn = <A, E>(inp: Result<A, E> | string) =>
  isResult(inp) ? inp : "ok";


//// [narrowingUnionByUnionCandidate1.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/61581
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn = void 0;
// return type: Result<A, E> | "ok"
var fn = function (inp) {
    return isResult(inp) ? inp : "ok";
};
exports.fn = fn;


//// [narrowingUnionByUnionCandidate1.d.ts]
type Result<A, E> = {
    readonly _tag: "Ok";
    readonly value: A;
} | {
    readonly _tag: "Fail";
    readonly error: E;
};
export declare const fn: <A, E>(inp: Result<A, E> | string) => Result<A, E> | "ok";
export {};
