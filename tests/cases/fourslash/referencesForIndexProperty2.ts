/// <reference path='fourslash.ts'/>

// References to a unknown index property

////var a;
////a[/**/"blah"];

goTo.marker("");
verify.referencesAre([]);
