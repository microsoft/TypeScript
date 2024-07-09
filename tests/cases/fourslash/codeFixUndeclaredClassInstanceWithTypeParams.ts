/// <reference path='fourslash.ts' />

//// class A<T> {
////     a: number;
////     b: string;
////     constructor(public x: T) {}
//// }
//// [|class B {
////     constructor() {
////         this.x = new A(3);
////     }
//// }|]

verify.rangeAfterCodeFix(`
class B {
    x: A<number>;

    constructor() {
        this.x = new A(3);
    }
}
`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);