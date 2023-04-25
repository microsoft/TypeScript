/// <reference path='fourslash.ts' />

////class C2 {
////}
////let /*I*/I: {
////    /*constructSignature*/new(): C2;
////};
////new [|/*invokeExpression1*/I|]();
////let /*symbolDeclaration*/I2: {
////};
////new [|/*invokeExpression2*/I2|]();

verify.baselineGoToDefinition(
    "invokeExpression1",
    "invokeExpression2",
);
