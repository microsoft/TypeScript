/// <reference path='fourslash.ts' />

//// const foo = "/*x*/w/*y*/ith back`tick"

goTo.select("x", "y");
verify.not.refactorAvailable(ts.Diagnostics.Convert_to_template_string.message);
