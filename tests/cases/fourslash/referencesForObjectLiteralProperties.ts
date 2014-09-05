/// <reference path='fourslash.ts'/>

// References to an object literal property

////var x = { /*1*/add: 0, b: "string" };
////x["add"];
////x./*2*/add;
////var y = x;
////y.add;

goTo.marker("1");
verify.referencesCountIs(4);

goTo.marker("2");
verify.referencesCountIs(4);