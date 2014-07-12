/// <reference path='fourslash.ts'/>

/////*interfaceDefinition*/interface sInt {
////    sVar: number;
////    sFn: () => void;
////}
////
////class iClass implements /*interfaceReference*/sInt {
////    public sVar = 1;
////    public sFn() {
////    }
////}

goTo.marker('interfaceReference');
goTo.definition();
verify.caretAtMarker('interfaceDefinition');