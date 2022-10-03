/// <reference path="fourslash.ts" />

// @filename: foo.ts
////const Foo = module./*def*/exports = function () {}
////Foo.prototype.bar = function() {}
////new [|Foo/*ref*/|]();

goTo.file("foo.ts");
verify.goToDefinition("ref", "def");
