//// [tests/cases/compiler/propertyOverridingPrototype.ts] ////

//// [propertyOverridingPrototype.ts]
class Base {
    foo() {
    }
}

class Derived extends Base {
    foo: () => { };
}



//// [propertyOverridingPrototype.js]
class Base {
    foo() {
    }
}
class Derived extends Base {
    foo;
}
