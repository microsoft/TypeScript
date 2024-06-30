/// <reference path='fourslash.ts' />

//// import * as a from "/*1a*/f/*1b*/oobar";
//// export * as b from "/*2a*/f/*2b*/oobar";
//// import * as c from "foobar" assert { "/*3a*/f/*3b*/oobar": "something" };
//// import * as d from "foobar" assert { "something": "/*4a*/f/*4b*/oobar" };
//// 
//// let x = {
////     "/*5a*/f/*5b*/oobar": 1234,
//// };

verify.getSyntacticDiagnostics([]);

goTo.select("1a", "1b");
verify.not.refactorAvailable(ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("invoked", ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("implicit", ts.Diagnostics.Convert_to_template_string.message);

goTo.select("2a", "2b");
verify.not.refactorAvailable(ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("invoked", ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("implicit", ts.Diagnostics.Convert_to_template_string.message);

goTo.select("3a", "3b");
verify.not.refactorAvailable(ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("invoked", ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("implicit", ts.Diagnostics.Convert_to_template_string.message);

goTo.select("4a", "4b");
verify.not.refactorAvailable(ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("invoked", ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("implicit", ts.Diagnostics.Convert_to_template_string.message);

goTo.select("5a", "5b");
verify.not.refactorAvailable(ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("invoked", ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("implicit", ts.Diagnostics.Convert_to_template_string.message);
