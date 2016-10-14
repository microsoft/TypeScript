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

function cloneAgain({ ...clone }: { a: number, b: string }): void {
}


//// [objectRest.js]
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
    var clone = __rest(_a, []);
}
