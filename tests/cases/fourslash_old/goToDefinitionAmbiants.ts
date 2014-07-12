/// <reference path='fourslash.ts' />

////declare var /*ambientVariableDefinition*/ambientVar;
/////*ambientFunctionDefinition*/declare function ambientFunction();
////declare class ambientClass {
////    /*constructorDefinition*/constructor();
////    /*staticMethodDefinition*/static method();
////    /*instanceMethodDefinition*/public method();
////}
/////
/////*ambientVariableReference*/ambientVar = 1;
/////*ambientFunctionReference*/ambientFunction();
////var ambientClassVariable = new /*constructorReference*/ambientClass();
////ambientClass./*staticMethodReference*/method();
////ambientClassVariable./*instanceMethodReference*/method();

var markerList = [
    "ambientVariable",
    "ambientFunction",
    "constructor",
    "staticMethod",
    "instanceMethod",
];

markerList.forEach((marker) => {
    goTo.marker(marker + 'Reference');
    goTo.definition();
    verify.caretAtMarker(marker + 'Definition');
});
