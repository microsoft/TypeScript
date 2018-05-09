/// <reference path='fourslash.ts' />

// Not valid TS ('await' expression is only allowed within an async function.)

////a/**/wait 100;
////async function f() {
////    await 300;
////}

goTo.marker();
verify.occurrencesAtPositionCount(0);