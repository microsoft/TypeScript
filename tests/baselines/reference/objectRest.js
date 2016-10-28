//// [objectRest.ts]

let o = { a: 1, b: 'no' }
var { ...clone } = o;
var { a, ...justB } = o;
var { a, b: renamed, ...empty } = o;
var { ['b']: renamed, ...justA } = o;
var { 'b': renamed, ...justA } = o;
var { b: { '0': n, '1': oooo }, ...justA } = o;

let o2 = { c: 'terrible idea?', d: 'yes' };
var { d: renamed, ...d } = o2;
function cloneAgain({ a, ...clone }: { a: number, b: string }): void {
}
let array: { x: number, y: string }[];
for (let { x, ...restOf } of array) {
    [x, restOf];
}
let xx: number;
let rrestOff: { y: string };
for ({ x: xx, ...rrestOff } of array ) {
    [xx, rrestOff];
}


//// [objectRest.js]
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
var o = { a: 1, b: 'no' };
var clone = __rest(o, []);
var a = o.a, justB = __rest(o, ["a"]);
var a = o.a, renamed = o.b, empty = __rest(o, ["a", "b"]);
var _a = 'b', renamed = o[_a], justA = __rest(o, ["b"]);
var renamed = o["b"], justA = __rest(o, ["b"]);
var _b = o.b, n = _b["0"], oooo = _b["1"], justA = __rest(o, ["b"]);
var o2 = { c: 'terrible idea?', d: 'yes' };
var renamed = o2.d, d = __rest(o2, ["d"]);
function cloneAgain(_a) {
    var a = _a.a, clone = __rest(_a, ["a"]);
}
var array;
for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
    var _c = array_1[_i];
    var x = _c.x, restOf = __rest(_c, ["x"]);
    [x, restOf];
}
var xx;
var rrestOff;
for (var _d = 0, array_2 = array; _d < array_2.length; _d++) {
    var _e = array_2[_d];
    (xx = _e.x, _e, rrestOff = __rest(_e, ["x"]));
    [xx, rrestOff];
}
