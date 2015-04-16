//// [destructuringParameterDeclaration1.ts]
// A parameter declaration may specify either an identifier or a binding pattern.
// The identifiers specified in parameter declarations and binding patterns
// in a parameter list must be unique within that parameter list.

// If the declaration includes a type annotation, the parameter is of that type
function a0(x: number, y: string, z: boolean) { } 
function a1([a, b, [[c]]]: [number, number, string[][]]) { }
function a2(o: { x: number, a: number }) { }
function a3({j, k, l: {m, n}, q: [a, b, c]}: { j: number, k: string, l: { m: boolean, n: number }, q: (number|string)[] }) { };
function a1({x, a}: { x: number, a: number }) { }

a1([1, 2, [["world"]]]);
a1([1, 2, [["world"]], 3]);
a1([1, "string", [["world"]]);  // Error
a1([1, 2, [["world"]], "string"]);  // Error


// If the declaration includes an initializer expression (which is permitted only
// when the parameter list occurs in conjunction with a function body),
// the parameter type is the widened form (section 3.11) of the type of the initializer expression.

function b1(z = 10, y = 60, u = () => true) { }
function b2(z = [undefined, null]) { };
function b3(z = null, o = { x: 0, y: undefined }) { }
function b4({z: {x, y: {j}}} = { z: { x: "hi", y: { j: 1 } } }) { }

interface F1 {
    b5(z = 10, [[a, b], d, {u}] = [[1, 2], "string", { u: false }]);  // Error, no function body
    b6(z, y, [, a, b], {p, m: { q, r}});
}

b2([1, 2, 3]);  // z is widen to the type any[]
b3("string", { x: 200, y: "string" });
b3("string", { x: 200, y: true });
b3("string", { x: "string", y: true });  // Error


// If the declaration specifies a binding pattern, the parameter type is the implied type of that binding pattern (section 5.1.3)
enum Foo { a }
function c0({z: {x, y: {j}}}) { }
function c1({z} = { z: 10 }) { }
function c2({z = 10}) { }
function c3({b}: { b: number|string} = { b: "hello" }) { }
function c4([z], z: number) { }  // Duplicate identifier
function c5([a, b, [[c]]]) { }
function c6([a, b, [[c=1]]]) { }

c0({z : { x: 1, y: { j: "world" } }});      // Implied type is { z: {x: any, y: {j: any}} }
c0({z : { x: "string", y: { j: true } }});  // Implied type is { z: {x: any, y: {j: any}} }
c0({z : 1});                                // Error, implied type is { z: {x: any, y: {j: any}} }

c1({});           // Error, implied type is {z:number}?
c1({ z: true });  // Error, implied type is {z:number}?
c1();             // Implied type is {z:number}?
c1({ z: 1 })      // Implied type is {z:number}? 

c2({});         // Implied type is {z?: number}
c2({z:1});      // Implied type is {z?: number}
c2({z:false});  // Error, implied type is {z?: number}

c3({ b: 1 });     // Implied type is { b: number|string }.
c3({ b: true });  // Error, implied type is { b: number|string }. 

c5([1, 2, [["string"]]]);               // Implied type is is [any, any, [[any]]]
c5([1, 2, [["string"]], false, true]);  // Implied type is is [any, any, [[any]]]
c5([1, 2, false, true]);                // Error, implied type is [any, any, [[any]]]

c6([1, 2, [["string"]]]);  // Error, implied type is [any, any, [[number]]]  // Use initializer

// A parameter can be marked optional by following its name or binding pattern with a question mark (?)
// or by including an initializer.

function d0(x?) { }
function d0(x = 10) { }
function d1([a, b, c]?) { }
function d2({x, y, z}?) { }

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

class C4 implements F2 {
    d3([a, b, c]?) { }
    d4({x, y, c}) { }
    e0([a, b, q]) { }
}

function d5({x, y} = { x: 1, y: 2 }) { }
d5();  // Parameter is optional as its declaration included an initializer




//// [destructuringParameterDeclaration1.js]
// A parameter declaration may specify either an identifier or a binding pattern.
// The identifiers specified in parameter declarations and binding patterns
// in a parameter list must be unique within that parameter list.
// If the declaration includes a type annotation, the parameter is of that type
function a0(x, y, z) { }
function a1(_a) {
    var a = _a[0], b = _a[1], c = _a[2][0][0];
}
function a2(o) { }
function a3(_a) {
    var j = _a.j, k = _a.k, _b = _a.l, m = _b.m, n = _b.n, _c = _a.q, a = _c[0], b = _c[1], c = _c[2];
}
;
function a1(_a) {
    var x = _a.x, a = _a.a;
}
a1([1, 2, [["world"]]]);
a1([1, 2, [["world"]], 3]);
a1([1, "string", [["world"]]]); // Error
a1([1, 2, [["world"]], "string"]); // Error
// If the declaration includes an initializer expression (which is permitted only
// when the parameter list occurs in conjunction with a function body),
// the parameter type is the widened form (section 3.11) of the type of the initializer expression.
function b1(z, y, u) {
    if (z === void 0) { z = 10; }
    if (y === void 0) { y = 60; }
    if (u === void 0) { u = function () { return true; }; }
}
function b2(z) {
    if (z === void 0) { z = [undefined, null]; }
}
;
function b3(z, o) {
    if (z === void 0) { z = null; }
    if (o === void 0) { o = { x: 0, y: undefined }; }
}
function b4(_a) {
    var _b = (_a === void 0 ? { z: { x: "hi", y: { j: 1 } } } : _a).z, x = _b.x, j = _b.y.j;
}
b2([1, 2, 3]); // z is widen to the type any[]
b3("string", { x: 200, y: "string" });
b3("string", { x: 200, y: true });
b3("string", { x: "string", y: true }); // Error
// If the declaration specifies a binding pattern, the parameter type is the implied type of that binding pattern (section 5.1.3)
var Foo;
(function (Foo) {
    Foo[Foo["a"] = 0] = "a";
})(Foo || (Foo = {}));
function c0(_a) {
    var _b = _a.z, x = _b.x, j = _b.y.j;
}
function c1(_a) {
    var z = (_a === void 0 ? { z: 10 } : _a).z;
}
function c2(_a) {
    var _b = _a.z, z = _b === void 0 ? 10 : _b;
}
function c3(_a) {
    var b = (_a === void 0 ? { b: "hello" } : _a).b;
}
function c4(_a, z) {
    var z = _a[0];
} // Duplicate identifier
function c5(_a) {
    var a = _a[0], b = _a[1], c = _a[2][0][0];
}
function c6(_a) {
    var a = _a[0], b = _a[1], _b = _a[2][0][0], c = _b === void 0 ? 1 : _b;
}
c0({ z: { x: 1, y: { j: "world" } } }); // Implied type is { z: {x: any, y: {j: any}} }
c0({ z: { x: "string", y: { j: true } } }); // Implied type is { z: {x: any, y: {j: any}} }
c0({ z: 1 }); // Error, implied type is { z: {x: any, y: {j: any}} }
c1({}); // Error, implied type is {z:number}?
c1({ z: true }); // Error, implied type is {z:number}?
c1(); // Implied type is {z:number}?
c1({ z: 1 }); // Implied type is {z:number}? 
c2({}); // Implied type is {z?: number}
c2({ z: 1 }); // Implied type is {z?: number}
c2({ z: false }); // Error, implied type is {z?: number}
c3({ b: 1 }); // Implied type is { b: number|string }.
c3({ b: true }); // Error, implied type is { b: number|string }. 
c5([1, 2, [["string"]]]); // Implied type is is [any, any, [[any]]]
c5([1, 2, [["string"]], false, true]); // Implied type is is [any, any, [[any]]]
c5([1, 2, false, true]); // Error, implied type is [any, any, [[any]]]
c6([1, 2, [["string"]]]); // Error, implied type is [any, any, [[number]]]  // Use initializer
// A parameter can be marked optional by following its name or binding pattern with a question mark (?)
// or by including an initializer.
function d0(x) { }
function d0(x) {
    if (x === void 0) { x = 10; }
}
function d1(_a) {
    var a = _a[0], b = _a[1], c = _a[2];
}
function d2(_a) {
    var x = _a.x, y = _a.y, z = _a.z;
}
var C2 = (function () {
    function C2() {
    }
    C2.prototype.d3 = function () { };
    C2.prototype.d4 = function () { };
    C2.prototype.e0 = function (_a) {
        var a = _a[0], b = _a[1], c = _a[2];
    };
    return C2;
})();
var C3 = (function () {
    function C3() {
    }
    C3.prototype.d3 = function (_a) {
        var a = _a[0], b = _a[1], c = _a[2];
    };
    C3.prototype.d4 = function (_a) {
        var x = _a.x, y = _a.y, z = _a.z;
    };
    C3.prototype.e0 = function (_a) {
        var a = _a[0], b = _a[1], c = _a[2];
    };
    return C3;
})();
var C4 = (function () {
    function C4() {
    }
    C4.prototype.d3 = function (_a) {
        var a = _a[0], b = _a[1], c = _a[2];
    };
    C4.prototype.d4 = function (_a) {
        var x = _a.x, y = _a.y, c = _a.c;
    };
    C4.prototype.e0 = function (_a) {
        var a = _a[0], b = _a[1], q = _a[2];
    };
    return C4;
})();
function d5(_a) {
    var _b = _a === void 0 ? { x: 1, y: 2 } : _a, x = _b.x, y = _b.y;
}
d5(); // Parameter is optional as its declaration included an initializer
