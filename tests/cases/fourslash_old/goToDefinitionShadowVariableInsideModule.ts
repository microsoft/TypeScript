/// <reference path='fourslash.ts'/>

////module shdModule {
////    var /*shadowVariableDefinition*/shdVar;
////    /*shadowVariableReference*/shdVar = 1;
////}

goTo.marker('shadowVariableReference');
goTo.definition();
verify.caretAtMarker('shadowVariableDefinition');