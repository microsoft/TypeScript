//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorImplementationWithDefaultValues2.ts] ////

//// [constructorImplementationWithDefaultValues2.ts]
class C {
    constructor(x);
    constructor(public x: string = 1) { // error
        var y = x;
    }
}

class D<T, U> {
    constructor(x: T, y: U);
    constructor(x: T = 1, public y: U = x) { // error
        var z = x;
    }
}

class E<T extends Date> {
    constructor(x);
    constructor(x: T = new Date()) { // error
        var y = x;
    }
}

//// [constructorImplementationWithDefaultValues2.js]
class C {
    x;
    constructor(x = 1) {
        this.x = x;
        var y = x;
    }
}
class D {
    y;
    constructor(x = 1, y = x) {
        this.y = y;
        var z = x;
    }
}
class E {
    constructor(x = new Date()) {
        var y = x;
    }
}
