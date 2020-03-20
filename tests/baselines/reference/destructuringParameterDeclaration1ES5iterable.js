//// [destructuringParameterDeclaration1ES5iterable.ts]
// A parameter declaration may specify either an identifier or a binding pattern.
// The identifiers specified in parameter declarations and binding patterns
// in a parameter list must be unique within that parameter list.

// If the declaration includes a type annotation, the parameter is of that type
function a1([a, b, [[c]]]: [number, number, string[][]]) { }
function a2(o: { x: number, a: number }) { }
function a3({j, k, l: {m, n}, q: [a, b, c]}: { j: number, k: string, l: { m: boolean, n: number }, q: (number|string)[] }) { };
function a4({x, a}: { x: number, a: number }) { }

a1([1, 2, [["world"]]]);
a1([1, 2, [["world"]], 3]);

// If the declaration includes an initializer expression (which is permitted only
// when the parameter list occurs in conjunction with a function body),
// the parameter type is the widened form (section 3.11) of the type of the initializer expression.

function b1(z = [undefined, null]) { };
function b2(z = null, o = { x: 0, y: undefined }) { }
function b3({z: {x, y: {j}}} = { z: { x: "hi", y: { j: 1 } } }) { }

interface F1 {
    b5(z, y, [, a, b], {p, m: { q, r}});
}

function b6([a, z, y] = [undefined, null, undefined]) { }
function b7([[a], b, [[c, d]]] = [[undefined], undefined, [[undefined, undefined]]]) { }

b1([1, 2, 3]);  // z is widen to the type any[]
b2("string", { x: 200, y: "string" });
b2("string", { x: 200, y: true });
b6(["string", 1, 2]);                    // Shouldn't be an error
b7([["string"], 1, [[true, false]]]);    // Shouldn't be an error


// If the declaration specifies a binding pattern, the parameter type is the implied type of that binding pattern (section 5.1.3)
enum Foo { a }
function c0({z: {x, y: {j}}}) { }
function c1({z} = { z: 10 }) { }
function c2({z = 10}) { }
function c3({b}: { b: number|string} = { b: "hello" }) { }
function c5([a, b, [[c]]]) { }
function c6([a, b, [[c=1]]]) { }

c0({z : { x: 1, y: { j: "world" } }});      // Implied type is { z: {x: any, y: {j: any}} }
c0({z : { x: "string", y: { j: true } }});  // Implied type is { z: {x: any, y: {j: any}} }

c1();             // Implied type is {z:number}?
c1({ z: 1 })      // Implied type is {z:number}?

c2({});         // Implied type is {z?: number}
c2({z:1});      // Implied type is {z?: number}

c3({ b: 1 });     // Implied type is { b: number|string }.

c5([1, 2, [["string"]]]);               // Implied type is is [any, any, [[any]]]
c5([1, 2, [["string"]], false, true]);  // Implied type is is [any, any, [[any]]]

// A parameter can be marked optional by following its name or binding pattern with a question mark (?)
// or by including an initializer.

function d0(x?) { }
function d0(x = 10) { }

interface F2 {
    d3([a, b, c]?);
    d4({x, y, z}?);
    e0([a, b, c]);
}

class C2 implements F2 {
    constructor() { }
    d3() { }
    d4() { }
    e0([a, b, c]) { }
}

class C3 implements F2 {
    d3([a, b, c]) { }
    d4({x, y, z}) { }
    e0([a, b, c]) { }
}


function d5({x, y} = { x: 1, y: 2 }) { }
d5();  // Parameter is optional as its declaration included an initializer

// Destructuring parameter declarations do not permit type annotations on the individual binding patterns,
// as such annotations would conflict with the already established meaning of colons in object literals.
// Type annotations must instead be written on the top- level parameter declaration

function e1({x: number}) { }  // x has type any NOT number
function e2({x}: { x: number }) { }  // x is type number
function e3({x}: { x?: number }) { }  // x is an optional with type number
function e4({x: [number,string,any] }) { }  // x has type [any, any, any]
function e5({x: [a, b, c]}: { x: [number, number, number] }) { }  // x has type [any, any, any]


