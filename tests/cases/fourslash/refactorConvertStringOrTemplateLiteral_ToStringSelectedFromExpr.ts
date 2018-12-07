/// <reference path='fourslash.ts' />

//// const age = 42
//// const foo = `foobar is ${ /*x*/a/*y*/ge } years old`

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to string concatenation",
    actionDescription: "Convert to string concatenation",
    newContent:
`const age = 42
const foo = "foobar is " + age + " years old"`,
});
