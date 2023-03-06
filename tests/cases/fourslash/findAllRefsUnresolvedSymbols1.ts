/// <reference path='fourslash.ts'/>

////let a: /*a0*/Bar;
////let b: /*a1*/Bar<string>;
////let c: /*a2*/Bar<string, number>;
////let d: /*b0*/Bar./*c0*/X;
////let e: /*b1*/Bar./*c1*/X<string>;
////let f: /*b2*/Bar./*d0*/X./*e0*/Y;

verify.baselineFindAllReferences('a0', 'a1', 'a2', 'b0', 'b1', 'b2', 'c0', 'c1', 'd0', 'e0');
