/// <reference path="fourslash.ts" />

//// /**/export namespace Foo {
////     function a(): void {}
//// }
//// 
//// Foo.a();

goTo.marker();
edit.deleteAtCaret('export '.length);
verify.numberOfErrorsInCurrentFile(1); // Expected 1: 'a' is not exported

