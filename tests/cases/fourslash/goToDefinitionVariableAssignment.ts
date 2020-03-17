/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @filename: foo.js
////const Bar;
////const /*def1*/Foo = /*def2*/Bar = function () {}
////Foo.prototype.bar = function() {}
////new [|Foo/*ref*/|]();

goTo.file("foo.js");
verify.goToDefinition("ref", ["def1", "def2"]);
