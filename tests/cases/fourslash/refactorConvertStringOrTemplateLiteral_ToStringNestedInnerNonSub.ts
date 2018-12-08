/// <reference path='fourslash.ts' />

//// const age = 42
//// const foo = `foobar is a ${ `/*x*/3/*y*/4` }`

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to string concatenation",
    actionDescription: "Convert to string concatenation",
    newContent:
`const age = 42
const foo = \`foobar is a \${ "34" }\``,
});
