/// <reference path='fourslash.ts' />

//// const foo = "foobar is " + /*x*/(/*y*/42 + 6) + " years old"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
`const foo = \`foobar is \${42 + 6} years old\``,
});
