//// [tests/cases/compiler/conditionalExpressionNewLine9.ts] ////

//// [conditionalExpressionNewLine9.ts]
var v = a 
  ? b
    ? d : e
  : c
    ? f : g;

//// [conditionalExpressionNewLine9.js]
"use strict";
var v = a
    ? b
        ? d : e
    : c
        ? f : g;
