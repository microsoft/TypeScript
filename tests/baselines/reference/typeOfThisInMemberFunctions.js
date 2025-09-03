//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberFunctionDeclarations/typeOfThisInMemberFunctions.ts] ////

//// [typeOfThisInMemberFunctions.ts]
class C {
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

class D<T> {
    x: T;
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

class E<T extends Date> {
    x: T;
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

//// [typeOfThisInMemberFunctions.js]
class C {
    foo() {
        var r = this;
    }
    static bar() {
        var r2 = this;
    }
}
class D {
    x;
    foo() {
        var r = this;
    }
    static bar() {
        var r2 = this;
    }
}
class E {
    x;
    foo() {
        var r = this;
    }
    static bar() {
        var r2 = this;
    }
}
