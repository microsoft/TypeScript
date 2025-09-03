//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classIsSubtypeOfBaseType.ts] ////

//// [classIsSubtypeOfBaseType.ts]
class Base<T> {
    foo: T;
}

class Derived extends Base<{ bar: string; }> {
    foo: {
        bar: string; baz: number; // ok
    }
}

class Derived2 extends Base<{ bar: string; }> {
    foo: {
        bar?: string; // error
    }
}

//// [classIsSubtypeOfBaseType.js]
class Base {
    foo;
}
class Derived extends Base {
    foo;
}
class Derived2 extends Base {
    foo;
}
