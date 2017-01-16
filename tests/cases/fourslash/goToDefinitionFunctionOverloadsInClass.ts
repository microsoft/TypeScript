/// <reference path='fourslash.ts'/>

////class clsInOverload {
////    static fnOverload();
////    static /*staticFunctionOverload*/fnOverload(foo: string);
////    static /*staticFunctionOverloadDefinition*/fnOverload(foo: any) { }
////    public /*functionOverload*/fnOverload(): any;
////    public fnOverload(foo: string);
////    public /*functionOverloadDefinition*/fnOverload(foo: any) { return "foo" }
////
////    constructor() { }
////}

verify.goToDefinition({
    staticFunctionOverload: "staticFunctionOverloadDefinition",
    functionOverload: "functionOverloadDefinition"
});
