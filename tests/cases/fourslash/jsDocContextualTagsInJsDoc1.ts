/// <reference path="fourslash.ts" />

//// /**
////  * @param x/*1*/ Does the thing
////  */
//// function foo(x/*2*/) {}

verify.quickInfoAt("1", "(parameter) x: any", "Does the thing", undefined);
verify.quickInfoAt("2", "(parameter) x: any", "Does the thing", [{ name: "param", text: "x Does the thing" }]);
