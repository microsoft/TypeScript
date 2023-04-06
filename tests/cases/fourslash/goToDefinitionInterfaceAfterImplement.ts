/// <reference path='fourslash.ts'/>

////interface /*interfaceDefinition*/sInt {
////    sVar: number;
////    sFn: () => void;
////}
////
////class iClass implements /*interfaceReference*/sInt {
////    public sVar = 1;
////    public sFn() {
////    }
////}

verify.baselineGetDefinitionAtPosition("interfaceReference");
