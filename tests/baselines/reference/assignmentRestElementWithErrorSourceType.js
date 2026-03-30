//// [tests/cases/compiler/assignmentRestElementWithErrorSourceType.ts] ////

//// [assignmentRestElementWithErrorSourceType.ts]
var tuple: [string, number];
[...c] = tuple; // intentionally misspelled

//// [assignmentRestElementWithErrorSourceType.js]
"use strict";
var tuple;
[...c] = tuple; // intentionally misspelled
