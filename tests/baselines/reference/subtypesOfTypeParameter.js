//// [subtypesOfTypeParameter.ts]
// checking whether other types are subtypes of type parameters

class C3<T> {
    foo: T;
}

class D1<T, U> extends C3<T> {
    foo: U; // error
}

function f1<T, U>(x: T, y: U) {
    var r = true ? x : y; // error
    var r = true ? y : x; // error
}

interface I1 { foo: number; }
class C1 { foo: number; }
class C2<T> { foo: T; }
enum E { A }
function f() { }
module f {
    export var bar = 1;
}
class c { baz: string }
module c {
    export var bar = 1;
}

// errors throughout
function f2<T, U>(x: T, y: U) {
    var r0 = true ? x : null;
    var r0 = true ? null : x;

    var u: typeof undefined;
    var r0b = true ? u : x;
    var r0b = true ? x : u;

    var r1 = true ? 1 : x; 
    var r1 = true ? x : 1;

    var r2 = true ? '' : x;
    var r2 = true ? x : '';

    var r3 = true ? true : x;
    var r3 = true ? x : true;

    var r4 = true ? new Date() : x;
    var r4 = true ? x : new Date();

    var r5 = true ? /1/ : x;
    var r5 = true ? x : /1/;

    var r6 = true ? { foo: 1 } : x;
    var r6 = true ? x : { foo: 1 };

    var r7 = true ? () => { } : x;
    var r7 = true ? x : () => { };

    var r8 = true ? <T>(x: T) => { return x } : x;
    var r8b = true ? x : <T>(x: T) => { return x }; // type parameters not identical across declarations

    var i1: I1;
    var r9 = true ? i1 : x;
    var r9 = true ? x : i1;

    var c1: C1;
    var r10 = true ? c1 : x;
    var r10 = true ? x : c1;


    var c2: C2<number>;
    var r12 = true ? c2 : x;
    var r12 = true ? x : c2;


    var r13 = true ? E : x;
    var r13 = true ? x : E;

    var r14 = true ? E.A : x;
    var r14 = true ? x : E.A;

    var af: typeof f;
    var r15 = true ? af : x;
    var r15 = true ? x : af;

    var ac: typeof c;
    var r16 = true ? ac : x;
    var r16 = true ? x : ac;

    function f17<T>(a: T) {
        var r17 = true ? x : a;
        var r17 = true ? a : x;
    }

    function f18<T, U extends T>(a: U) {
        var r18 = true ? x : a;
        var r18 = true ? a : x;
    }

    var r19 = true ? new Object() : x; // BCT is Object
    var r19 = true ? x : new Object(); // BCT is Object

    var r20 = true ? {} : x; // ok
    var r20 = true ? x : {}; // ok
}

//// [subtypesOfTypeParameter.js]
// checking whether other types are subtypes of type parameters
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var D1 = /** @class */ (function (_super) {
    __extends(D1, _super);
    function D1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D1;
}(C3));
function f1(x, y) {
    var r = true ? x : y; // error
    var r = true ? y : x; // error
}
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
function f() { }
(function (f) {
    f.bar = 1;
})(f || (f = {}));
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
(function (c) {
    c.bar = 1;
})(c || (c = {}));
// errors throughout
function f2(x, y) {
    var r0 = true ? x : null;
    var r0 = true ? null : x;
    var u;
    var r0b = true ? u : x;
    var r0b = true ? x : u;
    var r1 = true ? 1 : x;
    var r1 = true ? x : 1;
    var r2 = true ? '' : x;
    var r2 = true ? x : '';
    var r3 = true ? true : x;
    var r3 = true ? x : true;
    var r4 = true ? new Date() : x;
    var r4 = true ? x : new Date();
    var r5 = true ? /1/ : x;
    var r5 = true ? x : /1/;
    var r6 = true ? { foo: 1 } : x;
    var r6 = true ? x : { foo: 1 };
    var r7 = true ? function () { } : x;
    var r7 = true ? x : function () { };
    var r8 = true ? function (x) { return x; } : x;
    var r8b = true ? x : function (x) { return x; }; // type parameters not identical across declarations
    var i1;
    var r9 = true ? i1 : x;
    var r9 = true ? x : i1;
    var c1;
    var r10 = true ? c1 : x;
    var r10 = true ? x : c1;
    var c2;
    var r12 = true ? c2 : x;
    var r12 = true ? x : c2;
    var r13 = true ? E : x;
    var r13 = true ? x : E;
    var r14 = true ? E.A : x;
    var r14 = true ? x : E.A;
    var af;
    var r15 = true ? af : x;
    var r15 = true ? x : af;
    var ac;
    var r16 = true ? ac : x;
    var r16 = true ? x : ac;
    function f17(a) {
        var r17 = true ? x : a;
        var r17 = true ? a : x;
    }
    function f18(a) {
        var r18 = true ? x : a;
        var r18 = true ? a : x;
    }
    var r19 = true ? new Object() : x; // BCT is Object
    var r19 = true ? x : new Object(); // BCT is Object
    var r20 = true ? {} : x; // ok
    var r20 = true ? x : {}; // ok
}
