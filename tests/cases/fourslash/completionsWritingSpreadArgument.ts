/// <reference path='fourslash.ts'/>

// @lib: es5

////
//// const [] = [Math.min(./*marker*/)]
////

goTo.marker("marker");
verify.completions({ exact: undefined });
edit.insert(".");
verify.completions({ exact: undefined });
edit.insert(".");
verify.completions({ exact: completion.globals });
