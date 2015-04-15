//// [destructuringArrayBindingPatternAndAssignment1.ts]
var [p0,p1, p2] : any = [2, 3, 4];
var [a, b, c]: [number, number, string] = [1, 2, "string"];
var [d, e]: any = undefined;
var [f = false, g = 1]: any = undefined;
g = 10;
f = true;

var [x] = []
var [[[y]], [[[[z]]]]] = [[[]], [[[[]]]]]
var [[w], m]: [[string|number], boolean] = [[1], true];
interface J extends Array<Number> {
    2: number;
}

var [, w1] = [1, 2, 3];
var [,,, w2] = [1, 2, 3, 4];
var [,,, w2] = [1, 2, 3, 4];
var [,,,...w3] = [1, 2, 3, 4, "hello"];

var [r, s, ...t] = [1, 2, "string"];
var [r1, s1, t1] = [1, 2, "string"];



//// [destructuringArrayBindingPatternAndAssignment1.js]
var _a = [2, 3, 4], p0 = _a[0], p1 = _a[1], p2 = _a[2];
var _b = [1, 2, "string"], a = _b[0], b = _b[1], c = _b[2];
var d = undefined[0], e = undefined[1];
var _c = undefined[0], f = _c === void 0 ? false : _c, _d = undefined[1], g = _d === void 0 ? 1 : _d;
g = 10;
f = true;
var x = ([])[0];
var _e = [[[]], [[[[]]]]], y = _e[0][0][0], z = _e[1][0][0][0][0];
var _f = [[1], true], w = _f[0][0], m = _f[1];
var _g = [1, 2, 3], w1 = _g[1];
var _h = [1, 2, 3, 4], w2 = _h[3];
var _j = [1, 2, 3, 4], w2 = _j[3];
var _k = [1, 2, 3, 4, "hello"], w3 = _k.slice(3);
var _l = [1, 2, "string"], r = _l[0], s = _l[1], t = _l.slice(2);
var _m = [1, 2, "string"], r1 = _m[0], s1 = _m[1], t1 = _m[2];
