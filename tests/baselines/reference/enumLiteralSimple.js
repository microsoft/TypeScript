//// [tests/cases/conformance/enums/enumLiteralSimple.ts] ////

//// [enumLiteralSimple.ts]
const ENUM: enum = {
  a: 1,
  b: 2
};

const a: ENUM = 1

//// [enumLiteralSimple.js]
var ENUM = {
    a: 1,
    b: 2
};
var a = 1;
