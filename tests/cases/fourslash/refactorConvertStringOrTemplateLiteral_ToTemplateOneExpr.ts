/// <reference path='fourslash.ts' />

//// const age = 42
//// const foo = "/*x*/f/*y*/oobar is " + age + " years old"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent:
`const age = 42
const foo = \`foobar is \${age} years old\``,
});
