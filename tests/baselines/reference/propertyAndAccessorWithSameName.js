//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyAndAccessorWithSameName.ts] ////

//// [propertyAndAccessorWithSameName.ts]
class C {
    x: number;
    get x() { // error
        return 1;
    }
}

class D {
    x: number;
    set x(v) { } // error
}

class E {
    private x: number;
    get x() { // error
        return 1;
    }
    set x(v) { }
}

//// [propertyAndAccessorWithSameName.js]
class C {
    get x() {
        return 1;
    }
}
class D {
    set x(v) { } // error
}
class E {
    get x() {
        return 1;
    }
    set x(v) { }
}
