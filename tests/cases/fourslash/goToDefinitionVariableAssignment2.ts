/// <reference path="fourslash.ts" />

// @filename: foo.ts
////const Bar;
////const /*def1*/Foo = /*def2*/Bar = function () {}
////Foo.prototype.bar = function() {}
////new [|Foo/*ref*/|]();

goTo.file("foo.ts");
verify.goToDefinition("ref", ["def1", "def2"]);
