/// <reference path='fourslash.ts' />

// @Filename: goToDefinitionDifferentFile_Definition.ts
////var /*remoteVariableDefinition*/remoteVariable;
////function /*remoteFunctionDefinition*/remoteFunction() { }
////class /*remoteClassDefinition*/remoteClass { }
////interface /*remoteInterfaceDefinition*/remoteInterface{ }
////module /*remoteModuleDefinition*/remoteModule{ export var foo = 1;}

// @Filename: goToDefinitionDifferentFile_Consumption.ts
/////*remoteVariableReference*/remoteVariable = 1;
/////*remoteFunctionReference*/remoteFunction();
////var foo = new /*remoteClassReference*/remoteClass();
////class fooCls implements /*remoteInterfaceReference*/remoteInterface { }
////var fooVar = /*remoteModuleReference*/remoteModule.foo;

verify.baselineGetDefinitionAtPosition("remoteVariableReference", "remoteFunctionReference", "remoteClassReference", "remoteInterfaceReference", "remoteModuleReference");
