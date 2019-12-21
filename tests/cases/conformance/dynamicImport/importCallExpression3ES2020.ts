// @module: es2020
// @target: es2020
// @filename: 0.ts
export class B {
    print() { return "I am B"}
}

// @filename: 2.ts
async function foo() {
    class C extends (await import("./0")).B {}
    var c = new C();
    c.print();
}
foo();
