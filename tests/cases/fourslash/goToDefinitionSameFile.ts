/// <reference path='fourslash.ts' />

////var /*localVariableDefinition*/localVariable;
////function /*localFunctionDefinition*/localFunction() { }
////class /*localClassDefinition*/localClass { }
////interface /*localInterfaceDefinition*/localInterface{ }
////module /*localModuleDefinition*/localModule{ export var foo = 1;}
////
////
/////*localVariableReference*/localVariable = 1;
/////*localFunctionReference*/localFunction();
////var foo = new /*localClassReference*/localClass();
////class fooCls implements /*localInterfaceReference*/localInterface { }
////var fooVar = /*localModuleReference*/localModule.foo;

verify.baselineGetDefinitionAtPosition("localVariableReference", "localFunctionReference", "localClassReference", "localInterfaceReference", "localModuleReference");
