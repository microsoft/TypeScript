/// <reference path='fourslash.ts' />

//// [|class A {
////     constructor() {
////         let e: any = 10;
////         this.x = { a: 10, b: "hello", c: undefined, d: null, e: e };
////     }
//// }|]

verify.rangeAfterCodeFix(`
class A {
    x: { a: number; b: string; c: any; d: any; e: any; };
    
    constructor() {
        let e: any = 10;
        this.x = { a: 10, b: "hello", c: undefined, d: null, e: e };
    }
}
`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
