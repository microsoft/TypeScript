/// <reference path='fourslash.ts' />


////class C {
////    [foo: /*1*/
////}

goTo.marker("1");
verify.completionListContains("C");
verify.completionListContains("foo"); // ideally this shouldn't show up for a type
edit.insert("typeof ");
verify.completionListContains("C");
verify.completionListContains("foo");