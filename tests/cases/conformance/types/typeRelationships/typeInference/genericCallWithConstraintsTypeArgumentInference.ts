// Basic type inference with generic calls and constraints, no errors expected

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
var b: Base;
var d1: Derived;
var d2: Derived2;

function foo<T extends Base>(t: T) {
    return t;
}

var r = foo(b); // Base
var r2 = foo(d1); // Derived

function foo2<T extends Base, U extends Derived>(t: T, u: U) {
    return u;
}

function foo2b<T extends Base, U extends Derived>(u: U) {
    var x: T;
    return x;
}

function foo2c<T extends Base, U extends Derived>() {
    var x: T;
    return x;
}

var r3 = foo2b(d1); // Base
var r3b = foo2c(); // Base

class C<T extends Base, U extends Derived> {
    constructor(public t: T, public u: U) {
    }

    foo(t: T, u: U) {
        return t;
    }

    foo2(t: T, u: U) {
        return u;
    }

    foo3<T extends Derived>(t: T, u: U) {
        return t;
    }

    foo4<U extends Derived2>(t: T, u: U) {
        return t;
    }

    foo5<T extends Derived, U extends Derived2>(t: T, u: U) {
        return t;
    }

    foo6<T extends Derived, U extends Derived2>() {
        var x: T;
        return x;
    }

    foo7<T extends Base, U extends Derived>(u: U) {
        var x: T;
        return x;
    }

    foo8<T extends Base, U extends Derived>() {
        var x: T;
        return x;
    }
}

var c = new C(b, d1);
var r4 = c.foo(d1, d2); // Base
var r5 = c.foo2(b, d2); // Derived
var r6 = c.foo3(d1, d1); // Derived
var r7 = c.foo4(d1, d2); // Base
var r8 = c.foo5(d1, d2); // Derived
var r8b = c.foo5(d2, d2); // Derived2
var r9 = c.foo6(); // Derived
var r10 = c.foo7(d1); // Base
var r11 = c.foo8(); // Base

interface I<T extends Base, U extends Derived> {
    new (t: T, u: U);
    foo(t: T, u: U): T;
    foo2(t: T, u: U): U;
    foo3<T extends Derived>(t: T, u: U): T;
    foo4<U extends Derived2>(t: T, u: U): T;
    foo5<T extends Derived, U extends Derived2>(t: T, u: U): T;
    foo6<T extends Derived, U extends Derived2>(): T;
    foo7<T extends Base, U extends Derived>(u: U): T;
    foo8<T extends Base, U extends Derived>(): T;
}

var i: I<Base, Derived>;
var r4 = i.foo(d1, d2); // Base
var r5 = i.foo2(b, d2); // Derived
var r6 = i.foo3(d1, d1); // Derived
var r7 = i.foo4(d1, d2); // Base
var r8 = i.foo5(d1, d2); // Derived
var r8b = i.foo5(d2, d2); // Derived2
var r9 = i.foo6(); // Derived
var r10 = i.foo7(d1); // Base
var r11 = i.foo8(); // Base
