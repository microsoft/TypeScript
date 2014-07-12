/// <reference path='fourslash.ts' />

////class MethodOverload {
////    /*staticMethodOverload1*/static method();
////    /*staticMethodOverload2*/static method(foo: string);
/////*staticMethodDefinition*/static method(foo?: any) { }
////    /*instanceMethodOverload1*/public method(): any;
////    /*instanceMethodOverload2*/public method(foo: string);
/////*instanceMethodDefinition*/public method(foo?: any) { return "foo" }
////}

////// static method
////MethodOverload./*staticMethodReference1*/method();
////MethodOverload./*staticMethodReference2*/method("123");

////// instance method
////var methodOverload = new MethodOverload();
////methodOverload./*instanceMethodReference1*/method();
////methodOverload./*instanceMethodReference2*/method("456");

goTo.marker('staticMethodReference1');
goTo.definition();
verify.caretAtMarker('staticMethodOverload1');

goTo.marker('staticMethodReference2');
goTo.definition();
verify.caretAtMarker('staticMethodOverload2');

goTo.marker('instanceMethodReference1');
goTo.definition();
verify.caretAtMarker('instanceMethodOverload1');

goTo.marker('instanceMethodReference2');
goTo.definition();
verify.caretAtMarker('instanceMethodOverload2');

goTo.marker('staticMethodOverload1');
goTo.definition();
verify.caretAtMarker('staticMethodDefinition');

goTo.marker('instanceMethodOverload1');
goTo.definition();
verify.caretAtMarker('instanceMethodDefinition');

