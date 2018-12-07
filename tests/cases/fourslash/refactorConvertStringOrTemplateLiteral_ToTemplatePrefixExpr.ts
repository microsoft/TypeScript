/// <reference path='fourslash.ts' />

//// const foo = /*x*/4/*y*/2 + 6 + 23 + 12 +" years old"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
`const foo = \`\${42 + 6 + 23 + 12} years old\``,
});
