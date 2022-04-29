// @noImplicitAny: true
// @noImplicitThis: true
// @target: es5
interface Foo {
    n: number;
    x: number;
}
interface Bar {
    wrong: "place" | "time" | "method" | "technique";
}
const mismatch = {
    n: 13,
    get x(this: Foo) { return this.n; },
    set x(this: Bar, n) { this.wrong = "method"; }
}
const contextual: Foo = {
    n: 16,
    get x() { return this.n; }
}
