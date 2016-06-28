/// <reference path='fourslash.ts' />
// @Filename: app.ts
////export import A = require('./app');
////export var I = 1;
////A./**/I

goTo.marker();
verify.completionListContains("A", "import A = require('./app')");
verify.completionListContains("I", "var I: number");
