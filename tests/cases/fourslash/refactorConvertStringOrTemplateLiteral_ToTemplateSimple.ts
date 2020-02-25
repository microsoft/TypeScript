/// <reference path='fourslash.ts' />

//// const foo = "/*x*/f/*y*/oobar rocks"

goTo.select("x", "y");
verify.not.refactorAvailable(ts.Diagnostics.Convert_to_template_string.message);