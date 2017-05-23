/// <reference path='fourslash.ts' />

//// [|class A {
////     constructor() {
////         this.x = function(x: number, y?: A){
////             return x > 0 ? x : y;
////         }
////     }
//// }|]

verify.rangeAfterCodeFix(`
class A {
    x: (x: number, y?: A) => A;
    constructor() {
        this.x = function(x: number, y?: A){
            return x > 0 ? x : y;
        }
    }
}
`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
