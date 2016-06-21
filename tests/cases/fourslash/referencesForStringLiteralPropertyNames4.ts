/// <reference path='fourslash.ts'/>

////var x = { "[|someProperty|]": 0 }
////x["[|someProperty|]"] = 3;
////x./*1*/[|someProperty|] = 5;

verify.rangesReferenceEachOther();
