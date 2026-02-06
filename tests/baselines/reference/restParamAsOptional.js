//// [tests/cases/compiler/restParamAsOptional.ts] ////

//// [restParamAsOptional.ts]
function f(...x?) { }
function f2(...x = []) { }

//// [restParamAsOptional.js]
"use strict";
function f(...x) { }
function f2(...x = []) { }
