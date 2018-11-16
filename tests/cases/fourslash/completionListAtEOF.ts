/// <reference path='fourslash.ts' />

////var a;

goTo.eof();
verify.completions({ includes: "a" });

edit.insertLine("");
verify.completions({ includes: "a" });

edit.insertLine("");
verify.completions({ includes: "a" });
