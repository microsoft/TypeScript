// @strict: true
// @target: esnext
// @noEmit: true

// @filename: expression.ts
// Subtype reduction of rebuild's return type relates the class to A,
// which needs b's return type, which needs rebuild's: a cycle. Both
// members report it, whichever return type is requested first, as if
// rebuild's, declared first, were requested first.
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
