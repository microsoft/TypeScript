/// <reference path='fourslash.ts' />

//// const item = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ] as const
//// call(/*a*/item/*b*/[14], item[8], item[16])

goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason('implicit', 'Convert to destruction');
