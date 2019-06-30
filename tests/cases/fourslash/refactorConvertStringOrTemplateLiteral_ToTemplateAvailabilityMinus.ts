/// <reference path='fourslash.ts' />

//// const age = 22
//// const name = "Eddy"
//// const /*z*/f/*y*/oo = /*x*/"/*w*/M/*v*/r/*u*/ " /*t*/+/*s*/ name + " is " - /*r*/a/*q*/ge - " years old"

goTo.select("z", "y");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("x", "w");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("v", "u");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("t", "s");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("r", "q");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");
