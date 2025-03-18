//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberAccessorDeclarations/typeOfThisInAccessor.ts] ////

//// [typeOfThisInAccessor.ts]
class C {
    get x() {
        var r = this; // C
        return 1;
    }

    static get y() {
        var r2 = this; // typeof C
        return 1;
    }
}

class D<T> {
    a: T;
    get x() {
        var r = this; // D<T>
        return 1;
    }

    static get y() {
        var r2 = this; // typeof D
        return 1;
    }
}

var x = {
    get a() {
        var r3 = this; // any
        return 1;
    }
}

//// [typeOfThisInAccessor.js]
class C {
    get x() {
        var r = this;
        return 1;
    }
    static get y() {
        var r2 = this;
        return 1;
    }
}
class D {
    a;
    get x() {
        var r = this;
        return 1;
    }
    static get y() {
        var r2 = this;
        return 1;
    }
}
var x = {
    get a() {
        var r3 = this;
        return 1;
    }
};
