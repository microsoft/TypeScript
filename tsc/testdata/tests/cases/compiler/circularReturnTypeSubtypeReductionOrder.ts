// @strict: true
// @target: esnext
// @noEmit: true

// @filename: expression.ts
// Subtype reduction of rebuild's return type relates the class to A,
// which needs b's return type, which needs rebuild's: a cycle. The
// relation only observes b's return type in progress, so resolving b's
// first does not fail, and neither member is circular, whichever return
// type is requested first.
interface A {
    b(): A;
    c: A;
}
declare const flag: boolean;
const A: new () => A = class {
    rebuild() {
        return flag ? this : new A();
    }
    b() {
        return this.rebuild();
    }
    c() {
        return this.rebuild;
    }
};
export {};

// @filename: declaration.ts
interface B {
    b(): B;
}
declare const flag: boolean;
class K {
    rebuild() {
        return flag ? this : new B();
    }
    b() {
        return this.rebuild();
    }
}
const B: new () => B = K;
export {};

// @filename: declaredLater.ts
// The same, with the member the relation requests declared first.
interface D {
    b(): D;
}
declare const flag: boolean;
const D: new () => D = class {
    b() {
        return this.rebuild();
    }
    rebuild() {
        return flag ? this : new D();
    }
};
export {};
