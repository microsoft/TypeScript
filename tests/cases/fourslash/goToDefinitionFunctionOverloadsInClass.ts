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

verify.goToDefinition({
    staticFunctionOverload: "staticFunctionOverloadDefinition",
    functionOverload: "functionOverloadDefinition"
});
