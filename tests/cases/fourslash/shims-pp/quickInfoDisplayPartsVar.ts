/// <reference path='fourslash.ts'/>

// @BaselineFile: quickInfoDisplayPartsVar.shims-pp.baseline

////var /*1*/a = 10;
////function foo() {
////    var /*2*/b = /*3*/a;
////}
////module m {
////    var /*4*/c = 10;
////    export var /*5*/d = 10;
////}
////var /*6*/f: () => number;
////var /*7*/g = /*8*/f;
/////*9*/f();
////var /*10*/h: { (a: string): number; (a: number): string; };
////var /*11*/i = /*12*/h;
/////*13*/h(10);
/////*14*/h("hello");

verify.baselineQuickInfo();