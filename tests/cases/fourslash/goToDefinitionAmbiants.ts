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

verify.goToDefinitionForMarkers("ambientVariable", "ambientFunction", "constructor", "staticMethod", "instanceMethod");
