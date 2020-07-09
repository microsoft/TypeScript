/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @filename: foo.js
////const Foo = module./*def*/exports = function () {}
////Foo.prototype.bar = function() {}
////new [|Foo/*ref*/|]();

goTo.file("foo.js");
verify.goToDefinition("ref", "def");
