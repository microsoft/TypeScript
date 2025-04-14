/// <reference path='fourslash.ts' />

//// const foo = "/*x*/f/*y*/oobar rocks"

goTo.select("x", "y");
verify.not.refactorAvailable(ts.Diagnostics.Convert_to_template_string.message);
verify.refactorAvailableForTriggerReason("invoked", ts.Diagnostics.Convert_to_template_string.message);
verify.not.refactorAvailableForTriggerReason("implicit", ts.Diagnostics.Convert_to_template_string.message);

edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    triggerReason: "invoked",
    newContent:
        `const foo = \`foobar rocks\``,
});
