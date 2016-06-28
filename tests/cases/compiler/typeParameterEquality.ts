// @target: es6
class C {
    get x(): <T>(a: T) => T { return null; }
    set x(p: <U>(a: U) => U) {}
}