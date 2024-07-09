/// <reference path='fourslash.ts'/>

////let /*1*/a = 10;
////function foo() {
////    let /*2*/b = /*3*/a;
////    if (b) {
////        let /*4*/b1 = 10;
////    }
////}
////module m {
////    let /*5*/c = 10;
////    export let /*6*/d = 10;
////    if (c) {
////        let /*7*/e = 10;
////    }
////}
////let /*8*/f: () => number;
////let /*9*/g = /*10*/f;
/////*11*/f();
////let /*12*/h: { (a: string): number; (a: number): string; };
////let /*13*/i = /*14*/h;
/////*15*/h(10);
/////*16*/h("hello");

verify.baselineQuickInfo();