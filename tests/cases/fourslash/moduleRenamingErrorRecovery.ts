/// <reference path="fourslash.ts" />

////module Alpha/*1*//*2*/ { class Foo { public bar() { } } }

goTo.marker("1");
edit.backspace(5);
edit.insert("Pizza");
verify.currentLineContentIs("module Pizza { class Foo { public bar() { } } }");
verify.not.errorExistsAfterMarker("2");