//// [destructuringParameterDeclaration1ES5iterable.js]
// A parameter declaration may specify either an identifier or a binding pattern.
// The identifiers specified in parameter declarations and binding patterns
// in a parameter list must be unique within that parameter list.
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
// If the declaration includes a type annotation, the parameter is of that type
function a1(_a) {
    var _b = __read(_a, 3), a = _b[0], b = _b[1], _c = __read(_b[2], 1), _d = __read(_c[0], 1), c = _d[0];
}
function a2(o) { }
function a3(_e) {
    var j = _e.j, k = _e.k, _f = _e.l, m = _f.m, n = _f.n, _g = __read(_e.q, 3), a = _g[0], b = _g[1], c = _g[2];
}
;
function a4(_h) {
    var x = _h.x, a = _h.a;
}
a1([1, 2, [["world"]]]);
a1([1, 2, [["world"]], 3]);
// If the declaration includes an initializer expression (which is permitted only
// when the parameter list occurs in conjunction with a function body),
// the parameter type is the widened form (section 3.11) of the type of the initializer expression.
function b1(z) {
    if (z === void 0) { z = [undefined, null]; }
}
;
function b2(z, o) {
    if (z === void 0) { z = null; }
    if (o === void 0) { o = { x: 0, y: undefined }; }
}
function b3(_j) {
    var _k = (_j === void 0 ? { z: { x: "hi", y: { j: 1 } } } : _j).z, x = _k.x, j = _k.y.j;
}
function b6(_l) {
    var _m = __read(_l === void 0 ? [undefined, null, undefined] : _l, 3), a = _m[0], z = _m[1], y = _m[2];
}
function b7(_o) {
    var _p = __read(_o === void 0 ? [[undefined], undefined, [[undefined, undefined]]] : _o, 3), _q = __read(_p[0], 1), a = _q[0], b = _p[1], _r = __read(_p[2], 1), _s = __read(_r[0], 2), c = _s[0], d = _s[1];
}
b1([1, 2, 3]); // z is widen to the type any[]
b2("string", { x: 200, y: "string" });
b2("string", { x: 200, y: true });
b6(["string", 1, 2]); // Shouldn't be an error
b7([["string"], 1, [[true, false]]]); // Shouldn't be an error
// If the declaration specifies a binding pattern, the parameter type is the implied type of that binding pattern (section 5.1.3)
var Foo;
(function (Foo) {
    Foo[Foo["a"] = 0] = "a";
})(Foo || (Foo = {}));
function c0(_t) {
    var _u = _t.z, x = _u.x, j = _u.y.j;
}
function c1(_v) {
    var z = (_v === void 0 ? { z: 10 } : _v).z;
}
function c2(_w) {
    var _x = _w.z, z = _x === void 0 ? 10 : _x;
}
function c3(_y) {
    var b = (_y === void 0 ? { b: "hello" } : _y).b;
}
function c5(_z) {
    var _0 = __read(_z, 3), a = _0[0], b = _0[1], _1 = __read(_0[2], 1), _2 = __read(_1[0], 1), c = _2[0];
}
function c6(_3) {
    var _4 = __read(_3, 3), a = _4[0], b = _4[1], _5 = __read(_4[2], 1), _6 = __read(_5[0], 1), _7 = _6[0], c = _7 === void 0 ? 1 : _7;
}
c0({ z: { x: 1, y: { j: "world" } } }); // Implied type is { z: {x: any, y: {j: any}} }
c0({ z: { x: "string", y: { j: true } } }); // Implied type is { z: {x: any, y: {j: any}} }
c1(); // Implied type is {z:number}?
c1({ z: 1 }); // Implied type is {z:number}?
c2({}); // Implied type is {z?: number}
c2({ z: 1 }); // Implied type is {z?: number}
c3({ b: 1 }); // Implied type is { b: number|string }.
c5([1, 2, [["string"]]]); // Implied type is is [any, any, [[any]]]
c5([1, 2, [["string"]], false, true]); // Implied type is is [any, any, [[any]]]
// A parameter can be marked optional by following its name or binding pattern with a question mark (?)
// or by including an initializer.
function d0(x) { }
function d0(x) {
    if (x === void 0) { x = 10; }
}
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.d3 = function () { };
    C2.prototype.d4 = function () { };
    C2.prototype.e0 = function (_8) {
        var _9 = __read(_8, 3), a = _9[0], b = _9[1], c = _9[2];
    };
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    C3.prototype.d3 = function (_10) {
        var _11 = __read(_10, 3), a = _11[0], b = _11[1], c = _11[2];
    };
    C3.prototype.d4 = function (_12) {
        var x = _12.x, y = _12.y, z = _12.z;
    };
    C3.prototype.e0 = function (_13) {
        var _14 = __read(_13, 3), a = _14[0], b = _14[1], c = _14[2];
    };
    return C3;
}());
function d5(_15) {
    var _16 = _15 === void 0 ? { x: 1, y: 2 } : _15, x = _16.x, y = _16.y;
}
d5(); // Parameter is optional as its declaration included an initializer
// Destructuring parameter declarations do not permit type annotations on the individual binding patterns,
// as such annotations would conflict with the already established meaning of colons in object literals.
// Type annotations must instead be written on the top- level parameter declaration
function e1(_17) {
    var number = _17.x;
} // x has type any NOT number
function e2(_18) {
    var x = _18.x;
} // x is type number
function e3(_19) {
    var x = _19.x;
} // x is an optional with type number
function e4(_20) {
    var _21 = __read(_20.x, 3), number = _21[0], string = _21[1], any = _21[2];
} // x has type [any, any, any]
function e5(_22) {
    var _23 = __read(_22.x, 3), a = _23[0], b = _23[1], c = _23[2];
} // x has type [any, any, any]
