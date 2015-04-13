/// <reference path='fourslash.ts' />

////var /*varDef*/x = {
////    /*varProp*/x
////}
////let /*letDef*/y = {
////    /*letProp*/y
////}

goTo.marker("varProp");
goTo.definition();
verify.caretAtMarker("varDef");

goTo.marker("letProp");
goTo.definition();
verify.caretAtMarker("letDef");