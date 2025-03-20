//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.11.ts] ////

//// [usingDeclarations.11.ts]
class A {}
class C1 extends A {
    constructor() {
        using x = null;
        super();
    }
}
class C2 extends A {
    constructor() {
        super();
        using x = null;
    }
}
class C3 extends A {
    y = 1;
    constructor() {
        using x = null;
        super();
    }
}
class C4 extends A {
    constructor(public y: number) {
        using x = null;
        super();
    }
}
class C5 extends A {
    z = 1;
    constructor(public y: number) {
        using x = null;
        super();
    }
}


//// [usingDeclarations.11.js]
class A {
}
class C1 extends A {
    constructor() {
        using x = null;
        super();
    }
}
class C2 extends A {
    constructor() {
        super();
        using x = null;
    }
}
class C3 extends A {
    y = 1;
    constructor() {
        using x = null;
        super();
    }
}
class C4 extends A {
    y;
    constructor(y) {
        using x = null;
        super();
        this.y = y;
    }
}
class C5 extends A {
    y;
    z = 1;
    constructor(y) {
        using x = null;
        super();
        this.y = y;
    }
}
