/// <reference path='fourslash.ts' />

//// [|class A {
////     constructor() {
////         this.x = 10;
////     }
//// }|]

verify.rangeAfterCodeFix(`
class A {
    [name: string]: number;

    constructor() {
        this.x = 10;
    }
}
`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 1);