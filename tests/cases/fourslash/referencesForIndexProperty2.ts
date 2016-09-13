/// <reference path='fourslash.ts'/>

// References to a unknown index property

////var a;
////a["[|blah|]"];

goTo.position(test.ranges()[0].start, test.ranges()[0].fileName);
verify.referencesAre(test.ranges());

