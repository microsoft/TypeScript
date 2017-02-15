/// <reference path='fourslash.ts' />

//// [|class A {
////     constructor() {
////         this.x = { a: 10, b: "hello" };
////     }
//// }|]

verify.rangeAfterCodeFix(`
class A {
    x: { a: number, b: string };

    constructor() {
        this.x = 10;
    }
}
`);