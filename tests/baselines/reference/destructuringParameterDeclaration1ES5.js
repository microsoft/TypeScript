//// [destructuringParameterDeclaration1ES5.ts]
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


//// [destructuringParameterDeclaration1ES5.js]
// A parameter declaration may specify either an identifier or a binding pattern.
// The identifiers specified in parameter declarations and binding patterns
// in a parameter list must be unique within that parameter list.
// If the declaration includes a type annotation, the parameter is of that type
function a1(_a) {
    var a = _a[0], b = _a[1], c = _a[2][0][0];
}
function a2(o) { }
function a3(_b) {
    var j = _b.j, k = _b.k, _c = _b.l, m = _c.m, n = _c.n, _d = _b.q, a = _d[0], b = _d[1], c = _d[2];
}
;
function a4(_e) {
    var x = _e.x, a = _e.a;
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
function b3(_f) {
    var _g = (_f === void 0 ? { z: { x: "hi", y: { j: 1 } } } : _f).z, x = _g.x, j = _g.y.j;
}
function b6(_h) {
    var _j = _h === void 0 ? [undefined, null, undefined] : _h, a = _j[0], z = _j[1], y = _j[2];
}
function b7(_k) {
    var _l = _k === void 0 ? [[undefined], undefined, [[undefined, undefined]]] : _k, a = _l[0][0], b = _l[1], _m = _l[2][0], c = _m[0], d = _m[1];
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
function c0(_o) {
    var _p = _o.z, x = _p.x, j = _p.y.j;
}
function c1(_q) {
    var z = (_q === void 0 ? { z: 10 } : _q).z;
}
function c2(_r) {
    var _s = _r.z, z = _s === void 0 ? 10 : _s;
}
function c3(_t) {
    var b = (_t === void 0 ? { b: "hello" } : _t).b;
}
function c5(_u) {
    var a = _u[0], b = _u[1], c = _u[2][0][0];
}
function c6(_v) {
    var a = _v[0], b = _v[1], _w = _v[2][0][0], c = _w === void 0 ? 1 : _w;
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
    C2.prototype.e0 = function (_x) {
        var a = _x[0], b = _x[1], c = _x[2];
    };
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    C3.prototype.d3 = function (_y) {
        var a = _y[0], b = _y[1], c = _y[2];
    };
    C3.prototype.d4 = function (_z) {
        var x = _z.x, y = _z.y, z = _z.z;
    };
    C3.prototype.e0 = function (_0) {
        var a = _0[0], b = _0[1], c = _0[2];
    };
    return C3;
}());
function d5(_1) {
    var _2 = _1 === void 0 ? { x: 1, y: 2 } : _1, x = _2.x, y = _2.y;
}
d5(); // Parameter is optional as its declaration included an initializer
// Destructuring parameter declarations do not permit type annotations on the individual binding patterns,
// as such annotations would conflict with the already established meaning of colons in object literals.
// Type annotations must instead be written on the top- level parameter declaration
function e1(_3) {
    var number = _3.x;
} // x has type any NOT number
function e2(_4) {
    var x = _4.x;
} // x is type number
function e3(_5) {
    var x = _5.x;
} // x is an optional with type number
function e4(_6) {
    var _7 = _6.x, number = _7[0], string = _7[1], any = _7[2];
} // x has type [any, any, any]
function e5(_8) {
    var _9 = _8.x, a = _9[0], b = _9[1], c = _9[2];
} // x has type [any, any, any]
