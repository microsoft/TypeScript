//// [tests/cases/compiler/superPropertyAccess2.ts] ////

//// [superPropertyAccess2.ts]
class C {
    public static foo() { }
    public get x() {
        return 1;
    }

    public static bar() { }
}

class D extends C {
    public static foo() {
        super.bar(); // OK
        super.x;  // error
    }

    constructor() {
        super();
        super.bar(); // error
        super.x;  // error
    }

    public static get y() {
        super.bar(); // OK
        super.x; // error
        return 1;
    }
}

//// [superPropertyAccess2.js]
class C {
    static foo() { }
    get x() {
        return 1;
    }
    static bar() { }
}
class D extends C {
    static foo() {
        super.bar(); // OK
        super.x; // error
    }
    constructor() {
        super();
        super.bar(); // error
        super.x; // error
    }
    static get y() {
        super.bar(); // OK
        super.x; // error
        return 1;
    }
}
