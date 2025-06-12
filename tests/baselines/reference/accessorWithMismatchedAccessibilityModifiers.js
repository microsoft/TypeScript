//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberAccessorDeclarations/accessorWithMismatchedAccessibilityModifiers.ts] ////

//// [accessorWithMismatchedAccessibilityModifiers.ts]
class C {
    get x() {
        return 1;
    }
    private set x(v) {
    }
}

class D {
    protected get x() {
        return 1;
    }
    private set x(v) {
    }
}

class E {
    protected set x(v) {
    }
    get x() {
        return 1;
    }
}

class F {
    protected static set x(v) {
    }
    static get x() {
        return 1;
    }
}

//// [accessorWithMismatchedAccessibilityModifiers.js]
class C {
    get x() {
        return 1;
    }
    set x(v) {
    }
}
class D {
    get x() {
        return 1;
    }
    set x(v) {
    }
}
class E {
    set x(v) {
    }
    get x() {
        return 1;
    }
}
class F {
    static set x(v) {
    }
    static get x() {
        return 1;
    }
}
