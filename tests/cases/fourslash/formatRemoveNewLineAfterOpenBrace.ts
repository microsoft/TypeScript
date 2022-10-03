/// <reference path="fourslash.ts"/>

//// function foo()
//// {
//// }
//// if (true)
//// {
//// }

format.document();
verify.currentFileContentIs(
`function foo() {
}
if (true) {
}`);
