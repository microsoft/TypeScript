//// [privateNamesNotAllowedInVariableDeclarations.ts]
// @target es6

const #foo = 3;

//// [privateNamesNotAllowedInVariableDeclarations.js]
"use strict";
// @target es6
var ;
3;
