//// [tests/cases/conformance/types/negated/negatedTypesSimplifyInIntersections.ts] ////

//// [negatedTypesSimplifyInIntersections.ts]
type A = boolean & not true; // false
type B = "w" & not string; // never


//// [negatedTypesSimplifyInIntersections.js]
"use strict";
