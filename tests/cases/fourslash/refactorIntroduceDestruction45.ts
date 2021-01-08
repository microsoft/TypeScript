/// <reference path='fourslash.ts' />

//// const item = [ 1, 2, 3 ] as const
//// call(/*a*/item/*b*/[2])

goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason('implicit', 'Convert to destruction');
