/// <reference path='fourslash.ts' />

////import /*a*/d/*b*/, * as n from "m";

goTo.select("a", "b");
verify.not.refactorAvailable("Convert import");
