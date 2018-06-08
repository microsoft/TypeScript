//// [objectRestAssignment.ts]
let ka: any;
let nested: { ki };
let other: number;
let rest: { };
let complex: { x: { ka, ki }, y: number };
({x: { ka, ...nested }, y: other, ...rest} = complex);

// should be:
let overEmit: { a: { ka: string, x: string }[], b: { z: string, ki: string, ku: string }, ke: string, ko: string };

// var _g = overEmit.a, [_h, ...y] = _g, nested2 = __rest(_h, []), _j = overEmit.b, { z } = _j, c = __rest(_j, ["z"]), rest2 = __rest(overEmit, ["a", "b"]);
var { a: [{ ...nested2 }, ...y], b: { z, ...c }, ...rest2 } = overEmit;
({ a: [{ ...nested2 }, ...y], b: { z, ...c }, ...rest2 } = overEmit);


//// [objectRestAssignment.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var _a, _b, _c;
let ka;
let nested;
let other;
let rest;
let complex;
(_a = complex.x, { ka } = _a, nested = __rest(_a, ["ka"]), { y: other } = complex, rest = __rest(complex, ["x", "y"]));
// should be:
let overEmit;
// var _g = overEmit.a, [_h, ...y] = _g, nested2 = __rest(_h, []), _j = overEmit.b, { z } = _j, c = __rest(_j, ["z"]), rest2 = __rest(overEmit, ["a", "b"]);
var [_d, ...y] = overEmit.a, nested2 = __rest(_d, []), _e = overEmit.b, { z } = _e, c = __rest(_e, ["z"]), rest2 = __rest(overEmit, ["a", "b"]);
([_b, ...y] = overEmit.a, nested2 = __rest(_b, []), _c = overEmit.b, { z } = _c, c = __rest(_c, ["z"]), rest2 = __rest(overEmit, ["a", "b"]));
