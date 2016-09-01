/// <reference path='fourslash.ts'/>

////class clsInOverload {
////    static fnOverload();
////    static /*staticFunctionOverload*/fnOverload(foo: string);
////    /*staticFunctionOverloadDefinition*/static fnOverload(foo: any) { }
////    public /*functionOverload*/fnOverload(): any;
////    public fnOverload(foo: string);
////    /*functionOverloadDefinition*/public fnOverload(foo: any) { return "foo" }
////
////    constructor() { }
////}

goTo.marker('staticFunctionOverload');
goTo.definition();
verify.caretAtMarker('staticFunctionOverloadDefinition');

goTo.marker('functionOverload');
goTo.definition();
verify.caretAtMarker('functionOverloadDefinition');