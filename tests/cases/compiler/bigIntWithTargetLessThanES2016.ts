// @target: es2015
// @lib: esnext

BigInt(1) ** BigInt(1); // should error

let foo = BigInt(2);
foo **= BigInt(2); // should error
