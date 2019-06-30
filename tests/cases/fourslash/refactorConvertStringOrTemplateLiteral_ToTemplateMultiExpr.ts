/// <reference path='fourslash.ts' />

//// const age = 22
//// const name = "Eddy"
//// const foo = /*x*/n/*y*/ame + " is " + age + " years old"

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to template literal",
    actionDescription: "Convert to template literal",
    newContent:
`const age = 22
const name = "Eddy"
const foo = \`\${name} is \${age} years old\``,
});
