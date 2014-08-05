/// <reference path="fourslash.ts" />

////class Foo { static bar() { return "x"; } }
////var baz = Foo/**/;
/////*1*/baz.concat("y");

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker();
edit.insert(".b");
verify.not.errorExistsAfterMarker("1");
