//// [objectRestNegative.ts]
let o = { a: 1, b: 'no' };
var { ...mustBeLast, a } = o;
function stillMustBeLast({ ...mustBeLast, a }: { a: number, b: string }): void {
}
function generic<T extends { x, y }>(t: T) {
    let { x, ...rest } = t;
    return rest;
}


//// [objectRestNegative.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && !e.indexOf(p))
        t[p] = s[p];
    return t;
};
var o = { a: 1, b: 'no' };
var mustBeLast = o.mustBeLast, a = o.a;
function stillMustBeLast(_a) {
    var mustBeLast = _a.mustBeLast, a = _a.a;
}
function generic(t) {
    var x = t.x, rest = __rest(t, ["x"]);
    return rest;
}
