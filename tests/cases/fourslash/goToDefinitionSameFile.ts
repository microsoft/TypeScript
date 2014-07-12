/// <reference path='fourslash.ts' />

////var /*localVariableDefinition*/localVariable;
/////*localFunctionDefinition*/function localFunction() { }
/////*localClassDefinition*/class localClass { }
/////*localInterfaceDefinition*/interface localInterface{ }
////module /*localModuleDefinition*/localModule{ export var foo = 1;}
////
////
/////*localVariableReference*/localVariable = 1;
/////*localFunctionReference*/localFunction();
////var foo = new /*localClassReference*/localClass();
////class fooCls implements /*localInterfaceReference*/localInterface { }
////var fooVar = /*localModuleReference*/localModule.foo;

var markerList = [
    "localVariable",
    "localFunction",
    "localClass",
    "localInterface",
    "localModule",
];

markerList.forEach((marker) => {
    goTo.marker(marker + 'Reference');
    goTo.definition();
    verify.caretAtMarker(marker + 'Definition');
});
