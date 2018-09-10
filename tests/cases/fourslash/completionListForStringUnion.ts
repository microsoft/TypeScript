/// <reference path='fourslash.ts' />

//// type A = 'fooooo' | 'barrrrr';
//// type B<T extends A> = {};
//// type C = B<'fooooo' | '/**/'>


goTo.marker();
verify.completionListContains("fooooo");
verify.completionListContains("barrrrr");
edit.insert("b");
verify.completionListContains("barrrrr");
