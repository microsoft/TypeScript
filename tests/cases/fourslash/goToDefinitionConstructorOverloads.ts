/// <reference path='fourslash.ts' />

////class ConstructorOverload {
////    /*constructorOverload1*/constructor();
////    /*constructorOverload2*/constructor(foo: string);
////    /*constructorDefinition*/constructor(foo: any)  { }
////}
////
////var constructorOverload = new /*constructorOverloadReference1*/ConstructorOverload();
////var constructorOverload = new /*constructorOverloadReference2*/ConstructorOverload("foo");

verify.goToDefinition({
    constructorOverloadReference1: "constructorOverload1",
    constructorOverloadReference2: "constructorOverload2",
    constructorOverload1: "constructorDefinition"
});
