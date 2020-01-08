/// <reference path='fourslash.ts' />

//// const foo = "/*x*/f/*y*/oobar is " + (42 + 6) + " years old"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent:
`const foo = \`foobar is \${42 + 6} years old\``,
});
