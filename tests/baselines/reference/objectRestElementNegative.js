//// [objectRestElementNegative.ts]
let o = { a: 1, b: 'no' };
var { ...mustBeLast, a } = o;


//// [objectRestElementNegative.js]
var __rest = (this && this.__destructure) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && !e.indexOf(p))
        t[p] = s[p];
    return t;
};
var o = { a: 1, b: 'no' };
var mustBeLast = o.mustBeLast, a = o.a;
