/// <reference path="fourslash.ts" />

////namespace Alpha/*1*//*2*/ { class Foo { public bar() { } } }

goTo.marker("1");
edit.backspace(5);
edit.insert("Pizza");
verify.currentLineContentIs("namespace Pizza { class Foo { public bar() { } } }");
verify.not.errorExistsAfterMarker("2");