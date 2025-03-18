//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/readonlyConstructorAssignment.ts] ////

//// [readonlyConstructorAssignment.ts]
// Tests that readonly parameter properties behave like regular readonly properties

class A {
    constructor(readonly x: number) {
        this.x = 0;
    }
}

class B extends A {
    constructor(x: number) {
        super(x);
        // Fails, x is readonly
        this.x = 1;
    }
}

class C extends A {
    // This is the usual behavior of readonly properties:
    // if one is redeclared in a base class, then it can be assigned to.
    constructor(readonly x: number) {
        super(x);
        this.x = 1;
    }
}

class D {
    constructor(private readonly x: number) {
        this.x = 0;
    }
}

// Fails, can't redeclare readonly property
class E extends D {
    constructor(readonly x: number) {
        super(x);
        this.x = 1;
    }
}


//// [readonlyConstructorAssignment.js]
class A {
    x;
    constructor(x) {
        this.x = x;
        this.x = 0;
    }
}
class B extends A {
    constructor(x) {
        super(x);
        this.x = 1;
    }
}
class C extends A {
    x;
    constructor(x) {
        this.x = x;
        super(x);
        this.x = 1;
    }
}
class D {
    x;
    constructor(x) {
        this.x = x;
        this.x = 0;
    }
}
class E extends D {
    x;
    constructor(x) {
        this.x = x;
        super(x);
        this.x = 1;
    }
}
