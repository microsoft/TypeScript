/// <reference path='fourslash.ts' />

//// console.log("/*x*/f/*y*/oobar is " + 32 + " years old")

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
`console.log(\`foobar is \${32} years old\`)`,
});

