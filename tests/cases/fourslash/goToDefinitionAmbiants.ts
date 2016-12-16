/// <reference path='fourslash.ts' />

////declare var /*ambientVariableDefinition*/ambientVar;
/////*ambientFunctionDefinition*/declare function ambientFunction();
////declare class ambientClass {
////    /*constructorDefinition*/constructor();
////    /*staticMethodDefinition*/static method();
////    /*instanceMethodDefinition*/public method();
////}
////
/////*ambientVariableReference*/ambientVar = 1;
/////*ambientFunctionReference*/ambientFunction();
////var ambientClassVariable = new /*constructorReference*/ambientClass();
////ambientClass./*staticMethodReference*/method();
////ambientClassVariable./*instanceMethodReference*/method();

verify.goToDefinitionForMarkers("ambientVariable", "ambientFunction", "constructor", "staticMethod", "instanceMethod");
