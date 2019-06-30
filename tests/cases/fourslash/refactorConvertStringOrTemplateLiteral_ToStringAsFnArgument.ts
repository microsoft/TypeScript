/// <reference path='fourslash.ts' />

//// console.log(`/*x*/f/*y*/oobar is ${ 32 } years old`)

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to string concatenation",
    actionDescription: "Convert to string concatenation",
    newContent:
`console.log("foobar is " + 32 + " years old")`,
});
