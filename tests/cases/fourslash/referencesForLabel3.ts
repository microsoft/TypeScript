/// <reference path='fourslash.ts'/>

// References to unused label

////[|label|]: while (true) {
////    var label = "label";
////}

verify.singleReferenceGroup("label");
