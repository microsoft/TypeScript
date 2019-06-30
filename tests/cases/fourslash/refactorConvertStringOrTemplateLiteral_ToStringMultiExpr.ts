/// <reference path='fourslash.ts' />

//// const age = 22
//// const name = "Eddy"
//// const foo = `/*x*/$/*y*/{ name } is ${ age } years old`

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to string concatenation",
    actionDescription: "Convert to string concatenation",
    newContent:
`const age = 22
const name = "Eddy"
const foo = name + " is " + age + " years old"`,
});
