//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassOverridesWithoutSubtype.ts] ////

//// [derivedClassOverridesWithoutSubtype.ts]
class Base {
    x: {
        foo: string;
    }
}

class Derived extends Base {
    x: {
        foo: any;
    }
}

class Base2 {
    static y: {
        foo: string;
    }
}

class Derived2 extends Base2 {
    static y: {
        foo: any;
    }
}

//// [derivedClassOverridesWithoutSubtype.js]
class Base {
}
class Derived extends Base {
}
class Base2 {
}
class Derived2 extends Base2 {
}
