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
let array;
for (var array_1 of array) {
    var { x } = array_1, restOf = __rest(array_1, ["x"]);
    [x, restOf];
}
let xx;
let rrestOff;
for (var array_2 of array) {
    ({ x: xx } = array_2, rrestOff = __rest(array_2, ["x"]));
    [xx, rrestOff];
}
for (const norest of array.map(a => (__assign({}, a, { x: 'a string' })))) {
    [norest.x, norest.y];
}
