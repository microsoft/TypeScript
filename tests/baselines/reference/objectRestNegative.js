//// [objectRestNegative.ts]
let o = { a: 1, b: 'no' };
var { ...mustBeLast, a } = o;
function stillMustBeLast({ ...mustBeLast, a }: { a: number, b: string }): void {
}


//// [objectRestNegative.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && !e.indexOf(p))
        t[p] = s[p];
    return t;
};
var o = { a: 1, b: 'no' };
var ;
function stillMustBeLast(_a) {
    var mustBeLast = _a.mustBeLast, a = _a.a;
}
