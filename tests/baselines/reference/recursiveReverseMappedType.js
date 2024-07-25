//// [tests/cases/compiler/recursiveReverseMappedType.ts] ////

//// [recursiveReverseMappedType.ts]
// Repro from #38198

type Recur<T> = (
    T extends (unknown[]) ? {} : { [K in keyof T]?: Recur<T[K]> }
) | ['marker', ...Recur<T>[]];

function join<T>(l: Recur<T>[]): Recur<T> {
    return ['marker', ...l];
}

function a<T>(l: Recur<T>[]): void {
    const x: Recur<T> | undefined = join(l);
}


//// [recursiveReverseMappedType.js]
"use strict";
// Repro from #38198
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function join(l) {
    return __spreadArray(['marker'], l, true);
}
function a(l) {
    var x = join(l);
}
