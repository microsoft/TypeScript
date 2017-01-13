//// [objectRestNested.ts]
type Abc = { a: number, b: string, c: boolean }
let abc: Abc;
var { a, ...{ b, ...rest } } = abc;
var a: number;
var b: string;
var other: { c: boolean };
({ a, ...{ b, ...other } } = abc);

function f<T extends Abc>(t: T) {
    let other: rest(rest(T, 'a'), 'b')
    var { a, ...{ b, ...rest } } = t;
    ({ a, ...{ b, ...rest } } = t);
    other = rest;
    rest = other;
    rest.c;
    return rest;
}

f({ a: 1, b: 'foo', c: false, d: 54 });




//// [objectRestNested.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var abc;
var a = abc.a, _a = __rest(abc, ["a"]), b = _a.b, rest = __rest(_a, ["b"]);
var a;
var b;
var other;
(a = abc.a, abc, _b = __rest(abc, ["a"]), (b = _b.b, _b), other = __rest(_b, ["b"]));
function f(t) {
    var other;
    var a = t.a, _a = __rest(t, ["a"]), b = _a.b, rest = __rest(_a, ["b"]);
    (a = t.a, t, _b = __rest(t, ["a"]), (b = _b.b, _b), rest = __rest(_b, ["b"]));
    other = rest;
    rest = other;
    rest.c;
    return rest;
    var _b;
}
f({ a: 1, b: 'foo', c: false, d: 54 });
var _b;
