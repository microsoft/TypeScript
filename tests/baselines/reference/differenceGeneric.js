//// [differenceGeneric.ts]
interface Gen {
    x: any;
}
function cloneAgain<T extends Gen>(t: T): T {
    let { x, ...rest } = t;
    return t;
}


//// [differenceGeneric.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && !e.indexOf(p))
        t[p] = s[p];
    return t;
};
function cloneAgain(t) {
    var x = t.x, rest = __rest(t, ["x"]);
    return t;
}
