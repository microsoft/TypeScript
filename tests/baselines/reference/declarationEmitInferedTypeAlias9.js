//// [declarationEmitInferedTypeAlias9.ts]
type Foo<T> = T | { x: Foo<T> };
var x: Foo<number[]>;

export function returnSomeGlobalValue() {
    return x;
}

//// [declarationEmitInferedTypeAlias9.js]
"use strict";
exports.__esModule = true;
var x;
function returnSomeGlobalValue() {
    return x;
}
exports.returnSomeGlobalValue = returnSomeGlobalValue;


//// [declarationEmitInferedTypeAlias9.d.ts]
export declare function returnSomeGlobalValue(): number[] | {
    x: number[] | any;
};
