//// [tests/cases/conformance/dynamicImport/importCallExpression3ES2020.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

//// [2.ts]
async function foo() {
    class C extends (await import("./0")).B {}
    var c = new C();
    c.print();
}
foo();


//// [0.js]
export class B {
    print() { return "I am B"; }
}
//// [2.js]
async function foo() {
    class C extends (await import("./0")).B {
    }
    var c = new C();
    c.print();
}
foo();
