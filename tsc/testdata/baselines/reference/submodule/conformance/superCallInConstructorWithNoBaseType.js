//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/superCallInConstructorWithNoBaseType.ts] ////

//// [superCallInConstructorWithNoBaseType.ts]
class C {
    constructor() {
        super(); // error
    }
}

class D<T> {
    public constructor(public x: T) {
        super(); // error
    }
}

//// [superCallInConstructorWithNoBaseType.js]
class C {
    constructor() {
        super();
    }
}
class D {
    x;
    constructor(x) {
        this.x = x;
        super();
    }
}
