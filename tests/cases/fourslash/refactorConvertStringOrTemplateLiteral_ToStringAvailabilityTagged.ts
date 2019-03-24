/// <reference path='fourslash.ts' />

//// function tag(literals: TemplateStringsArray, ...placeholders: any[]) { return "tagged" }
//// const alpha = tag/*z*/`/*y*/foobar`
//// const beta = tag/*x*/`/*w*/foobar ${/*v*/4/*u*/2}`

goTo.select("z", "y");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("x", "w");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");

goTo.select("v", "u");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to string concatenation");
verify.not.refactorAvailable("Convert string concatenation or template literal", "Convert to template literal");
