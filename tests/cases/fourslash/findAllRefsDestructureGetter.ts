/// <reference path="fourslash.ts" />

////class Test {
////    get /*x0*/x() { return 0; }
////
////    set /*y0*/y(a: number) {}
////}
////const { /*x1*/x, /*y1*/y } = new Test();
/////*x2*/x; /*y2*/y;

verify.baselineFindAllReferences('x0', 'x1', 'x2', 'y0', 'y1', 'y2')
