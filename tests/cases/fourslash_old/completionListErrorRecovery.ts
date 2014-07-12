/// <reference path="fourslash.ts" />

////class Foo { static fun() { }; }

////Foo./**/;
/////*1*/var bar;

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker();
verify.memberListContains("fun");
verify.not.errorExistsAfterMarker("1");