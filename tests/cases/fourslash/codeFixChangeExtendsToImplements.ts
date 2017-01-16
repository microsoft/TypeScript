/// <reference path='fourslash.ts' />

//// interface I {}
//// [|/* */ class /* */ C /* */ extends /* */ I|]{}

verify.rangeAfterCodeFix("/* */ class /* */ C /* */ implements /* */ I");