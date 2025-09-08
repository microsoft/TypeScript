//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyAndFunctionWithSameName.ts] ////

//// [propertyAndFunctionWithSameName.ts]
class C {
    x: number;
    x() { // error
        return 1;
    }
}

class D {
    x: number;
    x(v) { } // error
}

//// [propertyAndFunctionWithSameName.js]
class C {
    x;
    x() {
        return 1;
    }
}
class D {
    x;
    x(v) { } // error
}
