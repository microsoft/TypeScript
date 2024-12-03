/// <reference path="fourslash.ts" />

//// function test() {
//// 	return/*a*/abc();
//// 	return;
//// }
//// function abc() { }

verify.numberOfErrorsInCurrentFile(1);

goTo.marker("a")
edit.insert(" ");
verify.noErrors();