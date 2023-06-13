//// [tests/cases/conformance/classes/members/privateNames/privateNamesNotAllowedInVariableDeclarations.ts] ////

//// [privateNamesNotAllowedInVariableDeclarations.ts]
const #foo = 3;


//// [privateNamesNotAllowedInVariableDeclarations.js]
"use strict";
const #foo = 3;
