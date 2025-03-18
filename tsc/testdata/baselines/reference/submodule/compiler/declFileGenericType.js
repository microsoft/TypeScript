//// [tests/cases/compiler/declFileGenericType.ts] ////

//// [declFileGenericType.ts]
export module C {
    export class A<T>{ }
    export class B { }
    
    export function F<T>(x: T): A<B> { return null; }
    export function F2<T>(x: T): C.A<C.B> { return null; }
    export function F3<T>(x: T): C.A<C.B>[] { return null; }
    export function F4<T extends A<B>>(x: T): Array<C.A<C.B>> { return null; }

    export function F5<T>(): T { return null; }

    export function F6<T extends A<B>>(x: T): T { return null; }

    export class D<T>{

        constructor(public val: T) { }

    }
}

export var a: C.A<C.B>;

export var b = C.F;
export var c = C.F2;
export var d = C.F3;
export var e = C.F4;

export var x = (new C.D<C.A<C.B>>(new C.A<C.B>())).val;

export function f<T extends C.A<C.B>>() { }

export var g = C.F5<C.A<C.B>>();

export class h extends C.A<C.B>{ }

export interface i extends C.A<C.B> { }

export var j = C.F6;


//// [declFileGenericType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.j = exports.h = exports.g = exports.x = exports.e = exports.d = exports.c = exports.b = exports.a = exports.C = void 0;
exports.f = f;
var C;
(function (C) {
    class A {
    }
    C.A = A;
    class B {
    }
    C.B = B;
    function F(x) { return null; }
    C.F = F;
    function F2(x) { return null; }
    C.F2 = F2;
    function F3(x) { return null; }
    C.F3 = F3;
    function F4(x) { return null; }
    C.F4 = F4;
    function F5() { return null; }
    C.F5 = F5;
    function F6(x) { return null; }
    C.F6 = F6;
    class D {
        val;
        constructor(val) {
            this.val = val;
        }
    }
    C.D = D;
})(C || (exports.C = C = {}));
exports.b = C.F;
exports.c = C.F2;
exports.d = C.F3;
exports.e = C.F4;
exports.x = (new C.D(new C.A())).val;
function f() { }
exports.g = C.F5();
class h extends C.A {
}
exports.h = h;
exports.j = C.F6;
