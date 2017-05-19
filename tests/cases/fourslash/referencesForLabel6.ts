/// <reference path='fourslash.ts'/>

// References to labels with close names

////[|labela|]: while (true) {
////[|labelb|]:     while (false) { break [|labelb|]; }
////            break labelc;
////}

const ranges = test.rangesByText();
verify.singleReferenceGroup("labela", ranges.get("labela"));
verify.singleReferenceGroup("labelb", ranges.get("labelb"));
