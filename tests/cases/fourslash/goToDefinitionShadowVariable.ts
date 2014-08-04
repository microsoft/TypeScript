/// <reference path='fourslash.ts' />

////var shadowVariable = "foo";
////function shadowVariableTestModule() {
////    var /*shadowVariableDefinition*/shadowVariable;
////    /*shadowVariableReference*/shadowVariable = 1;
////}

goTo.marker('shadowVariableReference');
goTo.definition();
verify.caretAtMarker('shadowVariableDefinition');
