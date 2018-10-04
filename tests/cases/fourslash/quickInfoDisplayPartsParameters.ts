/// <reference path='fourslash.ts'/>

////function /*1*/foo(/*2*/param: string, /*3*/optionalParam?: string, /*4*/paramWithInitializer = "hello", .../*5*/restParam: string[]) {
////    /*6*/param = "Hello";
////    /*7*/optionalParam = "World";
////    /*8*/paramWithInitializer = "Hello";
////    /*9*/restParam[0] = "World";
////}

verify.baselineQuickInfo();