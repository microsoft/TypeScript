/// <reference path='fourslash.ts' />

////declare var /*ambientVariableDefinition*/ambientVar;
////declare function /*ambientFunctionDefinition*/ambientFunction();
////declare class ambientClass {
////    /*constructorDefinition*/constructor();
////    static /*staticMethodDefinition*/method();
////    public /*instanceMethodDefinition*/method();
////}
////
/////*ambientVariableReference*/ambientVar = 1;
/////*ambientFunctionReference*/ambientFunction();
////var ambientClassVariable = new /*constructorReference*/ambientClass();
////ambientClass./*staticMethodReference*/method();
////ambientClassVariable./*instanceMethodReference*/method();

verify.baselineGetDefinitionAtPosition("ambientVariableReference", "ambientFunctionReference", "constructorReference", "staticMethodReference", "instanceMethodReference");
