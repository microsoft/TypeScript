//// [tests/cases/conformance/classes/members/privateNames/privateNameNotAllowedOutsideClass.ts] ////

//// [privateNameNotAllowedOutsideClass.ts]
const #foo = 3;


//// [privateNameNotAllowedOutsideClass.js]
"use strict";
const #foo = 3;
