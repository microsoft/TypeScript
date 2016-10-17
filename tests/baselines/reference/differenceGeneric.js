//// [differenceGeneric.ts]
interface Gen {
    x: any;
}
interface Gen2 {
    parent: Gen;
    millenial: any;
}
function cloneAgain<T extends Gen & Gen2>(t: T): T {
    let y: Gen;
    let rest: T - Gen;
    let rest1: T - Gen - Gen2;
    var { x, ...rest2 } = t;
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
    var y;
    var rest;
    var rest1;
    var x = t.x, rest2 = __rest(t, ["x"]);
    return t;
}
