//// [tests/cases/compiler/initializerWithThisPropertyAccess.ts] ////

//// [initializerWithThisPropertyAccess.ts]
class A {
    a: number;
    b = this.a;  // Error
    c = () => this.a;
    d = (new A()).a;
    constructor() {
        this.a = 1;
    }
}

class B extends A {
    x = this.a;
}

class C {
    a!: number;
    b = this.a;
}

// Repro from #37979

class Foo {
    private bar: Bar;
    readonly barProp = this.bar.prop;
    constructor() {
        this.bar = new Bar();
    }
}

class Bar {
    readonly prop = false;
}


//// [initializerWithThisPropertyAccess.js]
"use strict";
class A {
    constructor() {
        this.b = this.a; // Error
        this.c = () => this.a;
        this.d = (new A()).a;
        this.a = 1;
    }
}
class B extends A {
    constructor() {
        super(...arguments);
        this.x = this.a;
    }
}
class C {
    constructor() {
        this.b = this.a;
    }
}
// Repro from #37979
class Foo {
    constructor() {
        this.barProp = this.bar.prop;
        this.bar = new Bar();
    }
}
class Bar {
    constructor() {
        this.prop = false;
    }
}


//// [initializerWithThisPropertyAccess.d.ts]
declare class A {
    a: number;
    b: number;
    c: () => number;
    d: number;
    constructor();
}
declare class B extends A {
    x: number;
}
declare class C {
    a: number;
    b: number;
}
declare class Foo {
    private bar;
    readonly barProp = false;
    constructor();
}
declare class Bar {
    readonly prop = false;
}
