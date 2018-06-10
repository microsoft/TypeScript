/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.js
////function f() {
////    this.[|{| "isWriteAccess": true, "isDefinition": true |}x|] = 0;
////}
////f.prototype.setX = function() {
////    this.[|{| "isWriteAccess": true, "isDefinition": true |}x|] = 1;
////}
////f.prototype.useX = function() { this.[|x|]; }

verify.singleReferenceGroup("(property) f.x: number");
