//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorOverloadsWithOptionalParameters.ts] ////

//// [constructorOverloadsWithOptionalParameters.ts]
class C {
    foo: string;
    constructor(x?, y?: any[]); 
    constructor() {
    }
}

class D<T> {
    foo: string;
    constructor(x?, y?: any[]); 
    constructor() {
    }
}

//// [constructorOverloadsWithOptionalParameters.js]
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
