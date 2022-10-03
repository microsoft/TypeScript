/// <reference path='fourslash.ts'/>

////interface /*1*/I</*2*/T> {
////    new </*3*/U>(/*4*/a: /*5*/U, /*6*/b: /*7*/T): /*8*/U;
////    </*9*/U>(/*10*/a: /*11*/U, /*12*/b: /*13*/T): /*14*/U;
////    /*15*/method</*16*/U>(/*17*/a: /*18*/U, /*19*/b: /*20*/T): /*21*/U;
////}
////var /*22*/iVal: /*23*/I<string>;
////new /*24*/iVal("hello", "hello");
/////*25*/iVal("hello", "hello");
/////*26*/iVal./*27*/method("hello", "hello");
////interface /*28*/I1</*29*/T extends /*30*/I<string>> {
////    new </*31*/U extends /*32*/I<string>>(/*33*/a: /*34*/U, /*35*/b: /*36*/T): /*37*/U;
////    </*38*/U extends /*39*/I<string>>(/*40*/a: /*41*/U, /*42*/b: /*43*/T): /*44*/U;
////    /*45*/method</*46*/U extends /*47*/I<string>>(/*48*/a: /*49*/U, /*50*/b: /*51*/T): /*52*/U;
////}
////var /*53*/iVal1: /*54*/I1</*55*/I<string>>;
////new /*56*/iVal1(/*57*/iVal, /*58*/iVal);
/////*59*/iVal1(/*60*/iVal, /*61*/iVal);
/////*62*/iVal1./*63*/method(/*64*/iVal, /*65*/iVal);

verify.baselineQuickInfo();