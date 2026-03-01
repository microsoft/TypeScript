//// [tests/cases/compiler/stringTrim.ts] ////

//// [stringTrim.ts]
var trimmed: string;
trimmed = "abcde".trimEnd();
trimmed = "abcde".trimStart();
trimmed = "abcde".trimLeft();
trimmed = "abcde".trimRight();


//// [stringTrim.js]
"use strict";
var trimmed;
trimmed = "abcde".trimEnd();
trimmed = "abcde".trimStart();
trimmed = "abcde".trimLeft();
trimmed = "abcde".trimRight();
