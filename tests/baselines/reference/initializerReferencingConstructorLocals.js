//// [tests/cases/conformance/classes/propertyMemberDeclarations/initializerReferencingConstructorLocals.ts] ////

//// [initializerReferencingConstructorLocals.ts]
// Initializer expressions for instance member variables are evaluated in the scope of the class constructor body but are not permitted to reference parameters or local variables of the constructor. 

class C {
    a = z; // error
    b: typeof z; // error
    c = this.z; // error
    d: typeof this.z; // error
    constructor(x) {
        z = 1;
    }
}

class D<T> {
    a = z; // error
    b: typeof z; // error
    c = this.z; // error
    d: typeof this.z; // error
    constructor(x: T) {
        z = 1;
    }
}

//// [initializerReferencingConstructorLocals.js]
// Initializer expressions for instance member variables are evaluated in the scope of the class constructor body but are not permitted to reference parameters or local variables of the constructor. 
class C {
    a = z; // error
    b; // error
    c = this.z; // error
    d; // error
    constructor(x) {
        z = 1;
    }
}
class D {
    a = z; // error
    b; // error
    c = this.z; // error
    d; // error
    constructor(x) {
        z = 1;
    }
}
