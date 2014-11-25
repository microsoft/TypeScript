/// <reference path='fourslash.ts' />

////module M {
////    export interface /*1*/__proto__ {}
////}
////var /*2*/__proto__: M.__proto__;
/////*3*/
////var /*4*/fun: (__proto__: any) => boolean;

goTo.marker('1');
verify.quickInfoIs("interface M.__proto__", "");
goTo.marker('2');
verify.quickInfoIs("(var) __proto__: M.__proto__", "");
goTo.marker('3');
verify.completionListContains("__proto__", "(var) __proto__: M.__proto__", "");
edit.insert("__proto__");
goTo.definition();
verify.caretAtMarker('2');
goTo.marker('4');
verify.quickInfoIs("(var) fun: (__proto__: any) => boolean", "");