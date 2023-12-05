//// [tests/cases/compiler/objectLiteralWithSemicolons3.ts] ////

//// [objectLiteralWithSemicolons3.ts]
var v = {
  a;
  b;
  c;
}

//// [objectLiteralWithSemicolons3.js]
var v = {
    a: a,
    b: b,
    c: c
};
