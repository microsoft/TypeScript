//// [noImplicitAnyDestructuringVarDeclaration2.ts]
let [a, b, c] = [1, 2, 3]; // no error
let [a1 = 10, b1 = 10, c1 = 10] = [1, 2, 3]; // no error
let [a2 = undefined, b2 = undefined, c2 = undefined] = [1, 2, 3]; // no error
let [a3 = <any>undefined, b3 = <any>null, c3 = <any>undefined] = [1, 2, 3]; // no error
let [a4] = [<any>undefined], [b4] = [<any>null], c4 = <any>undefined, d4 = <any>null; // no error

let {x, y, z} = { x: 1, y: 2, z: 3 }; // no error
let {x1 = 10, y1 = 10, z1 = 10} = { x1: 1, y1: 2, z1: 3 }; // no error
let {x2 = undefined, y2 = undefined, z2 = undefined} = { x2: 1, y2: 2, z2: 3 }; // no error
let {x3 = <any>undefined, y3 = <any>null, z3 = <any>undefined} = { x3: 1, y3: 2, z3: 3 }; // no error
let {x4} = { x4: <any>undefined }, {y4} = { y4: <any>null }; // no error


//// [noImplicitAnyDestructuringVarDeclaration2.js]
var _a = [1, 2, 3], a = _a[0], b = _a[1], c = _a[2]; // no error
var _b = [1, 2, 3], _c = _b[0], a1 = _c === void 0 ? 10 : _c, _d = _b[1], b1 = _d === void 0 ? 10 : _d, _e = _b[2], c1 = _e === void 0 ? 10 : _e; // no error
var _f = [1, 2, 3], _g = _f[0], a2 = _g === void 0 ? undefined : _g, _h = _f[1], b2 = _h === void 0 ? undefined : _h, _j = _f[2], c2 = _j === void 0 ? undefined : _j; // no error
var _k = [1, 2, 3], _l = _k[0], a3 = _l === void 0 ? undefined : _l, _m = _k[1], b3 = _m === void 0 ? null : _m, _o = _k[2], c3 = _o === void 0 ? undefined : _o; // no error
var a4 = [undefined][0], b4 = [null][0], c4 = undefined, d4 = null; // no error
var _p = { x: 1, y: 2, z: 3 }, x = _p.x, y = _p.y, z = _p.z; // no error
var _q = { x1: 1, y1: 2, z1: 3 }, _r = _q.x1, x1 = _r === void 0 ? 10 : _r, _s = _q.y1, y1 = _s === void 0 ? 10 : _s, _t = _q.z1, z1 = _t === void 0 ? 10 : _t; // no error
var _u = { x2: 1, y2: 2, z2: 3 }, _v = _u.x2, x2 = _v === void 0 ? undefined : _v, _w = _u.y2, y2 = _w === void 0 ? undefined : _w, _x = _u.z2, z2 = _x === void 0 ? undefined : _x; // no error
var _y = { x3: 1, y3: 2, z3: 3 }, _z = _y.x3, x3 = _z === void 0 ? undefined : _z, _0 = _y.y3, y3 = _0 === void 0 ? null : _0, _1 = _y.z3, z3 = _1 === void 0 ? undefined : _1; // no error
var x4 = { x4: undefined }.x4, y4 = { y4: null }.y4; // no error
