/// <reference path='fourslash.ts' />
// @Filename: app.ts
////export import A = require('app');
////export var I = 1;
////A./**/I

goTo.marker();
verify.completionListContains("A", "A");
verify.completionListContains("I", "number");