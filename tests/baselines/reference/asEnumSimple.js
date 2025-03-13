//// [tests/cases/conformance/asEnum/asEnumSimple.ts] ////

//// [asEnumSimple.ts]
const ENUM: enum = {
  a: 1,
  b: 2
};

const a: ENUM = 1

//// [asEnumSimple.js]
var ENUM = {
    a: 1,
    b: 2
};
var a = 1;
