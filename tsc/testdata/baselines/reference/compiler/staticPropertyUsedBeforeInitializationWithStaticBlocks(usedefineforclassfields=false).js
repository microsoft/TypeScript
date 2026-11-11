//// [tests/cases/compiler/staticPropertyUsedBeforeInitializationWithStaticBlocks.ts] ////

//// [staticPropertyUsedBeforeInitializationWithStaticBlocks.ts]
class A {
    static {}
    static a = A.b;
    static b: number = 1;
}
class B {
    static { B.b = 2; }
    static a = B.b;
    static b: number;
}
class C {
    static { if (Math.random()) C.b = 2; }
    static a = C.b;
    static b: number;
}
class D {
    static { this.#b = 2; }
    static a = D.#b;
    static #b: number;
}
class E {
    static { }
    static a = this.b;
    static b = 1;
}
class F {
    static { this.b = 1; }
    static a = this.b;
    static b: number;
}


//// [staticPropertyUsedBeforeInitializationWithStaticBlocks.js]
"use strict";
class A {
    static { }
    static { this.a = A.b; }
    static { this.b = 1; }
}
class B {
    static { B.b = 2; }
    static { this.a = B.b; }
}
class C {
    static { if (Math.random())
        C.b = 2; }
    static { this.a = C.b; }
}
class D {
    static { this.#b = 2; }
    static { this.a = D.#b; }
    static #b;
}
class E {
    static { }
    static { this.a = this.b; }
    static { this.b = 1; }
}
class F {
    static { this.b = 1; }
    static { this.a = this.b; }
}
