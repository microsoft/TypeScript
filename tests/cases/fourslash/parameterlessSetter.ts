/// <reference path="fourslash.ts" />

//// class foo {
////     get getterOnly() {
////         return undefined;
////     }
////     set setterOnly() { }
//// }
//// var obj = new foo();
//// obj.setterOnly = obj./**/getterOnly;

goTo.marker();
verify.quickInfoExists();
