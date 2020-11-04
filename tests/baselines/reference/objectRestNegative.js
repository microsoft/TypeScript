//// [objectRestNegative.ts]
let o = { a: 1, b: 'no' };
var { ...mustBeLast, a } = o;

var b: string;
let notAssignable: { a: string };
({ b, ...notAssignable } = o);


function stillMustBeLast({ ...mustBeLast, a }: { a: number, b: string }): void {
}
function generic<T extends { x, y }>(t: T) {
    let { x, ...rest } = t;
    return rest;
}

let rest: { b: string }
({a, ...rest.b + rest.b} = o);


//// [objectRestNegative.js]
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
var o = { a: 1, b: 'no' };
var a = o.a;
var b;
var notAssignable;
(b = o.b, notAssignable = __rest(o, ["b"]));
function stillMustBeLast(_a) {
    var a = _a.a;
}
function generic(t) {
    var x = t.x, rest = __rest(t, ["x"]);
    return rest;
}
var rest;
(a = o.a, rest.b + rest.b = __rest(o, ["a"]));
