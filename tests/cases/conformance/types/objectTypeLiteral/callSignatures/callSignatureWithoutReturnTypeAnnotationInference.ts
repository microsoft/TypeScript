// @allowUnreachableCode: true

// Call signatures without a return type should infer one from the function body (if present)

// Simple types
function foo(x) {
    return 1;
}
var r = foo(1);

function foo2(x) {
    return foo(x);
}
var r2 = foo2(1);

function foo3() {
    return foo3();
}
var r3 = foo3();

function foo4<T>(x: T) {
    return x;
}
var r4 = foo4(1);

function foo5(x) {
    if (true) {
        return 1;
    } else {
        return 2;
    }
}
var r5 = foo5(1);

function foo6(x) {
    try {
    }
    catch (e) {
        return [];
    }
    finally {
        return [];
    }
}
var r6 = foo6(1);

function foo7(x) {
    return typeof x;
}
var r7 = foo7(1);

// object types
function foo8(x: number) {
    return { x: x };
}
var r8 = foo8(1);

interface I {
    foo: string;
}
function foo9(x: number) {
    var i: I;
    return i;    
}
var r9 = foo9(1);

class C {
    foo: string;
}
function foo10(x: number) {
    var c: C;
    return c;
}
var r10 = foo10(1);

module M {
    export var x = 1;
    export class C { foo: string }
}
function foo11() {
    return M;
}
var r11 = foo11();

// merged declarations
interface I2 {
    x: number;
}
interface I2 {
    y: number;
}
function foo12() {
    var i2: I2;
    return i2;
}
var r12 = foo12();

function m1() { return 1; }
module m1 { export var y = 2; }
function foo13() {
    return m1;
}
var r13 = foo13();

class c1 {
    foo: string;
    constructor(x) { }
}
module c1 {
    export var x = 1;
}
function foo14() {
    return c1;
}
var r14 = foo14();

enum e1 { A }
module e1 { export var y = 1; }
function foo15() {
    return e1;
}
var r15 = foo15();