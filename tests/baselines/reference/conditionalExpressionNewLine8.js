//// [tests/cases/compiler/conditionalExpressionNewLine8.ts] ////

//// [conditionalExpressionNewLine8.ts]
var v = a 
  ? b ? d : e
  : c ? f : g;

//// [conditionalExpressionNewLine8.js]
"use strict";
var v = a
    ? b ? d : e
    : c ? f : g;
