//// [tests/cases/conformance/classes/constructorDeclarations/classWithTwoConstructorDefinitions.ts] ////

//// [classWithTwoConstructorDefinitions.ts]
class C {
    constructor() { } // error
    constructor(x) { } // error
}

class D<T> {
    constructor(x: T) { } // error
    constructor(x: T, y: T) { } // error
}

//// [classWithTwoConstructorDefinitions.js]
class C {
    constructor() { } // error
    constructor(x) { } // error
}
class D {
    constructor(x) { } // error
    constructor(x, y) { } // error
}
