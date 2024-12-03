/// <reference path="fourslash.ts" />

//// function test() {
//// 	return /*a*/abc();
//// 	return;
//// }
//// function abc() { }

verify.noErrors();

goTo.marker("a");
edit.backspace(1);
verify.numberOfErrorsInCurrentFile(1);

edit.insert(" ");
verify.noErrors();