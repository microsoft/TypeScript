//// [tests/cases/compiler/restParamAsOptional.ts] ////

//// [restParamAsOptional.ts]
function f(...x?) { }
function f2(...x = []) { }

//// [restParamAsOptional.js]
function f(...x) { }
function f2(...x = []) { }
