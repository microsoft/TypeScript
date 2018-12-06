/// <reference path='fourslash.ts' />

//// const foo = "/*x*/f/*y*/oobar is " + 42 + " years" + " old" + " and " + 6 + " cars" + " are" + " missing"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
`const foo = \`foobar is \${42} years old and \${6} cars are missing\``,
});
