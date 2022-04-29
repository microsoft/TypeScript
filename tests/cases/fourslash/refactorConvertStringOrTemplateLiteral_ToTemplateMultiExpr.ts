/// <reference path='fourslash.ts' />

//// const age = 22
//// const name = "Eddy"
//// const foo = /*x*/n/*y*/ame + " is " + age + " years old"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent:
`const age = 22
const name = "Eddy"
const foo = \`\${name} is \${age} years old\``,
});
