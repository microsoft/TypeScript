/// <reference path='fourslash.ts'/>

////class clsInOverload {
////    static fnOverload();
////    static fnOverload(foo: string);
////    /*staticFunctionDefinition*/static fnOverload(foo: any) { }
////}
////
////clsInOverload.fnOver/*staticFunctionReference*/load("test");

goTo.marker('staticFunctionReference');
goTo.definition();
verify.caretAtMarker('staticFunctionDefinition');