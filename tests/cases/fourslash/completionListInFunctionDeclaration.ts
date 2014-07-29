/// <reference path='fourslash.ts' />

////var a = 0;
////function foo(/**/

goTo.marker();
verify.completionListIsEmpty();
edit.insert("a");  // foo(a|
verify.completionListIsEmpty();
edit.insert(" , "); // foo(a ,|
verify.completionListIsEmpty();
edit.insert("b"); // foo(a ,b|
verify.completionListIsEmpty();
edit.insert(":"); // foo(a ,b:| <- type ref
verify.not.completionListIsEmpty();
edit.insert("number, "); // foo(a ,b:number,|
verify.completionListIsEmpty();