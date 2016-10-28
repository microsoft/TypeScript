//// [objectRestForOf.ts]
let array: { x: number, y: string }[];
for (let { x, ...restOf } of array) {
    [x, restOf];
}
let xx: number;
let rrestOff: { y: string };
for ({ x: xx, ...rrestOff } of array ) {
    [xx, rrestOff];
}
for (const norest of array.map(a => ({ ...a, x: 'a string' }))) {
    [norest.x, norest.y];
    // x is now a string. who knows why.
}


//// [objectRestForOf.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && !e.indexOf(p))
        t[p] = s[p];
    return t;
};
var array;
for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
    var _a = array_1[_i];
    var x = _a.x, restOf = __rest(_a, ["x"]);
    [x, restOf];
}
var xx;
var rrestOff;
for (var _b = 0, array_2 = array; _b < array_2.length; _b++) {
    var _c = array_2[_b];
    (xx = _c.x, _c, rrestOff = __rest(_c, ["x"]));
    [xx, rrestOff];
}
for (var _d = 0, _e = array.map(function (a) { return (__assign({}, a, { x: 'a string' })); }); _d < _e.length; _d++) {
    var norest = _e[_d];
    [norest.x, norest.y];
}
