/// <reference path='fourslash.ts' />

//// const foo = `/*x*/f/*y*/oobar is ${ 42 + 6 } years old`

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to string concatenation",
    actionDescription: "Convert to string concatenation",
    newContent:
`const foo = "foobar is " + (42 + 6) + " years old"`,
});

