/// <reference path='fourslash.ts' />

//// function f(item: { a: 1 }, b = item.a) {
////     call(/*a*/item/*b*/.a, b)
//// }

goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason('implicit', 'Convert to destruction');
