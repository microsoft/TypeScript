//// [tests/cases/compiler/declarationEmitInferredTypeAlias9.ts] ////

//// [declarationEmitInferredTypeAlias9.ts]
type Foo<T> = T | { x: Foo<T> };
var x: Foo<number[]>;

export function returnSomeGlobalValue() {
    return x;
}

//// [declarationEmitInferredTypeAlias9.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnSomeGlobalValue = returnSomeGlobalValue;
var x;
function returnSomeGlobalValue() {
    return x;
}


//// [declarationEmitInferredTypeAlias9.d.ts]
type Foo<T> = T | {
    x: Foo<T>;
};
export declare function returnSomeGlobalValue(): Foo<number[]>;
export {};
