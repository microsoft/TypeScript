/// <reference path='fourslash.ts' />

//// const foo = "/*x*/f/*y*/oobar " + "rocks" + " fantastically"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent:
"const foo = `foobar rocks fantastically`",
});
