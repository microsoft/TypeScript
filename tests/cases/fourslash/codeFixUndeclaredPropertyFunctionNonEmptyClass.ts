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
    y: number;
    x: (x: number, y?: A) => number | A;
    constructor(public a: number) {
        this.x = function(x: number, y?: A){
            return x > 0 ? x : y;
        }
    }
}
`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
