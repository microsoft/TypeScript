/// <reference path='fourslash.ts' />

//// [|class A {
////     constructor() {
////         this.mythis = this;
////     }
//// }|]

verify.rangeAfterCodeFix(`
class A {
    mythis: this;

    constructor() {
        this.mythis = this;
    }
}
`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
