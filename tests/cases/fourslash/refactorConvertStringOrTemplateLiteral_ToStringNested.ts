/// <reference path='fourslash.ts' />

//// const age = 42
//// const foo = `/*x*/f/*y*/oobar is a ${ age < 18 ? 'child' : `grown-up ${ age > 40 ? 'who needs probaply assistance': ''}` }`

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to string concatenation",
    actionDescription: "Convert to string concatenation",
    newContent:
`const age = 42
const foo = "foobar is a " + (age < 18 ? 'child' : \`grown-up \${age > 40 ? 'who needs probaply assistance' : ''}\`)`,
});
