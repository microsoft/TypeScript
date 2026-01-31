//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorImplementationWithDefaultValues.ts] ////

//// [constructorImplementationWithDefaultValues.ts]
class C {
    constructor(x);
    constructor(x = 1) {
        var y = x;
    }
}

class D<T> {
    constructor(x);
    constructor(x:T = null) {
        var y = x;
    }
}

class E<T extends Date> {
    constructor(x);
    constructor(x: T = null) {
        var y = x;
    }
}

//// [constructorImplementationWithDefaultValues.js]
class C {
    constructor(x = 1) {
        var y = x;
    }
}
class D {
    constructor(x = null) {
        var y = x;
    }
}
class E {
    constructor(x = null) {
        var y = x;
    }
}
