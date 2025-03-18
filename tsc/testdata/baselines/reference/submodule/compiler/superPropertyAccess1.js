//// [tests/cases/compiler/superPropertyAccess1.ts] ////

//// [superPropertyAccess1.ts]
class C {
    public foo() { }
    public get x() {
        return 1;
    }

    public bar() { }
}

class D extends C {
    public foo() {
        super.bar();
        super.x;  // error
    }    

    constructor() {
        super();
        super.bar();
        super.x;  // error
    }

    public get y() {
        super.bar();
        super.x; // error
        return 1;
    }
}

//// [superPropertyAccess1.js]
class C {
    foo() { }
    get x() {
        return 1;
    }
    bar() { }
}
class D extends C {
    foo() {
        super.bar();
        super.x;
    }
    constructor() {
        super();
        super.bar();
        super.x;
    }
    get y() {
        super.bar();
        super.x;
        return 1;
    }
}
