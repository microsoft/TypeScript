//// [tests/cases/conformance/classes/propertyMemberDeclarations/initializerReferencingConstructorParameters.ts] ////

//// [initializerReferencingConstructorParameters.ts]
// Initializer expressions for instance member variables are evaluated in the scope of the class constructor body but are not permitted to reference parameters or local variables of the constructor. 

class C {
    a = x; // error
    b: typeof x; // error
    constructor(x) { }
}

class D {
    a = x; // error
    b: typeof x; // error
    constructor(public x) { }
}

class E {
    a = this.x; // ok
    b: typeof this.x; // ok
    constructor(public x) { }
}

class F<T> {
    a = this.x; // ok
    b = x; // error
    constructor(public x: T) { }
}

//// [initializerReferencingConstructorParameters.js]
// Initializer expressions for instance member variables are evaluated in the scope of the class constructor body but are not permitted to reference parameters or local variables of the constructor. 
class C {
    constructor(x) {
        this.a = x; // error
    }
}
class D {
    constructor(x) {
        this.x = x;
        this.a = x; // error
    }
}
class E {
    constructor(x) {
        this.x = x;
        this.a = this.x; // ok
    }
}
class F {
    constructor(x) {
        this.x = x;
        this.a = this.x; // ok
        this.b = x; // error
    }
}
