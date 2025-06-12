//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/constructorFunctionTypeIsAssignableToBaseType.ts] ////

//// [constructorFunctionTypeIsAssignableToBaseType.ts]
class Base {
    static foo: {
        bar: Object;
    }
}

class Derived extends Base {
    // ok
    static foo: {
        bar: number;
    }
}

class Derived2 extends Base {
    // ok, use assignability here
    static foo: {
        bar: any;
    }
}

//// [constructorFunctionTypeIsAssignableToBaseType.js]
class Base {
}
class Derived extends Base {
}
class Derived2 extends Base {
}
