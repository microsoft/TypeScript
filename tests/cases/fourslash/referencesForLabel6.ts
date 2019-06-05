/// <reference path='fourslash.ts'/>

// References to labels with close names

////[|labela|]: while (true) {
////[|labelb|]:     while (false) { break [|labelb|]; }
////            break labelc;
////}

verify.singleReferenceGroup("labela", "labela");
verify.singleReferenceGroup("labelb", "labelb");
