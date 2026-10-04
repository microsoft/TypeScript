//// [tests/cases/compiler/namespaceExportDestructuringReferences.ts] ////

//// [namespaceExportDestructuringReferences.ts]
namespace N {
    export const key = "a";
    export const source: any = { a: 1, b: undefined, pair: [3, 4] };
    export const fallback = 2;

    export const { [key]: computed, b = fallback } = source;
    export const [x, y] = source.pair;
}


//// [namespaceExportDestructuringReferences.js]
"use strict";
var N;
(function (N) {
    var _a, _b, _c, _d;
    N.key = "a";
    N.source = { a: 1, b: undefined, pair: [3, 4] };
    N.fallback = 2;
    _a = N.source, _b = N.key, N.computed = _a[_b], _c = _a.b, N.b = _c === void 0 ? N.fallback : _c;
    _d = N.source.pair, N.x = _d[0], N.y = _d[1];
})(N || (N = {}));
