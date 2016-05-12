//// [objectRestElementNegative.ts]
let o = { a: 1, b: 'no' };
var { ...mustBeLast, a } = o;
function stillMustBeLast({ ...mustBeLast, a }: {a: number, b: string}): void {
}
// TODO: generics are not allowed


//// [objectRestElementNegative.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && !e.indexOf(p))
        t[p] = s[p];
    return t;
};
var o = { a: 1, b: 'no' };
var mustBeLast = __rest(o, ["a"]), a = o.a;
function stillMustBeLast(_a) {
    var mustBeLast = __rest(_a, ["a"]), a = _a.a;
}
// TODO: generics are not allowed
