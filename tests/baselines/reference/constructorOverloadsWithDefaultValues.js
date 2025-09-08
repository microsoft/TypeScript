//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorOverloadsWithDefaultValues.ts] ////

//// [constructorOverloadsWithDefaultValues.ts]
class C {
    foo: string;
    constructor(x = 1); // error
    constructor() {
    }
}

class D<T> {
    foo: string;
    constructor(x = 1); // error
    constructor() {
    }
}

//// [constructorOverloadsWithDefaultValues.js]
class C {
    foo;
    constructor() {
    }
}
class D {
    foo;
    constructor() {
    }
}
