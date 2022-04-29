/// <reference path="fourslash.ts" />

////class Foo/*1*//*2*/ { public Bar() { } }

goTo.marker("1");
edit.backspace(3);
edit.insert("Pizza");
verify.currentLineContentIs("class Pizza { public Bar() { } }");
verify.not.errorExistsAfterMarker("2");