//// [tests/cases/compiler/objectLiteralWithSemicolons2.ts] ////

//// [objectLiteralWithSemicolons2.ts]
var v = {
  a;
  b;
  c
}

//// [objectLiteralWithSemicolons2.js]
var v = {
    a: a,
    b: b,
    c: c
};
