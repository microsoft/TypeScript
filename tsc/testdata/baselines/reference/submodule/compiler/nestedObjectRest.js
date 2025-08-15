//// [tests/cases/compiler/nestedObjectRest.ts] ////

//// [nestedObjectRest.ts]
// https://github.com/microsoft/TypeScript/issues/43400
var x, y;

[{ ...x }] = [{ abc: 1 }];
for ([{ ...y }] of [[{ abc: 1 }]]) ;

//// [nestedObjectRest.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b, _c;
// https://github.com/microsoft/TypeScript/issues/43400
var x, y;
_a = [{ abc: 1 }], [_b] = _a, x = __rest(_b, []);
for (let _d of [[{ abc: 1 }]]) {
    [_c] = _d, y = __rest(_c, []);
    ;
}
