//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/constructorFunctionTypeIsAssignableToBaseType2.ts] ////

//// [constructorFunctionTypeIsAssignableToBaseType2.ts]
// the constructor function itself does not need to be a subtype of the base type constructor function

class Base {
    static foo: {
        bar: Object;
    }
    constructor(x: Object) {
    }
}

class Derived extends Base {
    // ok
    static foo: {
        bar: number;
    }

    constructor(x: number) {
        super(x);
    }
}

class Derived2 extends Base {   
    static foo: {
        bar: number;
    }

    // ok, not enforcing assignability relation on this
    constructor(x: any) {
        super(x);
        return 1;
    }
}

//// [constructorFunctionTypeIsAssignableToBaseType2.js]
class Base {
    static foo;
    constructor(x) {
    }
}
class Derived extends Base {
    static foo;
    constructor(x) {
        super(x);
    }
}
class Derived2 extends Base {
    static foo;
    constructor(x) {
        super(x);
        return 1;
    }
}
