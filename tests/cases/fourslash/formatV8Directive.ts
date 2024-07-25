/// <reference path="fourslash.ts" />
// @Filename: foo.js
//// function foo() {}
//// /*1*/%PrepareFunctionForOptimization(foo)/*2*/;

// Don't really care what it does beyond not crashing
format.selection("1", "2");
