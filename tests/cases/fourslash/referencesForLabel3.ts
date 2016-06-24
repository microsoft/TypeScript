/// <reference path='fourslash.ts'/>

// References to unused label

////[|label|]: while (true) {
////    var label = "label";
////}

const [label] = test.ranges();
verify.referencesOf(label, [label]);
