/// <reference path="fourslash.ts" />

////declare function alert(message?: any): void;
/////*1*/
////interface Foo {
////    setISO8601(dString): Date;
////}

// Do resolve without typeCheck
goTo.marker('1');
edit.insert("alert(");
verify.signatureHelp({ text: "alert(message?: any): void" });

// TypeCheck
verify.errorExistsAfterMarker('1');