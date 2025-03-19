//// [tests/cases/compiler/staticPropSuper.ts] ////

//// [staticPropSuper.ts]
class A {
}

class B extends A {
    public static s: number = 9;

    constructor() {
        var x = 1; // should not error
        super();
    }
}

class C extends A {
    public p: number = 10;

    constructor() {
        var x = 1; // should error
    }
}

class D extends A {
    private p: number = 11;

    constructor() {
        var x = 1; // should error
    }
}

class E extends A {
    p: number = 12;

    constructor() {
        var x = 1; // should error
    }
}

//// [staticPropSuper.js]
class A {
}
class B extends A {
    static s = 9;
    constructor() {
        var x = 1; // should not error
        super();
    }
}
class C extends A {
    p = 10;
    constructor() {
        var x = 1; // should error
    }
}
class D extends A {
    p = 11;
    constructor() {
        var x = 1; // should error
    }
}
class E extends A {
    p = 12;
    constructor() {
        var x = 1; // should error
    }
}
