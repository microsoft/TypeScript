/// <reference path='fourslash.ts' />

////"/**/foo";

goTo.marker("");
verify.not.refactorAvailable('Extract Symbol');
