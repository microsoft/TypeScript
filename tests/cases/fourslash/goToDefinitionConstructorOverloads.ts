/// <reference path='fourslash.ts' />

////class ConstructorOverload {
////    [|/*constructorOverload1*/constructor|]();
////    /*constructorOverload2*/constructor(foo: string);
////    /*constructorDefinition*/constructor(foo: any)  { }
////}
////
////var constructorOverload = new [|/*constructorOverloadReference1*/ConstructorOverload|]();
////var constructorOverload = new [|/*constructorOverloadReference2*/ConstructorOverload|]("foo");
////
////class Extended extends ConstructorOverload {
////    readonly name = "extended";
////}
////var extended1 = new [|/*extendedRef1*/Extended|]();
////var extended2 = new [|/*extendedRef2*/Extended|]("foo");

verify.baselineGoToDefinition(
    "constructorOverloadReference1",
    "constructorOverloadReference2",
    "constructorOverload1",
    "extendedRef1",
    "extendedRef2",
);
