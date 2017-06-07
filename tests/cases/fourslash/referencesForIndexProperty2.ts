/// <reference path='fourslash.ts'/>

// References to a unknown index property

////var a;
////a["[|{| "isInString": true |}blah|]"];

verify.singleReferenceGroup('"blah"');
