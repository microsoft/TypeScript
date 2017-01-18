/// <reference path='fourslash.ts' />

////class MethodOverload {
////    static /*staticMethodOverload1*/method();
////    static /*staticMethodOverload2*/method(foo: string);
////    static /*staticMethodDefinition*/method(foo?: any) { }
////    public /*instanceMethodOverload1*/method(): any;
////    public /*instanceMethodOverload2*/method(foo: string);
////    public /*instanceMethodDefinition*/method(foo?: any) { return "foo" }
////}

////// static method
////MethodOverload./*staticMethodReference1*/method();
////MethodOverload./*staticMethodReference2*/method("123");

////// instance method
////var methodOverload = new MethodOverload();
////methodOverload./*instanceMethodReference1*/method();
////methodOverload./*instanceMethodReference2*/method("456");

verify.goToDefinition({
    staticMethodReference1: "staticMethodOverload1",
    staticMethodReference2: "staticMethodOverload2",
    instanceMethodReference1: "instanceMethodOverload1",
    instanceMethodReference2: "instanceMethodOverload2",
    staticMethodOverload1: "staticMethodDefinition",
    instanceMethodOverload1: "instanceMethodDefinition"
});
