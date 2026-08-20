//// [tests/cases/compiler/objectLiteralWithSemicolons3.ts] ////

//// [objectLiteralWithSemicolons3.ts]
var v = {
  a;
  b;
  c;
}

//// [objectLiteralWithSemicolons3.js]
"use strict";
var v = {
    a,
    b,
    c,
};
