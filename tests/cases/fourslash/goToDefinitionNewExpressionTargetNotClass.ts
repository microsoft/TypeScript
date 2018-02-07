/// <reference path='fourslash.ts' />

////class C2 {
////}
////let I: {
////    /*constructSignature*/new(): C2;
////};
////let C = new [|/*invokeExpression*/I|]();

verify.goToDefinition("invokeExpression", "constructSignature");
