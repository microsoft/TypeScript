//// [tests/cases/compiler/stringIncludes.ts] ////

//// [stringIncludes.ts]
var includes: boolean;
includes = "abcde".includes("cd");
includes = "abcde".includes("cd", 2);

//// [stringIncludes.js]
"use strict";
var includes;
includes = "abcde".includes("cd");
includes = "abcde".includes("cd", 2);
