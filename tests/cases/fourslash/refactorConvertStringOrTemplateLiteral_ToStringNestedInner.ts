/// <reference path='fourslash.ts' />

//// const age = 42
//// const foo = `foobar is a ${ age < 18 ? 'child' : /*x*/`/*y*/grown-up ${ age > 40 ? 'who needs probably assistance' : ''}` }`

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to string concatenation",
    actionDescription: "Convert to string concatenation",
    newContent:
`const age = 42
const foo = \`foobar is a \${ age < 18 ? 'child' : "grown-up " + (age > 40 ? 'who needs probably assistance' : '') }\``,
});

