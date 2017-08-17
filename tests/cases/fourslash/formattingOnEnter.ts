/// <reference path='fourslash.ts' />

////class foo { }
////class bar {/**/ }
////// new line here

goTo.marker();
edit.insertLine("");
verify.currentFileContentIs(
`class foo { }
class bar {
}
// new line here`);
