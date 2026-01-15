// basic uses of specialized signatures without errors

class Base { foo: string }
class Derived1 extends Base { bar: string }
class Derived2 extends Base { baz: string }

class C {
    foo(x: 'hi'): Derived1;
    foo(x: 'bye'): Derived2;
    foo(x: string): Base;
    foo(x) {
        return x;
    }
}
var c = new C();

interface I {
    foo(x: 'hi'): Derived1;
    foo(x: 'bye'): Derived2;
    foo(x: string): Base;
}
var i: I;

var a: {
    foo(x: 'hi'): Derived1;
    foo(x: 'bye'): Derived2;
    foo(x: string): Base;
};

c = i;
c = a;

i = c;
i = a;

a = c;
a = i;

var r1: Derived1 = c.foo('hi');
var r2: Derived2 = c.foo('bye');
var r3: Base = c.foo('hm');