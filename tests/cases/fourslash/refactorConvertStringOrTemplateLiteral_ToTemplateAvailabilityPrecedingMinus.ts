/// <reference path='fourslash.ts' />

//// const age = 22
//// const /*z*/f/*y*/oo = /*x*/a/*w*/ge * 4 /*v*/-/*u*/ 2 / 4 /*t*/+/*s*/ " /*r*/y/*q*/ears old"

goTo.select("z", "y");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("x", "w");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("v", "u");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("t", "s");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("r", "q");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");
