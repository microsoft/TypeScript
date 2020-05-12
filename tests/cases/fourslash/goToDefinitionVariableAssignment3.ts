/// <reference path="fourslash.ts" />

// @filename: foo.ts
////const /*def1*/Foo = module./*def2*/exports = function () {}
////Foo.prototype.bar = function() {}
////new [|Foo/*ref*/|]();

goTo.file("foo.ts");
verify.goToDefinition("ref", ["def1", "def2"]);
