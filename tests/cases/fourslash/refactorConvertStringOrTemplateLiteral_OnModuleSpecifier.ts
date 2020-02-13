/// <reference path='fourslash.ts' />

////import { x } from /*x*/"foo"/*y*/;

goTo.select("x", "y");
verify.not.refactorAvailable(ts.Diagnostics.Convert_to_template_string.message);
