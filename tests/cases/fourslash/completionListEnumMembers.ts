/// <reference path='fourslash.ts' />

////enum Foo {
////    bar,
////    baz
////}
////
////var v = Foo./*valueReference*/ba;
////var t :Foo./*typeReference*/ba;
////Foo.bar./*enumValueReference*/;

goTo.marker('valueReference');
verify.completionListContains("bar");
verify.completionListContains("baz");
verify.completionListCount(2);


goTo.marker('typeReference');
verify.completionListCount(2);

goTo.marker('enumValueReference');
verify.completionListContains("toString");
verify.completionListContains("toFixed");
verify.completionListCount(6);
