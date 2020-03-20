/// <reference path='fourslash.ts' />

//// const foo = /*x*/4/*y*/2 - 6 * 4 + 23 / 12 +" years old"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent:
`const foo = \`\${42 - 6 * 4 + 23 / 12} years old\``,
});
