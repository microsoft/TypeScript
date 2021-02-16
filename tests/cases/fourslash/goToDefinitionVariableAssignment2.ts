/// <reference path="fourslash.ts" />

// @filename: foo.ts
////const Bar;
////const Foo = /*def*/Bar = function () {}
////Foo.prototype.bar = function() {}
////new [|Foo/*ref*/|]();

goTo.file("foo.ts");
verify.goToDefinition("ref", "def");
