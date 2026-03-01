//// [tests/cases/compiler/conditionalExpressionNewLine4.ts] ////

//// [conditionalExpressionNewLine4.ts]
var v = a ? b : 
  c;

//// [conditionalExpressionNewLine4.js]
"use strict";
var v = a ? b :
    c;
