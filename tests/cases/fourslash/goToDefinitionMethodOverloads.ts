/// <reference path='fourslash.ts' />

////class MethodOverload {
////    static method();
////    static method(foo: string);
/////*staticMethodDefinition*/static method(foo?: any) { }
////    public method(): any;
////    public method(foo: string);
/////*instanceMethodDefinition*/public method(foo?: any) { return "foo" }
////}

////// static method
////MethodOverload./*staticMethodReference*/method();

////// instance method
////var methodOverload = new MethodOverload();
////methodOverload./*instanceMethodReference*/method();

goTo.marker('staticMethodReference');
goTo.definition();
verify.caretAtMarker('staticMethodDefinition');

goTo.marker('instanceMethodReference');
goTo.definition();
verify.caretAtMarker('instanceMethodDefinition');
