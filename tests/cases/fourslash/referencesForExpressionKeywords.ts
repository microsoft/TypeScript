/// <reference path='fourslash.ts'/>

////class C {
////    static x = 1;
////}
/////*new*/new C();
/////*void*/void C;
/////*typeof*/typeof C;
/////*delete*/delete C.x;
/////*async*/async function* f() {
////    /*yield*/yield C;
////    /*await*/await C;
////}
////"x" /*in*/in C;
////undefined /*instanceof*/instanceof C;
////undefined /*as*/as C;

verify.baselineFindAllReferences('new', 'void', 'typeof', 'yield', 'await', 'in', 'instanceof', 'as', 'delete')
