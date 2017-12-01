/// <reference path='fourslash.ts' />

//// class A {
////     a: number;
////     b: string;
////     constructor(public x: any) {}
//// }
//// [|class B {
////     constructor() {
////         this.x = new A(3);
////     }
//// }|]

verify.rangeAfterCodeFix(`
class B {
    x: A;

    constructor() {
        this.x = new A(3);
    }
}
`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);