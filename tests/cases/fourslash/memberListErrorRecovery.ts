/// <reference path="fourslash.ts" />

////class Foo { static fun() { }; }
////
////Foo./**/;
/////*1*/var bar;

verify.completions({ marker: "", includes: [{ name: "fun", sortText: completion.SortText.LocalDeclarationPriority }] });
