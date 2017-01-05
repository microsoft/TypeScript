/// <reference path='fourslash.ts' />


//// interface I { x: number; }
////
//// new class implements I {[|  |]};

verify.rangeAfterCodeFix(`
x: number;
`);