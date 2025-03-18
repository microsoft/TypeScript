//// [tests/cases/compiler/genericInstanceOf.ts] ////

//// [genericInstanceOf.ts]
interface F {
    (): number;
}

class C<T> {
    constructor(public a: T, public b: F) {}
    foo() {
        if (this.a instanceof this.b) {
        }
    }
}

//// [genericInstanceOf.js]
class C {
    a;
    b;
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    foo() {
        if (this.a instanceof this.b) {
        }
    }
}
