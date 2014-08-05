/// <reference path='fourslash.ts' />

// @Filename: b.ts
/////*alias1Definition*/import alias1 = require("fileb");
////module Module {
////    /*alias2Definition*/export import alias2 = alias1;
////}
////
////// Type position
////var t1: /*alias1Type*/alias1.IFoo;
////var t2: Module./*alias2Type*/alias2.IFoo;
////
////// Value posistion
////var v1 = new /*alias1Value*/alias1.Foo();
////var v2 = new Module./*alias2Value*/alias2.Foo();


// @Filename: a.ts
////export class Foo {
////    private f;
////}
////export interface IFoo {
////    x;
////}


goTo.marker('alias1Type');
goTo.definition();
verify.caretAtMarker('alias1Definition');

goTo.marker('alias2Type');
goTo.definition();
verify.caretAtMarker('alias2Definition');


goTo.marker('alias1Value');
goTo.definition();
verify.caretAtMarker('alias1Definition');

goTo.marker('alias2Value');
goTo.definition();
verify.caretAtMarker('alias2Definition');
