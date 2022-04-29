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