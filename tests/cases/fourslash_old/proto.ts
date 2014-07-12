/// <reference path='fourslash.ts' />

////module M {
////    export interface /*1*/__proto__ {}
////}
////var /*2*/__proto__: M.__proto__;
/////*3*/
////var /*4*/fun: (__proto__: any) => boolean;

goTo.marker('1');
verify.quickInfoIs("__proto__", "", "M.__proto__", "interface");
goTo.marker('2');
verify.quickInfoIs("M.__proto__", "", "__proto__", "var");
goTo.marker('3');
verify.completionListContains("__proto__", "M.__proto__", "", "__proto__", "var");
edit.insert("__proto__");
goTo.definition();
verify.caretAtMarker('2');
goTo.marker('4');
verify.quickInfoIs("(__proto__: any) => boolean", "", "fun", "var");