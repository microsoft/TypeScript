//// [tests/cases/conformance/types/members/typesWithSpecializedConstructSignatures.ts] ////

//// [typesWithSpecializedConstructSignatures.ts]
// basic uses of specialized signatures without errors

class Base { foo: string }
class Derived1 extends Base { bar: string }
class Derived2 extends Base { baz: string }

class C {
    constructor(x: 'hi');
    constructor(x: 'bye');
    constructor(x: string);
    constructor(x) {
        return x;
    }
}
var c = new C('a');

interface I {
    new(x: 'hi'): Derived1;
    new(x: 'bye'): Derived2;
    new(x: string): Base;
}
var i: I;

var a: {
    new(x: 'hi'): Derived1;
    new(x: 'bye'): Derived2;
    new(x: string): Base;
};

c = i;
c = a;

i = a;

a = i;

var r1 = new C('hi');
var r2: Derived2 = new i('bye');
var r3: Base = new a('hm');

//// [typesWithSpecializedConstructSignatures.js]
// basic uses of specialized signatures without errors
class Base {
    foo;
}
class Derived1 extends Base {
    bar;
}
class Derived2 extends Base {
    baz;
}
class C {
    constructor(x) {
        return x;
    }
}
var c = new C('a');
var i;
var a;
c = i;
c = a;
i = a;
a = i;
var r1 = new C('hi');
var r2 = new i('bye');
var r3 = new a('hm');
