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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function join(l) {
    return __spreadArrays(['marker'], l);
}
function a(l) {
    var x = join(l);
}
