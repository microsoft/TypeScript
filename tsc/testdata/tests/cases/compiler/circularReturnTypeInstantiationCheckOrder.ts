// @strict: true
// @target: esnext
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Requested first, rebuild's return type is resolved as if b's, which the
// relation of subtype reduction requests through its instantiation for this,
// had been resolved first. Neither member is circular in any order.
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
