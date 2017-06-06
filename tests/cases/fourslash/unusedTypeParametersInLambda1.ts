/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// function f1() {
////     [|return <T>(x:number) => {x}|]
//// }

verify.rangeAfterCodeFix("return (x:number) => {x}", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
