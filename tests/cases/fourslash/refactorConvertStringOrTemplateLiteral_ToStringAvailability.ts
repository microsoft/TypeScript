/// <reference path='fourslash.ts' />

//// const age = 22
//// const name = "Eddy"
//// const /*z*/f/*y*/oo = /*x*/`/*w*/M/*v*/r/*u*/ /*t*/$/*s*/{ /*r*/n/*q*/ame } is ${ /*p*/a/*o*/ge + 34 } years old`

goTo.select("z", "y");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("x", "w");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("v", "u");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("t", "s");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("r", "q");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("p", "o");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

edit.applyRefactor({
    refactorName: "Convert string concatenation or template literal",
    actionName: "Convert to string concatenation",
    actionDescription: "Convert to string concatenation",
    newContent:
`const age = 22
const name = "Eddy"
const foo = "Mr " + name + " is " + (age + 34) + " years old"`,
});
