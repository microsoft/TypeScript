/// <reference path='fourslash.ts'/>

// References to a label outside function bounderies

////[|label|]: function foo(label) {
////    while (true) {
////        break [|label|];
////    }
////}

verify.singleReferenceGroup("label");
