//// [tests/cases/conformance/types/thisType/thisTypeInAccessorsNegative.ts] ////

//// [thisTypeInAccessorsNegative.ts]
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


//// [thisTypeInAccessorsNegative.js]
var mismatch = {
    n: 13,
    get x() { return this.n; },
    set x(n) { this.wrong = "method"; }
};
var contextual = {
    n: 16,
    get x() { return this.n; }
};
