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
verify.memberListContains("bar");
verify.memberListContains("baz");
verify.memberListCount(2);


goTo.marker('typeReference');
verify.memberListCount(0);

goTo.marker('enumValueReference');
verify.memberListContains("toString");
verify.memberListContains("toFixed");
verify.memberListCount(5);
