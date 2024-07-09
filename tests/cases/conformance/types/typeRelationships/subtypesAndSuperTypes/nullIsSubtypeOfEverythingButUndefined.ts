// null is a subtype of any other types except undefined

var r0 = true ? null : null;
var r0 = true ? null : null;

var u: typeof undefined;
var r0b = true ? u : null;
var r0b = true ? null : u;

var r1 = true ? 1 : null;
var r1 = true ? null : 1;

var r2 = true ? '' : null;
var r2 = true ? null : '';

var r3 = true ? true : null;
var r3 = true ? null : true;

var r4 = true ? new Date() : null;
var r4 = true ? null : new Date();

var r5 = true ? /1/ : null;
var r5 = true ? null : /1/;

var r6 = true ? { foo: 1 } : null;
var r6 = true ? null : { foo: 1 };

var r7 = true ? () => { } : null;
var r7 = true ? null : () => { };

var r8 = true ? <T>(x: T) => { return x } : null;
var r8b = true ? null : <T>(x: T) => { return x }; // type parameters not identical across declarations

interface I1 { foo: number; }
var i1: I1;
var r9 = true ? i1 : null;
var r9 = true ? null : i1;

class C1 { foo: number; }
var c1: C1;
var r10 = true ? c1 : null;
var r10 = true ? null : c1;

class C2<T> { foo: T; }
var c2: C2<number>;
var r12 = true ? c2 : null;
var r12 = true ? null : c2;

enum E { A }
var r13 = true ? E : null;
var r13 = true ? null : E;

var r14 = true ? E.A : null;
var r14 = true ? null : E.A;

function f() { }
module f {
    export var bar = 1;
}
var af: typeof f;
var r15 = true ? af : null;
var r15 = true ? null : af;

class c { baz: string }
module c {
    export var bar = 1;
}
var ac: typeof c;
var r16 = true ? ac : null;
var r16 = true ? null : ac;

function f17<T>(x: T) {
    var r17 = true ? x : null;
    var r17 = true ? null : x;
}

function f18<T, U>(x: U) {
    var r18 = true ? x : null;
    var r18 = true ? null : x;
}
//function f18<T, U extends T>(x: U) {
//    var r18 = true ? x : null;
//    var r18 = true ? null : x;
//}

var r19 = true ? new Object() : null;
var r19 = true ? null : new Object();

var r20 = true ? {} : null;
var r20 = true ? null : {};
