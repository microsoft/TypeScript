/// <reference path='fourslash.ts' />

//// [|class A {
////     constructor() {
////         this.x = 10;
////     }
//// }|]

verify.rangeAfterCodeFix(`
class A {
    x: number;

    constructor() {
        this.x = 10;
    }
}
`);