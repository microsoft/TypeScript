/// <reference path='fourslash.ts' />

//// let foo = ""
//// /*z*/f/*y*/oo = "/*x*/M/*w*/r Bar" + " is" + /*v*/4/*u*/2 + " years old"

goTo.select("z", "y");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("x", "w");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("v", "u");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

