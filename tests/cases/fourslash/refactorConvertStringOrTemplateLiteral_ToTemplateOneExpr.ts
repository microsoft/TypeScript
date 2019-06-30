/// <reference path='fourslash.ts' />

//// const age = 42
//// const foo = "/*x*/f/*y*/oobar is " + age + " years old"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
`const age = 42
const foo = \`foobar is \${age} years old\``,
});
