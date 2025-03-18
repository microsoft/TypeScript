//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassOverridesProtectedMembers4.ts] ////

//// [derivedClassOverridesProtectedMembers4.ts]
var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    protected a: typeof x;
}

class Derived1 extends Base {
    public a: typeof x;
}

class Derived2 extends Derived1 {
    protected a: typeof x; // Error, parent was public
}

//// [derivedClassOverridesProtectedMembers4.js]
var x;
var y;
class Base {
    a;
}
class Derived1 extends Base {
    a;
}
class Derived2 extends Derived1 {
    a;
}
