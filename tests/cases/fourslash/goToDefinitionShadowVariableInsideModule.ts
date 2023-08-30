/// <reference path='fourslash.ts'/>

////module shdModule {
////    var /*shadowVariableDefinition*/shdVar;
////    /*shadowVariableReference*/shdVar = 1;
////}

verify.baselineGetDefinitionAtPosition("shadowVariableReference");
