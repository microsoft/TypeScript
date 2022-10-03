/// <reference path="fourslash.ts" />
////1 ? fun/*1*/
////function func () {}

verify.completions({ marker: "1", includes: "func" });
