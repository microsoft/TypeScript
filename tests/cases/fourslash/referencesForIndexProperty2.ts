/// <reference path='fourslash.ts'/>

// References to a unknown index property

////var a;
////a["[|blah|]"];

verify.singleReferenceGroup('"blah"');
