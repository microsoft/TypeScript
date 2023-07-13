//// [tests/cases/compiler/objectLiteralWithSemicolons4.ts] ////

//// [objectLiteralWithSemicolons4.ts]
var v = {
  a
;

//// [objectLiteralWithSemicolons4.js]
var v = {
    a: a
};
