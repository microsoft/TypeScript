//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorDefaultValuesReferencingThis.ts] ////

//// [constructorDefaultValuesReferencingThis.ts]
class C {
    public baseProp = 1;
    constructor(x = this) { }
}

class D<T> {
    constructor(x = this) { }
}

class E<T> {
    constructor(public x = this) { }
}

class F extends C {
    constructor(y = this.baseProp) {
        super();
    }
}


//// [constructorDefaultValuesReferencingThis.js]
class C {
    constructor(x = this) {
        this.baseProp = 1;
    }
}
class D {
    constructor(x = this) { }
}
class E {
    constructor(x = this) {
        this.x = x;
    }
}
class F extends C {
    constructor(y = this.baseProp) {
        super();
    }
}
