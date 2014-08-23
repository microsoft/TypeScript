/// <reference path='fourslash.ts'/>

////var x = { "[|someProperty|]": 0 }
////x["[|someProperty|]"] = 3;
////x./*1*/[|someProperty|] = 5;

goTo.marker("1");
test.ranges().forEach(r => verify.referencesAtPositionContains(r));