//// [tests/cases/compiler/conditionalExpressionNewLine10.ts] ////

//// [conditionalExpressionNewLine10.ts]
var v = a 
  ? b
    ? d
    : e
  : c
    ? f
    : g;

//// [conditionalExpressionNewLine10.js]
"use strict";
var v = a
    ? b
        ? d
        : e
    : c
        ? f
        : g;
