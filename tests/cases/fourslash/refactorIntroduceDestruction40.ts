/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2
//// }
//// call(it/*a*/em.a, item.b)

goTo.marker('a');
verify.not.refactorAvailableForTriggerReason('implicit', 'Introduce destruction');