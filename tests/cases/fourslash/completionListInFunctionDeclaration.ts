/// <reference path='fourslash.ts' />

////var a = 0;
////function foo(/**/

verify.completions({ marker: "", exact: undefined });
edit.insert("a");  // foo(a|
verify.completions({ exact: undefined });
edit.insert(" , "); // foo(a ,|
verify.completions({ exact: undefined });
edit.insert("b"); // foo(a ,b|
verify.completions({ exact: undefined });
edit.insert(":"); // foo(a ,b:| <- type ref
verify.completions({ exact: completion.globalTypes });
edit.insert("number, "); // foo(a ,b:number,|
verify.completions({ exact: undefined });
