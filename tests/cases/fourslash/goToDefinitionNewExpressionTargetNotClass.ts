/// <reference path='fourslash.ts' />

////class C2 {
////}
////let I: {
////    /*constructSignature*/new(): C2;
////};
////new [|/*invokeExpression1*/I|]();
////let /*symbolDeclaration*/I2: {
////};
////new [|/*invokeExpression2*/I2|]();

verify.goToDefinition({
    invokeExpression1: "constructSignature",
    invokeExpression2: "symbolDeclaration"
});
