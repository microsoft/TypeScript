//// [tests/cases/compiler/assignmentRestElementWithErrorSourceType.ts] ////

//// [assignmentRestElementWithErrorSourceType.ts]
var tuple: [string, number];
[...c] = tupel; // intentionally misspelled

//// [assignmentRestElementWithErrorSourceType.js]
"use strict";
var tuple;
[...c] = tupel; // intentionally misspelled
