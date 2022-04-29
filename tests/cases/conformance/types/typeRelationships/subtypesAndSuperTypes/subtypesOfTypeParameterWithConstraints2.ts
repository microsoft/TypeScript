// checking whether other types are subtypes of type parameters with constraints

function f1<T extends U, U>(x: T, y: U) {
    var r = true ? x : y;
    var r = true ? y : x;
}

// V > U > T
function f2<T extends U, U extends V, V>(x: T, y: U, z: V) {
    var r = true ? x : y;
    var r = true ? y : x;

    // ok
    var r2 = true ? z : y;
    var r2 = true ? y : z;

    // ok
    var r2a = true ? z : x;
    var r2b = true ? x : z;
}

// Date > U > T
function f3<T extends U, U extends Date>(x: T, y: U) {
    var r = true ? x : y;
    var r = true ? y : x;

    // ok
    var r2 = true ? x : new Date(); 
    var r2 = true ? new Date() : x;

    // ok
    var r3 = true ? y : new Date(); 
    var r3 = true ? new Date() : y;
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

function f4<T extends Number>(x: T) {
    var r0 = true ? x : null; // ok
    var r0 = true ? null : x; // ok

    var u: typeof undefined;
    var r0b = true ? u : x; // ok
    var r0b = true ? x : u; // ok
}

function f5<T extends Number>(x: T) {
    var r1 = true ? 1 : x; // ok
    var r1 = true ? x : 1; // ok
}

function f6<T extends String>(x: T) {
    var r2 = true ? '' : x; // ok
    var r2 = true ? x : ''; // ok
}

function f7<T extends Boolean>(x: T) {
    var r3 = true ? true : x; // ok
    var r3 = true ? x : true; // ok
}

function f8<T extends Date>(x: T) {
    var r4 = true ? new Date() : x; // ok
    var r4 = true ? x : new Date(); // ok
}

function f9<T extends RegExp>(x: T) {
    var r5 = true ? /1/ : x; // ok
    var r5 = true ? x : /1/; // ok
}

function f10<T extends { foo: number }>(x: T) {
    var r6 = true ? { foo: 1 } : x; // ok
    var r6 = true ? x : { foo: 1 }; // ok
}

function f11<T extends () => void>(x: T) {
    var r7 = true ? () => { } : x; // ok
    var r7 = true ? x : () => { }; // ok
}

function f12<T extends <U>(x: U) => U>(x: T) {
    var r8 = true ? <T>(x: T) => { return x } : x; // ok
    var r8b = true ? x : <T>(x: T) => { return x }; // ok, type parameters not identical across declarations
}

function f13<T extends I1>(x: T) {
    var i1: I1;
    var r9 = true ? i1 : x; // ok
    var r9 = true ? x : i1; // ok
}

function f14<T extends C1>(x: T) {
    var c1: C1;
    var r10 = true ? c1 : x; // ok
    var r10 = true ? x : c1; // ok
}

function f15<T extends C2<number>>(x: T) {
    var c2: C2<number>;
    var r12 = true ? c2 : x; // ok
    var r12 = true ? x : c2; // ok
}

function f16<T extends E>(x: T) {
    var r13 = true ? E : x; // ok
    var r13 = true ? x : E; // ok

    var r14 = true ? E.A : x; // ok
    var r14 = true ? x : E.A; // ok
}

function f17<T extends typeof f>(x: T) {
    var af: typeof f;
    var r15 = true ? af : x; // ok
    var r15 = true ? x : af; // ok
}

function f18<T extends typeof c>(x: T) {
    var ac: typeof c;
    var r16 = true ? ac : x; // ok
    var r16 = true ? x : ac; // ok
}

function f19<T>(x: T) {
    function f17<U extends T>(a: U) {
        var r17 = true ? x : a; // ok
        var r17 = true ? a : x; // ok
    }

    function f18<V extends U, U extends T>(a: V) {
        var r18 = true ? x : a; // ok
        var r18 = true ? a : x; // ok
    }
}

function f20<T extends Number>(x: T) {
    var r19 = true ? new Object() : x; // ok
    var r19 = true ? x : new Object(); // ok
}

function f21<T extends Number>(x: T) {
    var r20 = true ? {} : x; // ok
    var r20 = true ? x : {}; // ok
}