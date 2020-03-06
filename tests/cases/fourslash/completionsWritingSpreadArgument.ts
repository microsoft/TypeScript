/// <reference path='fourslash.ts'/>

////
//// const [] = [Math.min(./*marker*/)]
////

goTo.marker("marker");
verify.completions({ exact: undefined });
edit.insert(".");
verify.completions({ exact: undefined });
edit.insert(".");
verify.completions({ exact: completion.globals });
