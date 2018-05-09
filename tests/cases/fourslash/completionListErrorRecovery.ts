/// <reference path="fourslash.ts" />

////class Foo { static fun() { }; }

////Foo./**/;
/////*1*/var bar;

verify.completions({ marker: "", includes: "fun" });
verify.not.errorExistsAfterMarker("1");
