/// <reference path="fourslash.ts" />

//// namespace X {
////     export =
//// }
//// X.add/*1*/

// verify there is no crash
verify.quickInfoAt("1", "any");
