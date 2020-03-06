//// [declarationEmitInferredTypeAlias9.ts]
type Foo<T> = T | { x: Foo<T> };
var x: Foo<number[]>;

export function returnSomeGlobalValue() {
    return x;
}

//// [declarationEmitInferredTypeAlias9.js]
"use strict";
exports.__esModule = true;
exports.returnSomeGlobalValue = void 0;
var x;
function returnSomeGlobalValue() {
    return x;
}
exports.returnSomeGlobalValue = returnSomeGlobalValue;


//// [declarationEmitInferredTypeAlias9.d.ts]
declare type Foo<T> = T | {
    x: Foo<T>;
};
export declare function returnSomeGlobalValue(): Foo<number[]>;
export {};
