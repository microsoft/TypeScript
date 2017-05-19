/// <reference path='fourslash.ts'/>

////enum /*1*/E {
////    /*2*/"e1",
////    /*3*/'e2' = 10,
////    /*4*/"e3"
////}
////var /*5*/eInstance: /*6*/E;
/////*7*/eInstance = /*8*/E[/*9*/"e1"];
/////*10*/eInstance = /*11*/E[/*12*/"e2"];
/////*13*/eInstance = /*14*/E[/*15*/'e3'];
////const enum /*16*/constE {
////    /*17*/"e1",
////    /*18*/'e2' = 10,
////    /*19*/"e3"
////}
////var /*20*/eInstance1: /*21*/constE;
/////*22*/eInstance1 = /*23*/constE[/*24*/"e1"];
/////*25*/eInstance1 = /*26*/constE[/*27*/"e2"];
/////*28*/eInstance1 = /*29*/constE[/*30*/'e3'];

verify.baselineQuickInfo();