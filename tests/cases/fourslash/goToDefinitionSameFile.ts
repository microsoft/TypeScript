/// <reference path='fourslash.ts' />

////var /*localVariableDefinition*/localVariable;
/////*localFunctionDefinition*/function localFunction() { }
/////*localClassDefinition*/class localClass { }
/////*localInterfaceDefinition*/interface localInterface{ }
/////*localModuleDefinition*/module localModule{ export var foo = 1;}
////
////
/////*localVariableReference*/localVariable = 1;
/////*localFunctionReference*/localFunction();
////var foo = new /*localClassReference*/localClass();
////class fooCls implements /*localInterfaceReference*/localInterface { }
////var fooVar = /*localModuleReference*/localModule.foo;

verify.goToDefinitionForMarkers("localVariable", "localFunction", "localClass", "localInterface", "localModule");
