/// <reference path='fourslash.ts' />

//// [|class A {
////     y: number;
////     constructor(public a: number) {
////         this.x = function(x: number, y?: A){
////             return x > 0 ? x : y;
////         }
////     }
//// }|]

verify.rangeAfterCodeFix(`
class A {
    x: (x: number, y?: A) => number | A;
    y: number;
    constructor(public a: number) {
        this.x = function(x: number, y?: A){
            return x > 0 ? x : y;
        }
    }
}
`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
