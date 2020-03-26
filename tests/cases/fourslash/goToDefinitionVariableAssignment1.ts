/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @filename: foo.js
////const /*def1*/Foo = module./*def2*/exports = function () {}
////Foo.prototype.bar = function() {}
////new [|Foo/*ref*/|]();

goTo.file("foo.js");
verify.goToDefinition("ref", ["def1", "def2"]);
