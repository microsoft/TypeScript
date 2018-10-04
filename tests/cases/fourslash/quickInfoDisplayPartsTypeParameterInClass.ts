/// <reference path='fourslash.ts'/>

////class /*1*/c</*2*/T> {
////    /*3*/constructor(/*4*/a: /*5*/T) {
////    }
////    /*6*/method</*7*/U>(/*8*/a: /*9*/U, /*10*/b: /*11*/T) {
////        return /*12*/a;
////    }
////}
////var /*13*/cInstance = new /*14*/c("Hello");
////var /*15*/cVal = /*16*/c;
/////*17*/cInstance./*18*/method("hello", "cello");
////class /*19*/c2</*20*/T extends /*21*/c<string>> {
////    /*22*/constructor(/*23*/a: /*24*/T) {
////    }
////    /*25*/method</*26*/U extends /*27*/c<string>>(/*28*/a: /*29*/U, /*30*/b: /*31*/T) {
////        return /*32*/a;
////    }
////}
////var /*33*/cInstance1 = new /*34*/c2(/*35*/cInstance);
////var /*36*/cVal2 = /*37*/c2;
/////*38*/cInstance1./*39*/method(/*40*/cInstance, /*41*/cInstance);

verify.baselineQuickInfo();