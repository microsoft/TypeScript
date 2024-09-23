//// [tests/cases/compiler/arrayUnionPassedTypeArgumentFindsFallbackSignature.ts] ////

//// [arrayUnionPassedTypeArgumentFindsFallbackSignature.ts]
export function groupBy<T>(array: Array<T> | ReadonlyArray<T>) {
    array.reduce<any>((acc, element) => {
        throw new Error();
    }, {});
}


//// [arrayUnionPassedTypeArgumentFindsFallbackSignature.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = groupBy;
function groupBy(array) {
    array.reduce(function (acc, element) {
        throw new Error();
    }, {});
}
