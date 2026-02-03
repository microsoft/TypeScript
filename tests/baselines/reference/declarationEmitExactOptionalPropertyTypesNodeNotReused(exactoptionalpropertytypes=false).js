//// [tests/cases/compiler/declarationEmitExactOptionalPropertyTypesNodeNotReused.ts] ////

//// [declarationEmitExactOptionalPropertyTypesNodeNotReused.ts]
type InexactOptionals<A> = {
    [K in keyof A as undefined extends A[K] ? K : never]?: undefined extends A[K]
    ? A[K] | undefined
    : A[K];
} & {
    [K in keyof A as undefined extends A[K] ? never : K]: A[K];
};

type In = {
    foo?: string;
    bar: number;
    baz: undefined;
}

type Out = InexactOptionals<In>

const foo = <A = {}>() => (x: Out & A) => null

export const baddts = foo()


//// [declarationEmitExactOptionalPropertyTypesNodeNotReused.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baddts = void 0;
var foo = function () { return function (x) { return null; }; };
exports.baddts = foo();


//// [declarationEmitExactOptionalPropertyTypesNodeNotReused.d.ts]
export declare const baddts: (x: {
    foo?: string | undefined;
    baz?: undefined;
} & {
    bar: number;
}) => null;
