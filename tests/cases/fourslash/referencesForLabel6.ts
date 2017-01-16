/// <reference path='fourslash.ts'/>

// References to labels with close names

////[|labela|]: while (true) {
////[|labelb|]:     while (false) { break [|labelb|]; }
////            break labelc;
////}

const [a, b, useB] = test.ranges();
verify.referencesOf(a, [a]);
verify.rangesReferenceEachOther([b, useB]);
