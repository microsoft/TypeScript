/// <reference path='fourslash.ts' />

//// console.log("/*x*/f/*y*/oobar is " + 32 + " years old")

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent:
`console.log(\`foobar is \${32} years old\`)`,
});
