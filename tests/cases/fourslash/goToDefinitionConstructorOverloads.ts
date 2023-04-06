/// <reference path='fourslash.ts' />

////class ConstructorOverload {
////    [|/*constructorOverload1*/constructor|]();
////    /*constructorOverload2*/constructor(foo: string);
////    /*constructorDefinition*/constructor(foo: any)  { }
////}
////
////var constructorOverload = new [|/*constructorOverloadReference1*/ConstructorOverload|]();
////var constructorOverload = new [|/*constructorOverloadReference2*/ConstructorOverload|]("foo");

verify.baselineGoToDefinition(
    "constructorOverloadReference1",
    "constructorOverloadReference2",
    "constructorOverload1",
);
