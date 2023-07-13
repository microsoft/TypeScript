//// [tests/cases/compiler/bigIntWithTargetLessThanES2016.ts] ////

//// [bigIntWithTargetLessThanES2016.ts]
BigInt(1) ** BigInt(1); // should error

let foo = BigInt(2);
foo **= BigInt(2); // should error


//// [bigIntWithTargetLessThanES2016.js]
Math.pow(BigInt(1), BigInt(1)); // should error
let foo = BigInt(2);
foo = Math.pow(foo, BigInt(2)); // should error
