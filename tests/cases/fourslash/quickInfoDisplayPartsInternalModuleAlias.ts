/// <reference path='fourslash.ts'/>

////module m.m1 {
////    export class c {
////    }
////}
////module m2 {
////    import /*1*/a1 = m;
////    new /*2*/a1.m1.c();
////    import /*3*/a2 = m.m1;
////    new /*4*/a2.c();
////    export import /*5*/a3 = m;
////    new /*6*/a3.m1.c();
////    export import /*7*/a4 = m.m1;
////    new /*8*/a4.c();
////}

verify.baselineQuickInfo();
