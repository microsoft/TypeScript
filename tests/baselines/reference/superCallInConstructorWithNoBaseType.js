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
        super(); // error
    }
}
class D {
    constructor(x) {
        super(); // error
        this.x = x;
    }
}
