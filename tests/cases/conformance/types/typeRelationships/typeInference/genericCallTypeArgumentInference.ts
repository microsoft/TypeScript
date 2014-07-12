// Basic type inference with generic calls, no errors expected

function foo<T>(t: T) {
    return t;
}

var r = foo(''); // string

function foo2<T, U>(t: T, u: U) {
    return u;
}

function foo2b<T, U>(u: U) {
    var x: T;
    return x;
}

var r2 = foo2('', 1); // number
var r3 = foo2b(1); // {}

class C<T, U> {
    constructor(public t: T, public u: U) {
    }

    foo(t: T, u: U) {
        return t;
    }

    foo2(t: T, u: U) {
        return u;
    }

    foo3<T>(t: T, u: U) {
        return t;
    }

    foo4<U>(t: T, u: U) {
        return t;
    }

    foo5<T,U>(t: T, u: U) {
        return t;
    }

    foo6<T, U>() {
        var x: T;
        return x;
    }

    foo7<T, U>(u: U) {
        var x: T;
        return x;
    }

    foo8<T, U>() {
        var x: T;
        return x;
    }
}

var c = new C('', 1);
var r4 = c.foo('', 1); // string
var r5 = c.foo2('', 1); // number
var r6 = c.foo3(true, 1); // boolean
var r7 = c.foo4('', true); // string
var r8 = c.foo5(true, 1); // boolean
var r9 = c.foo6(); // {}
var r10 = c.foo7(''); // {}
var r11 = c.foo8(); // {}

interface I<T, U> {
    new (t: T, u: U);
    foo(t: T, u: U): T;
    foo2(t: T, u: U): U;
    foo3<T>(t: T, u: U): T;
    foo4<U>(t: T, u: U): T;
    foo5<T, U>(t: T, u: U): T;
    foo6<T, U>(): T;
    foo7<T, U>(u: U): T;
    foo8<T, U>(): T;    
}

var i: I<string, number>;
var r4 = i.foo('', 1); // string
var r5 = i.foo2('', 1); // number
var r6 = i.foo3(true, 1); // boolean
var r7 = i.foo4('', true); // string
var r8 = i.foo5(true, 1); // boolean
var r9 = i.foo6(); // {}
var r10 = i.foo7(''); // {}
var r11 = i.foo8(); // {}